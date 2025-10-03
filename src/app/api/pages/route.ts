import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { pages } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = db.select().from(pages);

    if (published !== null) {
      const isPublished = published === 'true';
      query = query.where(eq(pages.published, isPublished));
    }

    const results = await query
      .orderBy(desc(pages.createdAt))
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
    const body = await request.json();
    const { slug, title, content, subtitle, metaDescription, metaKeywords, published = true } = body;

    // Validate required fields
    if (!title) {
      return NextResponse.json({ 
        error: "Title is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (!content) {
      return NextResponse.json({ 
        error: "Content is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    // Generate or validate slug
    let finalSlug = slug ? slug.trim() : generateSlug(title);
    
    if (!finalSlug) {
      return NextResponse.json({ 
        error: "Slug is required and cannot be empty",
        code: "INVALID_SLUG" 
      }, { status: 400 });
    }

    // Check for unique slug
    const existingPage = await db.select()
      .from(pages)
      .where(eq(pages.slug, finalSlug))
      .limit(1);

    if (existingPage.length > 0) {
      return NextResponse.json({ 
        error: "A page with this slug already exists",
        code: "SLUG_EXISTS" 
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedData = {
      slug: finalSlug,
      title: title.trim(),
      content: content.trim(),
      subtitle: subtitle ? subtitle.trim() : null,
      metaDescription: metaDescription ? metaDescription.trim() : null,
      metaKeywords: metaKeywords ? metaKeywords.trim() : null,
      published: Boolean(published),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newPage = await db.insert(pages)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newPage[0], { status: 201 });
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

    const body = await request.json();
    const { slug, title, content, subtitle, metaDescription, metaKeywords, published } = body;

    // Check if page exists
    const existingPage = await db.select()
      .from(pages)
      .where(eq(pages.id, parseInt(id)))
      .limit(1);

    if (existingPage.length === 0) {
      return NextResponse.json({ 
        error: 'Page not found' 
      }, { status: 404 });
    }

    // Validate slug uniqueness if slug is being updated
    if (slug && slug !== existingPage[0].slug) {
      const slugExists = await db.select()
        .from(pages)
        .where(and(eq(pages.slug, slug), eq(pages.id, parseInt(id))))
        .limit(1);

      if (slugExists.length > 0) {
        return NextResponse.json({ 
          error: "A page with this slug already exists",
          code: "SLUG_EXISTS" 
        }, { status: 400 });
      }
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date().toISOString()
    };

    if (slug !== undefined) updateData.slug = slug.trim();
    if (title !== undefined) updateData.title = title.trim();
    if (content !== undefined) updateData.content = content.trim();
    if (subtitle !== undefined) updateData.subtitle = subtitle ? subtitle.trim() : null;
    if (metaDescription !== undefined) updateData.metaDescription = metaDescription ? metaDescription.trim() : null;
    if (metaKeywords !== undefined) updateData.metaKeywords = metaKeywords ? metaKeywords.trim() : null;
    if (published !== undefined) updateData.published = Boolean(published);

    const updated = await db.update(pages)
      .set(updateData)
      .where(eq(pages.id, parseInt(id)))
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

    // Check if page exists
    const existingPage = await db.select()
      .from(pages)
      .where(eq(pages.id, parseInt(id)))
      .limit(1);

    if (existingPage.length === 0) {
      return NextResponse.json({ 
        error: 'Page not found' 
      }, { status: 404 });
    }

    const deleted = await db.delete(pages)
      .where(eq(pages.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Page deleted successfully',
      page: deleted[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}