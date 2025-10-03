import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { pages, galleryImages, storyCards, blogPosts } from '@/db/schema';
import { eq, like, and, or } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    // Validate required search query parameter
    if (!query || query.trim() === '') {
      return NextResponse.json({
        error: 'Search query parameter "q" is required',
        code: 'MISSING_SEARCH_QUERY'
      }, { status: 400 });
    }

    const searchTerm = query.trim();
    const wildcardTerm = `%${searchTerm}%`;

    // Search pages
    const pagesResults = await db.select({
      id: pages.id,
      slug: pages.slug,
      title: pages.title,
      subtitle: pages.subtitle,
      content: pages.content,
      metaDescription: pages.metaDescription,
      type: 'page'
    })
    .from(pages)
    .where(and(
      eq(pages.published, true),
      or(
        like(pages.title, wildcardTerm),
        like(pages.subtitle, wildcardTerm),
        like(pages.content, wildcardTerm),
        like(pages.metaDescription, wildcardTerm)
      )
    ))
    .limit(5);

    // Search gallery images
    const galleryResults = await db.select({
      id: galleryImages.id,
      title: galleryImages.title,
      altText: galleryImages.altText,
      imageUrl: galleryImages.imageUrl,
      category: galleryImages.category,
      type: 'gallery'
    })
    .from(galleryImages)
    .where(and(
      eq(galleryImages.published, true),
      or(
        like(galleryImages.title, wildcardTerm),
        like(galleryImages.altText, wildcardTerm),
        like(galleryImages.category, wildcardTerm)
      )
    ))
    .limit(5);

    // Search story cards
    const storiesResults = await db.select({
      id: storyCards.id,
      title: storyCards.title,
      subtitle: storyCards.subtitle,
      content: storyCards.content,
      category: storyCards.category,
      backgroundImage: storyCards.backgroundImage,
      linkUrl: storyCards.linkUrl,
      type: 'story'
    })
    .from(storyCards)
    .where(and(
      eq(storyCards.published, true),
      or(
        like(storyCards.title, wildcardTerm),
        like(storyCards.subtitle, wildcardTerm),
        like(storyCards.content, wildcardTerm),
        like(storyCards.category, wildcardTerm)
      )
    ))
    .limit(5);

    // Search blog posts
    const blogResults = await db.select({
      id: blogPosts.id,
      slug: blogPosts.slug,
      title: blogPosts.title,
      excerpt: blogPosts.excerpt,
      content: blogPosts.content,
      author: blogPosts.author,
      category: blogPosts.category,
      tags: blogPosts.tags,
      featuredImage: blogPosts.featuredImage,
      publishedAt: blogPosts.publishedAt,
      type: 'blog'
    })
    .from(blogPosts)
    .where(and(
      eq(blogPosts.published, true),
      or(
        like(blogPosts.title, wildcardTerm),
        like(blogPosts.excerpt, wildcardTerm),
        like(blogPosts.content, wildcardTerm),
        like(blogPosts.author, wildcardTerm),
        like(blogPosts.tags, wildcardTerm),
        like(blogPosts.category, wildcardTerm)
      )
    ))
    .limit(5);

    // Simple result grouping without complex sorting
    const results = {
      pages: pagesResults.map(({ type, ...rest }) => rest),
      gallery: galleryResults.map(({ type, ...rest }) => rest),
      stories: storiesResults.map(({ type, ...rest }) => rest),
      blog: blogResults.map(({ type, ...rest }) => rest)
    };

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET search error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + error
    }, { status: 500 });
  }
}