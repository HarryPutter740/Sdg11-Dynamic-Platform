"use client";

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Share2, Download, Facebook, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface GalleryImage {
  id: number;
  title: string;
  altText: string;
  imageUrl: string;
  category: string;
}

export default function GalleryPage() {
  const { t } = useLanguage();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  const categories = ['all', 'nature', 'transport', 'architecture', 'housing', 'community'];
  const limit = 9;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (category = 'all', pageNum = 1) => {
    setLoading(true);
    try {
      const url = category === 'all' 
        ? `/api/gallery?page=${pageNum}&limit=${limit}`
        : `/api/gallery?category=${category}&page=${pageNum}&limit=${limit}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        
        if (pageNum === 1) {
          setImages(data);
          setFilteredImages(data);
        } else {
          setImages(prev => [...prev, ...data]);
          setFilteredImages(prev => [...prev, ...data]);
        }
        
        setHasMore(data.length === limit);
      }
    } catch (error) {
      console.error('Failed to fetch gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (category: string) => {
    setActiveFilter(category);
    setPage(1);
    setHasMore(true);
    fetchImages(category, 1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(activeFilter, nextPage);
  };

  const openLightbox = (image: GalleryImage) => {
    setCurrentImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
    setShareMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!currentImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === currentImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    }
    
    setCurrentImage(filteredImages[newIndex]);
  };

  const handleShare = (platform: string) => {
    if (!currentImage) return;
    
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out: ${currentImage.title}`);
    
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleDownload = async () => {
    if (!currentImage) return;
    
    try {
      const response = await fetch(currentImage.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentImage.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImage]);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
            {t('gallery_title') || 'SDG 11 Gallery'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t('gallery_description') || 'Explore inspiring visuals of sustainable urban development from around the world'}
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-white dark:bg-gray-900 sticky top-20 z-40 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeFilter === category
                    ? 'bg-green-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading && page === 1 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="group relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${(index % 9) * 0.1}s` }}
                    onClick={() => openLightbox(image)}
                  >
                    <Image
                      src={image.imageUrl}
                      alt={image.altText}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-xl font-bold mb-2">{image.title}</h3>
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                          {image.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredImages.length === 0 && !loading && (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-500 dark:text-gray-400">
                    No images found in this category.
                  </p>
                </div>
              )}

              {hasMore && filteredImages.length > 0 && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-50"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={() => navigateLightbox('prev')}
            className="absolute left-4 p-3 text-white hover:bg-white/10 rounded-full transition-colors z-50"
            aria-label="Previous image"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => navigateLightbox('next')}
            className="absolute right-4 p-3 text-white hover:bg-white/10 rounded-full transition-colors z-50"
            aria-label="Next image"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Container */}
          <div className="relative max-w-7xl max-h-[80vh] mx-4">
            <div className="relative w-full h-full">
              <Image
                src={currentImage.imageUrl}
                alt={currentImage.altText}
                width={1200}
                height={800}
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Image Info */}
            <div className="mt-6 text-center text-white">
              <h2 className="text-2xl font-bold mb-2">{currentImage.title}</h2>
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                {currentImage.category}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShareMenuOpen(!shareMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>

                {shareMenuOpen && (
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 flex gap-2">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-5 h-5 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-5 h-5 text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-blue-700" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}