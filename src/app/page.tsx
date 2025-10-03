"use client";

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, Play, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface StoryCard {
  id: number;
  title: string;
  subtitle: string | null;
  category: string;
  backgroundImage: string;
  linkUrl: string | null;
  content: string | null;
  size: string;
}

export default function Home() {
  const { t } = useLanguage();
  const [storyCards, setStoryCards] = useState<StoryCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<StoryCard[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const facts = [
    t('dyk_fact1') || 'Cities consume over two-thirds of the world\'s energy and account for more than 70% of global CO2 emissions.',
    t('dyk_fact2') || 'By 2050, the world\'s urban population is expected to nearly double, making sustainable urbanization a critical global priority.',
    t('dyk_fact3') || 'Over 1 billion people live in slums, and this number is projected to rise without significant intervention in housing policies.',
  ];

  useEffect(() => {
    fetchStoryCards();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % facts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [facts.length]);

  const fetchStoryCards = async () => {
    try {
      const response = await fetch('/api/story-cards');
      if (response.ok) {
        const data = await response.json();
        setStoryCards(data);
        setFilteredCards(data);
      }
    } catch (error) {
      console.error('Failed to fetch story cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredCards(storyCards);
    } else {
      setFilteredCards(storyCards.filter(card => card.category === filter));
    }
  };

  const scrollToContent = () => {
    const element = document.getElementById('main-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/2882566/2882566-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <span className="inline-block text-green-400 font-semibold text-lg mb-4 animate-fade-in-up">
            The Future is Urban
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Building the Sustainable Cities of Tomorrow
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {t('hero_description') || 'Creating inclusive, safe, resilient and sustainable urban spaces for everyone'}
          </p>
        </div>

        {/* Scroll Down Arrow */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
          aria-label="Scroll to main content"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* Did You Know Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900" id="main-content">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            {t('dyk_title') || 'Did You Know?'}
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative h-32 sm:h-24">
              {facts.map((fact, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentFactIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <p 
                    className="text-xl sm:text-2xl text-center text-gray-700 dark:text-gray-200"
                    dangerouslySetInnerHTML={{ __html: fact }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-2 mt-8">
              {facts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFactIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentFactIndex 
                      ? 'bg-green-600 w-8' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to fact ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
            SDG 11 in Action
          </h2>

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'case-study', 'data', 'action', 'video'].map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {filter === 'all' ? 'All Stories' : filter.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Stories Grid */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCards.map((card, index) => (
                <div
                  key={card.id}
                  className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in-up ${
                    card.size === 'large' ? 'sm:col-span-2 sm:row-span-2' : 
                    card.size === 'medium' ? 'sm:col-span-2' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={card.backgroundImage}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full min-h-[300px] p-6 flex flex-col justify-end text-white">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-3 w-fit">
                      {card.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </span>
                    <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                    {card.subtitle && (
                      <p className="text-gray-200 mb-4">{card.subtitle}</p>
                    )}
                    {card.content && (
                      <p className="text-sm text-gray-300 line-clamp-3 mb-4">{card.content}</p>
                    )}
                    {card.linkUrl && (
                      <a
                        href={card.linkUrl}
                        target={card.linkUrl.startsWith('http') ? '_blank' : '_self'}
                        rel={card.linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                      >
                        {card.category === 'video' ? (
                          <>
                            <Play className="w-5 h-5" />
                            <span>Watch Video</span>
                          </>
                        ) : (
                          <>
                            <span>Learn More</span>
                            <ExternalLink className="w-4 h-4" />
                          </>
                        )}
                      </a>
                    )}
                  </div>

                  {/* Video Play Icon for Video Cards */}
                  {card.category === 'video' && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!loading && filteredCards.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-12">
              No stories found for this category.
            </p>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-green-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Urban Impact by the Numbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '4.4B', label: 'People in Cities', suffix: '' },
              { number: '68', label: 'Population in Cities by 2050', suffix: '%' },
              { number: '80', label: 'Global GDP from Cities', suffix: '%' },
              { number: '70', label: 'CO2 Emissions from Cities', suffix: '%' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl sm:text-6xl font-bold text-green-400 mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-lg text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Join the Movement
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover how you can contribute to building sustainable cities and communities worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/gallery"
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              Explore Gallery
            </a>
            <a
              href="/blog"
              className="px-8 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
            >
              Read Stories
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}