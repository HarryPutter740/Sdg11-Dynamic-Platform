"use client";

import { Factory, TrendingUp, Users, Leaf, ExternalLink, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function IndustryPage() {
  const headlines = [
    {
      title: "Green Manufacturing: The Future of Sustainable Industry",
      source: "UNIDO",
      date: "March 2024",
      link: "https://www.unido.org/",
      image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=500&fit=crop"
    },
    {
      title: "Industry 4.0 Transforms Global Manufacturing",
      source: "World Economic Forum",
      date: "February 2024",
      link: "https://www.weforum.org/",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop"
    },
    {
      title: "Circular Economy in Manufacturing: Success Stories",
      source: "Ellen MacArthur Foundation",
      date: "January 2024",
      link: "https://sdgs.un.org/goals/goal9",
      image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&h=500&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 to-emerald-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Factory className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Sustainable Industry
            </h1>
            <p className="text-xl text-gray-200">
              Promoting inclusive and sustainable industrialization with increased employment and economic growth
            </p>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Factory, value: '17%', label: 'Global GDP Share', color: 'green' },
              { icon: Users, value: '1.3B', label: 'Manufacturing Jobs', color: 'blue' },
              { icon: TrendingUp, value: '8%', label: 'Annual Growth', color: 'purple' },
              { icon: Leaf, value: '45%', label: 'Emissions Reduction Target', color: 'emerald' },
            ].map((stat, index) => (
              <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-green-600 dark:text-green-400" />
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
          <h2 className="text-3xl font-bold mb-8 text-center">Latest Industry News</h2>
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
                  <h3 className="text-xl font-bold mb-3 group-hover:text-green-600 transition-colors">
                    {headline.title}
                  </h3>
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <span>Read More</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Evolution Flowchart */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Evolution of Manufacturing</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { era: 'Industry 1.0', year: '1760s', tech: 'Steam Power', color: 'gray' },
                { era: 'Industry 2.0', year: '1870s', tech: 'Electricity', color: 'yellow' },
                { era: 'Industry 3.0', year: '1970s', tech: 'Automation', color: 'blue' },
                { era: 'Industry 4.0', year: '2010s', tech: 'AI & IoT', color: 'green' },
              ].map((item, index) => (
                <div key={index} className={`relative p-6 bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 dark:from-${item.color}-900/20 dark:to-${item.color}-800/20 rounded-xl`}>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gray-300 dark:bg-gray-700" />
                  )}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{item.era}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.year}</div>
                    <div className="font-semibold text-gray-700 dark:text-gray-300">{item.tech}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Explore More Objectives</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/objectives/infrastructure" className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Quality Infrastructure
            </Link>
            <Link href="/objectives/innovation" className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Foster Innovation
            </Link>
            <Link href="/objectives/connectivity" className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Universal Connectivity
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}