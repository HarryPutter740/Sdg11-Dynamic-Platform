"use client";

import { useState, useEffect, useCallback } from 'react';
import { Search, X, FileText, Image as ImageIcon, BookOpen, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchResult {
  id: number;
  type: 'page' | 'blog' | 'gallery' | 'story';
  title: string;
  excerpt?: string;
  url: string;
  category?: string;
}

export default function SearchOverlay() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Open search with keyboard shortcut (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search-simple?q=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'page':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'blog':
        return <BookOpen className="w-5 h-5 text-green-500" />;
      case 'gallery':
        return <ImageIcon className="w-5 h-5 text-purple-500" />;
      case 'story':
        return <BarChart3 className="w-5 h-5 text-orange-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleResultClick = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        aria-label="Open search"
      >
        <Search className="w-5 h-5" />
        <span className="hidden sm:inline text-gray-600 dark:text-gray-400">Search</span>
        <kbd className="hidden sm:inline px-2 py-1 text-xs bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Search Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <Search className="w-6 h-6 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search_placeholder') || 'Search for articles, images, data...'}
            className="flex-1 bg-transparent text-lg outline-none"
            autoFocus
            aria-label="Search input"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && query.trim().length >= 2 && results.length === 0 && (
            <div className="py-12 text-center text-gray-500 dark:text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No results found for "{query}"</p>
              <p className="text-sm mt-2">Try different keywords or browse our sections</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="py-2">
              {results.map((result, index) => (
                <Link
                  key={`${result.type}-${result.id}-${index}`}
                  href={result.url}
                  onClick={handleResultClick}
                  className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors truncate">
                        {result.title}
                      </h3>
                      {result.category && (
                        <span className="flex-shrink-0 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-xs rounded">
                          {result.category}
                        </span>
                      )}
                    </div>
                    {result.excerpt && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {result.excerpt}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {query.trim().length < 2 && (
            <div className="py-8 px-6 text-sm text-gray-500 dark:text-gray-400">
              <p className="mb-4 font-semibold">Quick tips:</p>
              <ul className="space-y-2">
                <li>• Type at least 2 characters to search</li>
                <li>• Use keywords like "urban", "sustainability", "housing"</li>
                <li>• Press ESC to close or ⌘K to open search</li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded">↵</kbd>
              to select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded">ESC</kbd>
              to close
            </span>
          </div>
          <span>Powered by SDG 11 Search</span>
        </div>
      </div>
    </div>
  );
}