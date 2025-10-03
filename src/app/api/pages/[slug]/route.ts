import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { pages } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json({ 
        error: "Slug parameter is required",
        code: "MISSING_SLUG" 
      }, { status: 400 });
    }

    const searchParams = request.nextUrl.searchParams;
    const includeUnpublished = searchParams.get('include_unpublished') === 'true';

    let whereCondition = eq(pages.slug, slug);
    
    if (!includeUnpublished) {
      whereCondition = and(eq(pages.slug, slug), eq(pages.published, true));
    }

    const page = await db.select()
      .from(pages)
      .where(whereCondition)
      .limit(1);

    if (page.length === 0) {
      return NextResponse.json({ 
        error: 'Page not found',
        code: "PAGE_NOT_FOUND" 
      }, { status: 404 });
    }

    return NextResponse.json(page[0]);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json({ 
        error: "Slug parameter is required",
        code: "MISSING_SLUG" 
      }, { status: 400 });
    }

    const requestBody = await request.json();
    
    // Check if page exists
    const existingPage = await db.select()
      .from(pages)
      .where(eq(pages.slug, slug))
      .limit(1);

    if (existingPage.length === 0) {
      return NextResponse.json({ 
        error: 'Page not found',
        code: "PAGE_NOT_FOUND" 
      }, { status: 404 });
    }

    // Validate required fields if they are being updated
    if (requestBody.hasOwnProperty('title') && !requestBody.title?.trim()) {
      return NextResponse.json({ 
        error: "Title is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (requestBody.hasOwnProperty('content') && !requestBody.content?.trim()) {
      return NextResponse.json({ 
        error: "Content is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date().toISOString()
    };

    // Add fields that are being updated
    if (requestBody.hasOwnProperty('title')) updateData.title = requestBody.title.trim();
    if (requestBody.hasOwnProperty('subtitle')) updateData.subtitle = requestBody.subtitle?.trim() || null;
    if (requestBody.hasOwnProperty('content')) updateData.content = requestBody.content.trim();
    if (requestBody.hasOwnProperty('metaDescription')) updateData.metaDescription = requestBody.metaDescription?.trim() || null;
    if (requestBody.hasOwnProperty('metaKeywords')) updateData.metaKeywords = requestBody.metaKeywords?.trim() || null;
    if (requestBody.hasOwnProperty('published')) updateData.published = Boolean(requestBody.published);

    const updated = await db.update(pages)
      .set(updateData)
      .where(eq(pages.slug, slug))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ 
        error: 'Failed to update page',
        code: "UPDATE_FAILED" 
      }, { status: 500 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json({ 
        error: "Slug parameter is required",
        code: "MISSING_SLUG" 
      }, { status: 400 });
    }

    // Check if page exists
    const existingPage = await db.select()
      .from(pages)
      .where(eq(pages.slug, slug))
      .limit(1);

    if (existingPage.length === 0) {
      return NextResponse.json({ 
        error: 'Page not found',
        code: "PAGE_NOT_FOUND" 
      }, { status: 404 });
    }

    const deleted = await db.delete(pages)
      .where(eq(pages.slug, slug))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ 
        error: 'Failed to delete page',
        code: "DELETE_FAILED" 
      }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Page deleted successfully',
      deletedPage: deleted[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}