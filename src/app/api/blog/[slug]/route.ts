import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { searchParams } = new URL(request.url);
    const includeUnpublished = searchParams.get('include_unpublished') === 'true';

    if (!slug) {
      return NextResponse.json({ 
        error: "Slug parameter is required",
        code: "MISSING_SLUG" 
      }, { status: 400 });
    }

    let whereCondition;
    if (includeUnpublished) {
      whereCondition = eq(blogPosts.slug, slug);
    } else {
      whereCondition = and(
        eq(blogPosts.slug, slug),
        eq(blogPosts.published, true)
      );
    }

    const blogPost = await db.select()
      .from(blogPosts)
      .where(whereCondition)
      .limit(1);

    if (blogPost.length === 0) {
      return NextResponse.json({ 
        error: 'Blog post not found',
        code: "BLOG_POST_NOT_FOUND" 
      }, { status: 404 });
    }

    return NextResponse.json(blogPost[0]);

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json({ 
        error: "Slug parameter is required",
        code: "MISSING_SLUG" 
      }, { status: 400 });
    }

    const requestBody = await request.json();
    const { 
      title,
      excerpt,
      content,
      featuredImage,
      author,
      category,
      tags,
      published
    } = requestBody;

    // Check if record exists
    const existingPost = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (existingPost.length === 0) {
      return NextResponse.json({ 
        error: 'Blog post not found',
        code: "BLOG_POST_NOT_FOUND" 
      }, { status: 404 });
    }

    const currentPost = existingPost[0];
    
    // Prepare update data
    const updateData: any = {
      updatedAt: new Date().toISOString()
    };

    // Only update fields that are provided
    if (title !== undefined) updateData.title = title.trim();
    if (excerpt !== undefined) updateData.excerpt = excerpt.trim();
    if (content !== undefined) updateData.content = content;
    if (featuredImage !== undefined) updateData.featuredImage = featuredImage;
    if (author !== undefined) updateData.author = author.trim();
    if (category !== undefined) updateData.category = category.trim();
    if (tags !== undefined) updateData.tags = tags;
    if (published !== undefined) {
      updateData.published = published;
      
      // If published changes from false to true, set publishedAt
      if (published === true && currentPost.published === false) {
        updateData.publishedAt = new Date().toISOString();
      }
    }

    const updated = await db.update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.slug, slug))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ 
        error: 'Failed to update blog post',
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json({ 
        error: "Slug parameter is required",
        code: "MISSING_SLUG" 
      }, { status: 400 });
    }

    // Check if record exists before deleting
    const existingPost = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (existingPost.length === 0) {
      return NextResponse.json({ 
        error: 'Blog post not found',
        code: "BLOG_POST_NOT_FOUND" 
      }, { status: 404 });
    }

    const deleted = await db.delete(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ 
        error: 'Failed to delete blog post',
        code: "DELETE_FAILED" 
      }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Blog post deleted successfully',
      deletedPost: deleted[0]
    });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}