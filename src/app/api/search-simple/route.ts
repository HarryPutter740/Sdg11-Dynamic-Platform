import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { pages, galleryImages, storyCards, blogPosts } from '@/db/schema';
import { eq, like, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    // Validate required search parameter
    if (!query || query.trim().length === 0) {
      return NextResponse.json({ 
        error: "Search query parameter 'q' is required",
        code: "MISSING_SEARCH_QUERY" 
      }, { status: 400 });
    }

    const searchTerm = `%${query.trim()}%`;

    // Search pages (published only)
    const pagesResults = await db.select({
      id: pages.id,
      slug: pages.slug,
      title: pages.title,
      content: pages.content,
      createdAt: pages.createdAt
    })
    .from(pages)
    .where(and(
      eq(pages.published, true),
      like(pages.title, searchTerm)
    ))
    .limit(3);

    // Search pages content if title search didn't yield enough results
    if (pagesResults.length < 3) {
      const contentResults = await db.select({
        id: pages.id,
        slug: pages.slug,
        title: pages.title,
        content: pages.content,
        createdAt: pages.createdAt
      })
      .from(pages)
      .where(and(
        eq(pages.published, true),
        like(pages.content, searchTerm)
      ))
      .limit(3 - pagesResults.length);

      // Merge results, avoiding duplicates
      const existingIds = pagesResults.map(p => p.id);
      const uniqueContentResults = contentResults.filter(p => !existingIds.includes(p.id));
      pagesResults.push(...uniqueContentResults);
    }

    // Search gallery images (published only)
    const galleryResults = await db.select({
      id: galleryImages.id,
      title: galleryImages.title,
      altText: galleryImages.altText,
      imageUrl: galleryImages.imageUrl,
      category: galleryImages.category,
      createdAt: galleryImages.createdAt
    })
    .from(galleryImages)
    .where(and(
      eq(galleryImages.published, true),
      like(galleryImages.title, searchTerm)
    ))
    .limit(3);

    // Search gallery altText if title search didn't yield enough results
    if (galleryResults.length < 3) {
      const altTextResults = await db.select({
        id: galleryImages.id,
        title: galleryImages.title,
        altText: galleryImages.altText,
        imageUrl: galleryImages.imageUrl,
        category: galleryImages.category,
        createdAt: galleryImages.createdAt
      })
      .from(galleryImages)
      .where(and(
        eq(galleryImages.published, true),
        like(galleryImages.altText, searchTerm)
      ))
      .limit(3 - galleryResults.length);

      // Merge results, avoiding duplicates
      const existingIds = galleryResults.map(g => g.id);
      const uniqueAltTextResults = altTextResults.filter(g => !existingIds.includes(g.id));
      galleryResults.push(...uniqueAltTextResults);
    }

    // Search story cards (published only)
    const storiesResults = await db.select({
      id: storyCards.id,
      title: storyCards.title,
      subtitle: storyCards.subtitle,
      category: storyCards.category,
      backgroundImage: storyCards.backgroundImage,
      linkUrl: storyCards.linkUrl,
      createdAt: storyCards.createdAt
    })
    .from(storyCards)
    .where(and(
      eq(storyCards.published, true),
      like(storyCards.title, searchTerm)
    ))
    .limit(3);

    // Search story cards subtitle if title search didn't yield enough results
    if (storiesResults.length < 3) {
      const subtitleResults = await db.select({
        id: storyCards.id,
        title: storyCards.title,
        subtitle: storyCards.subtitle,
        category: storyCards.category,
        backgroundImage: storyCards.backgroundImage,
        linkUrl: storyCards.linkUrl,
        createdAt: storyCards.createdAt
      })
      .from(storyCards)
      .where(and(
        eq(storyCards.published, true),
        like(storyCards.subtitle, searchTerm)
      ))
      .limit(3 - storiesResults.length);

      // Merge results, avoiding duplicates
      const existingIds = storiesResults.map(s => s.id);
      const uniqueSubtitleResults = subtitleResults.filter(s => !existingIds.includes(s.id));
      storiesResults.push(...uniqueSubtitleResults);
    }

    // Search blog posts (published only)
    const blogResults = await db.select({
      id: blogPosts.id,
      slug: blogPosts.slug,
      title: blogPosts.title,
      excerpt: blogPosts.excerpt,
      author: blogPosts.author,
      category: blogPosts.category,
      featuredImage: blogPosts.featuredImage,
      publishedAt: blogPosts.publishedAt,
      createdAt: blogPosts.createdAt
    })
    .from(blogPosts)
    .where(and(
      eq(blogPosts.published, true),
      like(blogPosts.title, searchTerm)
    ))
    .limit(3);

    // Search blog posts excerpt if title search didn't yield enough results
    if (blogResults.length < 3) {
      const excerptResults = await db.select({
        id: blogPosts.id,
        slug: blogPosts.slug,
        title: blogPosts.title,
        excerpt: blogPosts.excerpt,
        author: blogPosts.author,
        category: blogPosts.category,
        featuredImage: blogPosts.featuredImage,
        publishedAt: blogPosts.publishedAt,
        createdAt: blogPosts.createdAt
      })
      .from(blogPosts)
      .where(and(
        eq(blogPosts.published, true),
        like(blogPosts.excerpt, searchTerm)
      ))
      .limit(3 - blogResults.length);

      // Merge results, avoiding duplicates
      const existingIds = blogResults.map(b => b.id);
      const uniqueExcerptResults = excerptResults.filter(b => !existingIds.includes(b.id));
      blogResults.push(...uniqueExcerptResults);
    }

    // Return grouped results
    return NextResponse.json({
      pages: pagesResults,
      gallery: galleryResults,
      stories: storiesResults,
      blog: blogResults
    });

  } catch (error) {
    console.error('GET search error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}