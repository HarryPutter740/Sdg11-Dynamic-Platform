"use client";

import { Lightbulb, TrendingUp, Users, Zap, ExternalLink, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function InnovationPage() {
  const headlines = [
    {
      title: "AI Breakthroughs Drive Next Generation of Innovation",
      source: "MIT Technology Review",
      date: "March 2024",
      link: "https://www.technologyreview.com/",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop"
    },
    {
      title: "R&D Investment Reaches Record High Globally",
      source: "OECD",
      date: "February 2024",
      link: "https://www.oecd.org/",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop"
    },
    {
      title: "Quantum Computing: The Next Frontier",
      source: "Nature",
      date: "January 2024",
      link: "https://www.nature.com/",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=500&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Lightbulb className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Foster Innovation
            </h1>
            <p className="text-xl text-gray-200">
              Enhancing scientific research and upgrading technological capabilities to drive global progress
            </p>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, value: '$2.4T', label: 'Global R&D Spending', color: 'purple' },
              { icon: Users, value: '8.8M', label: 'Researchers Worldwide', color: 'pink' },
              { icon: Lightbulb, value: '3.3M', label: 'Patent Applications', color: 'indigo' },
              { icon: Zap, value: '156%', label: 'Innovation Growth', color: 'violet' },
            ].map((stat, index) => (
              <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-600 dark:text-purple-400" />
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Headlines */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Innovation Headlines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {headlines.map((headline, index) => (
              <a
                key={index}
                href={headline.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative h-48">
                  <Image src={headline.image} alt={headline.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>{headline.source}</span>
                    <span>•</span>
                    <span>{headline.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors">
                    {headline.title}
                  </h3>
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                    <span>Read More</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Ecosystem */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Innovation Ecosystem</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                Innovation
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                {[
                  { title: 'Research', icon: '🔬', desc: 'Scientific discovery' },
                  { title: 'Technology', icon: '💻', desc: 'Digital transformation' },
                  { title: 'Investment', icon: '💰', desc: 'Financial backing' },
                  { title: 'Education', icon: '🎓', desc: 'Skill development' },
                  { title: 'Collaboration', icon: '🤝', desc: 'Global partnerships' },
                  { title: 'Policy', icon: '📋', desc: 'Supportive frameworks' },
                  { title: 'Infrastructure', icon: '🏗️', desc: 'Physical resources' },
                  { title: 'Startups', icon: '🚀', desc: 'Entrepreneurship' },
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl text-center">
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <div className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Explore More Objectives</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/objectives/infrastructure" className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Quality Infrastructure
            </Link>
            <Link href="/objectives/industry" className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Sustainable Industry
            </Link>
            <Link href="/objectives/connectivity" className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Universal Connectivity
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}