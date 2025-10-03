import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { galleryImages } from '@/db/schema';
import { eq, like, and, or, desc, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // Single record fetch
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }
      
      const record = await db.select()
        .from(galleryImages)
        .where(eq(galleryImages.id, parseInt(id)))
        .limit(1);
      
      if (record.length === 0) {
        return NextResponse.json({ error: 'Gallery image not found' }, { status: 404 });
      }
      
      return NextResponse.json(record[0]);
    }
    
    // List with pagination and filtering
    const category = searchParams.get('category') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '6'), 100);
    const published = searchParams.get('published');
    
    const offset = (page - 1) * limit;
    
    let query = db.select().from(galleryImages);
    
    // Build where conditions
    const conditions = [];
    
    // Category filter
    if (category !== 'all') {
      const validCategories = ['nature', 'transport', 'architecture', 'housing'];
      if (!validCategories.includes(category)) {
        return NextResponse.json({ 
          error: "Invalid category. Must be one of: nature, transport, architecture, housing, all",
          code: "INVALID_CATEGORY" 
        }, { status: 400 });
      }
      conditions.push(eq(galleryImages.category, category));
    }
    
    // Published filter
    if (published !== null) {
      const isPublished = published === 'true';
      conditions.push(eq(galleryImages.published, isPublished));
    }
    
    // Apply conditions
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    // Apply ordering and pagination
    const results = await query
      .orderBy(asc(galleryImages.order), desc(galleryImages.createdAt))
      .limit(limit)
      .offset(offset);
    
    return NextResponse.json(results);
    
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { title, altText, imageUrl, category, order, published } = requestBody;
    
    // Validate required fields
    if (!title) {
      return NextResponse.json({ 
        error: "Title is required",
        code: "MISSING_TITLE" 
      }, { status: 400 });
    }
    
    if (!altText) {
      return NextResponse.json({ 
        error: "Alt text is required",
        code: "MISSING_ALT_TEXT" 
      }, { status: 400 });
    }
    
    if (!imageUrl) {
      return NextResponse.json({ 
        error: "Image URL is required",
        code: "MISSING_IMAGE_URL" 
      }, { status: 400 });
    }
    
    if (!category) {
      return NextResponse.json({ 
        error: "Category is required",
        code: "MISSING_CATEGORY" 
      }, { status: 400 });
    }
    
    // Validate category
    const validCategories = ['nature', 'transport', 'architecture', 'housing'];
    if (!validCategories.includes(category)) {
      return NextResponse.json({ 
        error: "Invalid category. Must be one of: nature, transport, architecture, housing",
        code: "INVALID_CATEGORY" 
      }, { status: 400 });
    }
    
    // Prepare insert data with defaults
    const insertData = {
      title: title.trim(),
      altText: altText.trim(),
      imageUrl: imageUrl.trim(),
      category: category,
      order: order || 0,
      published: published !== undefined ? published : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const newRecord = await db.insert(galleryImages)
      .values(insertData)
      .returning();
    
    return NextResponse.json(newRecord[0], { status: 201 });
    
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }
    
    const requestBody = await request.json();
    const { title, altText, imageUrl, category, order, published } = requestBody;
    
    // Check if record exists
    const existingRecord = await db.select()
      .from(galleryImages)
      .where(eq(galleryImages.id, parseInt(id)))
      .limit(1);
    
    if (existingRecord.length === 0) {
      return NextResponse.json({ error: 'Gallery image not found' }, { status: 404 });
    }
    
    // Validate category if provided
    if (category) {
      const validCategories = ['nature', 'transport', 'architecture', 'housing'];
      if (!validCategories.includes(category)) {
        return NextResponse.json({ 
          error: "Invalid category. Must be one of: nature, transport, architecture, housing",
          code: "INVALID_CATEGORY" 
        }, { status: 400 });
      }
    }
    
    // Prepare update data
    const updateData: any = {
      updatedAt: new Date().toISOString()
    };
    
    if (title !== undefined) updateData.title = title.trim();
    if (altText !== undefined) updateData.altText = altText.trim();
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl.trim();
    if (category !== undefined) updateData.category = category;
    if (order !== undefined) updateData.order = order;
    if (published !== undefined) updateData.published = published;
    
    const updated = await db.update(galleryImages)
      .set(updateData)
      .where(eq(galleryImages.id, parseInt(id)))
      .returning();
    
    return NextResponse.json(updated[0]);
    
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }
    
    // Check if record exists
    const existingRecord = await db.select()
      .from(galleryImages)
      .where(eq(galleryImages.id, parseInt(id)))
      .limit(1);
    
    if (existingRecord.length === 0) {
      return NextResponse.json({ error: 'Gallery image not found' }, { status: 404 });
    }
    
    const deleted = await db.delete(galleryImages)
      .where(eq(galleryImages.id, parseInt(id)))
      .returning();
    
    return NextResponse.json({
      message: 'Gallery image deleted successfully',
      deletedRecord: deleted[0]
    });
    
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}