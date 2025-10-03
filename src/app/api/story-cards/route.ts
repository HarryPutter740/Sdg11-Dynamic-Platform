import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { storyCards } from '@/db/schema';
import { eq, like, and, or, desc, asc } from 'drizzle-orm';

const VALID_CATEGORIES = ['case-study', 'data', 'action', 'video', 'big-picture', 'quote'];
const VALID_SIZES = ['standard', 'medium', 'large'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single story card by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const storyCard = await db.select()
        .from(storyCards)
        .where(eq(storyCards.id, parseInt(id)))
        .limit(1);

      if (storyCard.length === 0) {
        return NextResponse.json({ error: 'Story card not found' }, { status: 404 });
      }

      return NextResponse.json(storyCard[0]);
    }

    // List story cards with filtering
    const published = searchParams.get('published');
    const category = searchParams.get('category');
    const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = db.select().from(storyCards);

    // Build where conditions
    const conditions = [];

    // Published filter (default: true)
    const publishedValue = published === null ? true : published === 'true';
    conditions.push(eq(storyCards.published, publishedValue));

    // Category filter
    if (category) {
      conditions.push(eq(storyCards.category, category));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Order by 'order' ASC, then by 'createdAt' DESC
    const results = await query
      .orderBy(asc(storyCards.order), desc(storyCards.createdAt))
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
    const { title, subtitle, category, backgroundImage, linkUrl, content, size, order, published } = requestBody;

    // Validate required fields
    if (!title) {
      return NextResponse.json({ 
        error: "Title is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (!category) {
      return NextResponse.json({ 
        error: "Category is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (!backgroundImage) {
      return NextResponse.json({ 
        error: "Background image is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    // Validate category enum
    if (!VALID_CATEGORIES.includes(category)) {
      return NextResponse.json({ 
        error: `Category must be one of: ${VALID_CATEGORIES.join(', ')}`,
        code: "INVALID_CATEGORY" 
      }, { status: 400 });
    }

    // Validate size enum if provided
    if (size && !VALID_SIZES.includes(size)) {
      return NextResponse.json({ 
        error: `Size must be one of: ${VALID_SIZES.join(', ')}`,
        code: "INVALID_SIZE" 
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedTitle = title.trim();
    const sanitizedSubtitle = subtitle?.trim();
    const sanitizedBackgroundImage = backgroundImage.trim();
    const sanitizedLinkUrl = linkUrl?.trim();
    const sanitizedContent = content?.trim();

    const insertData = {
      title: sanitizedTitle,
      subtitle: sanitizedSubtitle || null,
      category,
      backgroundImage: sanitizedBackgroundImage,
      linkUrl: sanitizedLinkUrl || null,
      content: sanitizedContent || null,
      size: size || 'standard',
      order: order || 0,
      published: published !== undefined ? published : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newStoryCard = await db.insert(storyCards)
      .values(insertData)
      .returning();

    return NextResponse.json(newStoryCard[0], { status: 201 });
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
    const { title, subtitle, category, backgroundImage, linkUrl, content, size, order, published } = requestBody;

    // Check if story card exists
    const existingStoryCard = await db.select()
      .from(storyCards)
      .where(eq(storyCards.id, parseInt(id)))
      .limit(1);

    if (existingStoryCard.length === 0) {
      return NextResponse.json({ error: 'Story card not found' }, { status: 404 });
    }

    // Validate category enum if provided
    if (category && !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json({ 
        error: `Category must be one of: ${VALID_CATEGORIES.join(', ')}`,
        code: "INVALID_CATEGORY" 
      }, { status: 400 });
    }

    // Validate size enum if provided
    if (size && !VALID_SIZES.includes(size)) {
      return NextResponse.json({ 
        error: `Size must be one of: ${VALID_SIZES.join(', ')}`,
        code: "INVALID_SIZE" 
      }, { status: 400 });
    }

    // Build update object with only provided fields
    const updates = {};

    if (title !== undefined) {
      updates.title = title.trim();
    }
    if (subtitle !== undefined) {
      updates.subtitle = subtitle?.trim() || null;
    }
    if (category !== undefined) {
      updates.category = category;
    }
    if (backgroundImage !== undefined) {
      updates.backgroundImage = backgroundImage.trim();
    }
    if (linkUrl !== undefined) {
      updates.linkUrl = linkUrl?.trim() || null;
    }
    if (content !== undefined) {
      updates.content = content?.trim() || null;
    }
    if (size !== undefined) {
      updates.size = size;
    }
    if (order !== undefined) {
      updates.order = order;
    }
    if (published !== undefined) {
      updates.published = published;
    }

    // Always update updatedAt
    updates.updatedAt = new Date().toISOString();

    const updatedStoryCard = await db.update(storyCards)
      .set(updates)
      .where(eq(storyCards.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedStoryCard[0]);
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

    // Check if story card exists
    const existingStoryCard = await db.select()
      .from(storyCards)
      .where(eq(storyCards.id, parseInt(id)))
      .limit(1);

    if (existingStoryCard.length === 0) {
      return NextResponse.json({ error: 'Story card not found' }, { status: 404 });
    }

    const deletedStoryCard = await db.delete(storyCards)
      .where(eq(storyCards.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Story card deleted successfully',
      deletedStoryCard: deletedStoryCard[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}