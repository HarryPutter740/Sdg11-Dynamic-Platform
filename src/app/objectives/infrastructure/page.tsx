"use client";

import { Building2, TrendingUp, Users, Globe2, ExternalLink, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function InfrastructurePage() {
  const headlines = [
    {
      title: "Global Infrastructure Investment Reaches $4 Trillion in 2024",
      source: "World Bank",
      date: "March 2024",
      link: "https://www.worldbank.org/en/topic/infrastructure",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop"
    },
    {
      title: "Smart Infrastructure: How IoT is Transforming Cities",
      source: "UN Habitat",
      date: "February 2024",
      link: "https://unhabitat.org/",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=500&fit=crop"
    },
    {
      title: "Sustainable Bridge Design: Carbon-Neutral Construction",
      source: "Engineering News",
      date: "January 2024",
      link: "https://sdgs.un.org/goals/goal9",
      image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&h=500&fit=crop"
    }
  ];

  const videos = [
    {
      title: "Building Tomorrow's Infrastructure",
      thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      title: "Resilient Infrastructure for Climate Change",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Building2 className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Quality Infrastructure
            </h1>
            <p className="text-xl text-gray-200">
              Developing reliable, sustainable, and resilient infrastructure to support economic development and human well-being worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, value: '$4T', label: 'Annual Investment', color: 'blue' },
              { icon: Building2, value: '60%', label: 'Urban Population', color: 'green' },
              { icon: Users, value: '1B+', label: 'Jobs Created', color: 'purple' },
              { icon: Globe2, value: '190', label: 'Countries Involved', color: 'orange' },
            ].map((stat, index) => (
              <div key={index} className={`p-6 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-center`}>
                <stat.icon className={`w-8 h-8 mx-auto mb-3 text-${stat.color}-600 dark:text-${stat.color}-400`} />
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
          <h2 className="text-3xl font-bold mb-8 text-center">Latest Headlines</h2>
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
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                    {headline.title}
                  </h3>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <span>Read More</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Videos */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Educational Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {videos.map((video, index) => (
              <a
                key={index}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative h-64">
                  <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-bold">{video.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Infographic Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Infrastructure Development Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                { step: 1, title: 'Assessment & Planning', description: 'Analyze infrastructure needs and create comprehensive development plans' },
                { step: 2, title: 'Funding & Investment', description: 'Secure financing through public-private partnerships and international cooperation' },
                { step: 3, title: 'Design & Engineering', description: 'Develop sustainable and resilient infrastructure designs' },
                { step: 4, title: 'Construction & Implementation', description: 'Build infrastructure using modern, eco-friendly technologies' },
                { step: 5, title: 'Monitoring & Maintenance', description: 'Ensure long-term sustainability through regular monitoring and upkeep' },
              ].map((item) => (
                <div key={item.step} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Explore More Objectives</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/objectives/industry" className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Sustainable Industry
            </Link>
            <Link href="/objectives/innovation" className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Foster Innovation
            </Link>
            <Link href="/objectives/connectivity" className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Universal Connectivity
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}