"use client";

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
}

export default function BlogPage() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const categories = ['all', 'URBAN-PLANNING', 'SUSTAINABILITY', 'CASE-STUDIES', 'TECHNOLOGY'];
  const limit = 6;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (category = 'all', pageNum = 1) => {
    setLoading(true);
    try {
      const url = category === 'all'
        ? `/api/blog?page=${pageNum}&limit=${limit}`
        : `/api/blog?category=${category}&page=${pageNum}&limit=${limit}`;

      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        
        // Handle both array and object responses
        const postsArray = Array.isArray(result) ? result : (result.data || []);
        const pagination = result.pagination;

        if (pageNum === 1) {
          setPosts(postsArray);
          setFilteredPosts(postsArray);
        } else {
          setPosts(prev => [...prev, ...postsArray]);
          setFilteredPosts(prev => [...prev, ...postsArray]);
        }

        // Use pagination data if available, otherwise fallback to array length check
        setHasMore(pagination ? pagination.hasNext : postsArray.length === limit);
      }
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      setFilteredPosts([]);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
    setHasMore(true);
    fetchPosts(category, 1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(selectedCategory, nextPage);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCategoryDisplay = (category: string) => {
    if (category === 'all') return 'All Stories';
    return category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
            {t('blog_title') || 'Stories & Insights'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t('blog_description') || 'Discover the latest news, case studies, and insights on sustainable urban development'}
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white dark:bg-gray-900 sticky top-20 z-40 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {formatCategoryDisplay(category)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading && page === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg mb-4" />
                  <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded mb-3" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-2 w-3/4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className="group flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden animate-fade-in-up"
                    style={{ animationDelay: `${(index % 6) * 0.1}s` }}
                  >
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                            {formatCategoryDisplay(post.category)}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div className="flex-1 p-6 flex flex-col">
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-2xl font-bold mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                      </Link>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold text-sm group/link"
                        >
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredPosts.length === 0 && !loading && (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-500 dark:text-gray-400">
                    No blog posts found in this category.
                  </p>
                </div>
              )}

              {hasMore && filteredPosts.length > 0 && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
                  >
                    {loading ? 'Loading...' : 'Load More Posts'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}