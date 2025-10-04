"use client";

import { Wifi, Globe2, TrendingUp, Users, ExternalLink, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ConnectivityPage() {
  const headlines = [
    {
      title: "5G Revolution: Connecting the Next Billion",
      source: "ITU",
      date: "March 2024",
      link: "https://www.itu.int/",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&h=500&fit=crop"
    },
    {
      title: "Satellite Internet Brings Hope to Remote Areas",
      source: "UN Digital Cooperation",
      date: "February 2024",
      link: "https://www.un.org/en/",
      image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=500&fit=crop"
    },
    {
      title: "Bridging the Digital Divide: Success Stories from Africa",
      source: "World Bank",
      date: "January 2024",
      link: "https://www.worldbank.org/",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-cyan-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Wifi className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Universal Connectivity
            </h1>
            <p className="text-xl text-gray-200">
              Increasing access to ICT and providing universal, affordable Internet access globally
            </p>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Globe2, value: '5.3B', label: 'Internet Users', color: 'cyan' },
              { icon: Wifi, value: '67%', label: 'Global Penetration', color: 'blue' },
              { icon: TrendingUp, value: '12%', label: 'Annual Growth', color: 'indigo' },
              { icon: Users, value: '2.6B', label: 'Still Offline', color: 'sky' },
            ].map((stat, index) => (
              <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-cyan-600 dark:text-cyan-400" />
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
          <h2 className="text-3xl font-bold mb-8 text-center">Connectivity News</h2>
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
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-600 transition-colors">
                    {headline.title}
                  </h3>
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                    <span>Read More</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Access Pyramid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Levels of Digital Access</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { level: 'Innovation', percentage: '10%', desc: 'Creating new digital solutions', color: 'from-purple-500 to-pink-500' },
              { level: 'Advanced Usage', percentage: '25%', desc: 'E-commerce, digital services', color: 'from-blue-500 to-cyan-500' },
              { level: 'Active Participation', percentage: '40%', desc: 'Social media, content creation', color: 'from-green-500 to-emerald-500' },
              { level: 'Basic Access', percentage: '65%', desc: 'Internet browsing, messaging', color: 'from-yellow-500 to-orange-500' },
              { level: 'Infrastructure', percentage: '100%', desc: 'Physical network availability', color: 'from-gray-500 to-gray-700' },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div
                  className={`h-20 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-between px-6 text-white shadow-lg transition-all hover:scale-105`}
                  style={{ width: item.percentage }}
                >
                  <div>
                    <div className="font-bold text-lg">{item.level}</div>
                    <div className="text-sm opacity-90">{item.desc}</div>
                  </div>
                  <div className="font-bold text-2xl">{item.percentage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-cyan-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Explore More Objectives</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/objectives/infrastructure" className="px-6 py-3 bg-white text-cyan-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Quality Infrastructure
            </Link>
            <Link href="/objectives/industry" className="px-6 py-3 bg-white text-cyan-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Sustainable Industry
            </Link>
            <Link href="/objectives/innovation" className="px-6 py-3 bg-white text-cyan-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Foster Innovation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}