import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq, like, and, or, desc, asc } from 'drizzle-orm';

const ALLOWED_CATEGORIES = ['urban-planning', 'green-architecture', 'sustainable-transport', 'community', 'URBAN-PLANNING', 'SUSTAINABILITY', 'CASE-STUDIES', 'TECHNOLOGY'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single blog post by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const post = await db.select()
        .from(blogPosts)
        .where(eq(blogPosts.id, parseInt(id)))
        .limit(1);

      if (post.length === 0) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
      }

      return NextResponse.json(post[0]);
    }

    // List blog posts with pagination and filtering
    const page = Math.max(parseInt(searchParams.get('page') || '1'), 1);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);
    const offset = (page - 1) * limit;
    const category = searchParams.get('category');
    const published = searchParams.get('published') !== 'false'; // Default to true
    const search = searchParams.get('search');

    let query = db.select().from(blogPosts);
    let conditions = [];

    // Filter by published status
    conditions.push(eq(blogPosts.published, published));

    // Filter by category
    if (category && category !== 'all' && ALLOWED_CATEGORIES.includes(category)) {
      conditions.push(eq(blogPosts.category, category));
    }

    // Search functionality
    if (search) {
      const searchCondition = or(
        like(blogPosts.title, `%${search}%`),
        like(blogPosts.excerpt, `%${search}%`),
        like(blogPosts.content, `%${search}%`),
        like(blogPosts.tags, `%${search}%`)
      );
      conditions.push(searchCondition);
    }

    // Apply all conditions
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Order by publishedAt DESC for published, createdAt DESC for unpublished
    if (published) {
      query = query.orderBy(desc(blogPosts.publishedAt));
    } else {
      query = query.orderBy(desc(blogPosts.createdAt));
    }

    const results = await query.limit(limit).offset(offset);

    // Get total count for pagination metadata
    let countQuery = db.select({ count: blogPosts.id }).from(blogPosts);
    if (conditions.length > 0) {
      countQuery = countQuery.where(and(...conditions));
    }
    const countResult = await countQuery;
    const total = countResult.length;

    const response = {
      data: results,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    };

    return NextResponse.json(response);
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
    const { slug, title, excerpt, content, author, category, featuredImage, tags } = requestBody;

    // Validate required fields
    if (!slug) {
      return NextResponse.json({ 
        error: "Slug is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }
    if (!title) {
      return NextResponse.json({ 
        error: "Title is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }
    if (!excerpt) {
      return NextResponse.json({ 
        error: "Excerpt is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }
    if (!content) {
      return NextResponse.json({ 
        error: "Content is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }
    if (!author) {
      return NextResponse.json({ 
        error: "Author is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }
    if (!category) {
      return NextResponse.json({ 
        error: "Category is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    // Validate category
    if (!ALLOWED_CATEGORIES.includes(category)) {
      return NextResponse.json({ 
        error: `Category must be one of: ${ALLOWED_CATEGORIES.join(', ')}`,
        code: "INVALID_CATEGORY" 
      }, { status: 400 });
    }

    // Check slug uniqueness
    const existingPost = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (existingPost.length > 0) {
      return NextResponse.json({ 
        error: "Slug must be unique",
        code: "SLUG_NOT_UNIQUE" 
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedData = {
      slug: slug.trim(),
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      author: author.trim(),
      category: category.trim(),
      featuredImage: featuredImage?.trim() || null,
      tags: tags?.trim() || null,
      published: false, // Default value
      publishedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newPost = await db.insert(blogPosts)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newPost[0], { status: 201 });
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
    const { slug, title, excerpt, content, author, category, featuredImage, tags, published } = requestBody;

    // Check if record exists
    const existingPost = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.id, parseInt(id)))
      .limit(1);

    if (existingPost.length === 0) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Validate category if provided
    if (category && !ALLOWED_CATEGORIES.includes(category)) {
      return NextResponse.json({ 
        error: `Category must be one of: ${ALLOWED_CATEGORIES.join(', ')}`,
        code: "INVALID_CATEGORY" 
      }, { status: 400 });
    }

    // Check slug uniqueness if slug is being updated
    if (slug && slug !== existingPost[0].slug) {
      const slugExists = await db.select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, slug))
        .limit(1);

      if (slugExists.length > 0) {
        return NextResponse.json({ 
          error: "Slug must be unique",
          code: "SLUG_NOT_UNIQUE" 
        }, { status: 400 });
      }
    }

    // Prepare update data
    const updates: any = {
      updatedAt: new Date().toISOString()
    };

    if (slug !== undefined) updates.slug = slug.trim();
    if (title !== undefined) updates.title = title.trim();
    if (excerpt !== undefined) updates.excerpt = excerpt.trim();
    if (content !== undefined) updates.content = content.trim();
    if (author !== undefined) updates.author = author.trim();
    if (category !== undefined) updates.category = category.trim();
    if (featuredImage !== undefined) updates.featuredImage = featuredImage?.trim() || null;
    if (tags !== undefined) updates.tags = tags?.trim() || null;

    // Handle published status change
    if (published !== undefined) {
      updates.published = published;
      // If changing from false to true, set publishedAt
      if (published === true && existingPost[0].published === false) {
        updates.publishedAt = new Date().toISOString();
      }
      // If changing from true to false, clear publishedAt
      if (published === false && existingPost[0].published === true) {
        updates.publishedAt = null;
      }
    }

    const updatedPost = await db.update(blogPosts)
      .set(updates)
      .where(eq(blogPosts.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedPost[0]);
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
    const existingPost = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.id, parseInt(id)))
      .limit(1);

    if (existingPost.length === 0) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    const deletedPost = await db.delete(blogPosts)
      .where(eq(blogPosts.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Blog post deleted successfully',
      deletedPost: deletedPost[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}