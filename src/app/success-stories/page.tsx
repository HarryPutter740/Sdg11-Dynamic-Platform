"use client";

import { useEffect, useState } from 'react';
import { Award, Users, TrendingUp, MapPin, Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface SuccessStory {
  id: number;
  title: string;
  person: string;
  location: string;
  field: string;
  achievement: string;
  impact: string;
  year: string;
  image: string;
  details: string;
  externalLink?: string;
}

const successStories: SuccessStory[] = [
  {
    id: 1,
    title: "Revolutionizing Solar Energy in Rural India",
    person: "Dr. Aisha Patel",
    location: "Maharashtra, India",
    field: "Renewable Energy Infrastructure",
    achievement: "Developed low-cost solar microgrids serving 50,000+ households",
    impact: "Reduced energy costs by 60% and created 500+ local jobs",
    year: "2023",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
    details: "Dr. Patel's innovative solar microgrid solution has transformed rural electrification by making renewable energy accessible and affordable. Her work has been recognized globally and is being replicated in 15 countries.",
    externalLink: "https://www.un.org/sustainabledevelopment/blog/"
  },
  {
    id: 2,
    title: "Smart Manufacturing in Africa",
    person: "Michael Okonkwo",
    location: "Lagos, Nigeria",
    field: "Industrial Innovation",
    achievement: "Established Africa's first AI-powered manufacturing hub",
    impact: "Trained 2,000+ workers in Industry 4.0 technologies",
    year: "2023",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    details: "Michael's manufacturing innovation center has become a model for technological transformation in African industries, combining AI, IoT, and traditional manufacturing expertise to create sustainable economic growth.",
    externalLink: "https://www.un.org/sustainabledevelopment/blog/"
  },
  {
    id: 3,
    title: "Connecting Remote Communities",
    person: "Maria Rodriguez",
    location: "Andes Mountains, Peru",
    field: "Digital Infrastructure",
    achievement: "Built satellite internet network for 100+ remote villages",
    impact: "Connected 25,000 people to global digital economy",
    year: "2022",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    details: "Maria's satellite network project has bridged the digital divide in one of the world's most challenging terrains, enabling remote education, telemedicine, and e-commerce opportunities for previously isolated communities.",
    externalLink: "https://www.un.org/sustainabledevelopment/blog/"
  },
  {
    id: 4,
    title: "Sustainable Water Infrastructure",
    person: "Yuki Tanaka",
    location: "Tokyo, Japan",
    field: "Smart Infrastructure",
    achievement: "Designed AI-driven water management system",
    impact: "Reduced water waste by 40% across metropolitan area",
    year: "2023",
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&h=600&fit=crop",
    details: "Yuki's intelligent water management system uses machine learning to predict demand, detect leaks, and optimize distribution, setting a new standard for sustainable urban water infrastructure worldwide.",
    externalLink: "https://www.un.org/sustainabledevelopment/blog/"
  },
  {
    id: 5,
    title: "Green Steel Production Revolution",
    person: "Lars Eriksson",
    location: "Stockholm, Sweden",
    field: "Sustainable Manufacturing",
    achievement: "Pioneered hydrogen-based steel production at scale",
    impact: "Cut carbon emissions by 95% in steel manufacturing",
    year: "2023",
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=600&fit=crop",
    details: "Lars led the development of the world's first fossil-free steel production facility, proving that heavy industry can achieve near-zero emissions while remaining economically viable and competitive.",
    externalLink: "https://www.un.org/sustainabledevelopment/blog/"
  },
  {
    id: 6,
    title: "Mobile Innovation Labs",
    person: "Fatima Al-Hassan",
    location: "Dubai, UAE",
    field: "Innovation & R&D",
    achievement: "Created mobile makerspaces for youth in Middle East",
    impact: "Inspired 10,000+ young innovators, 200+ startups launched",
    year: "2022",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
    details: "Fatima's mobile innovation labs travel across the Middle East, providing hands-on technology education and startup incubation in underserved areas, fostering the next generation of tech entrepreneurs.",
    externalLink: "https://www.un.org/sustainabledevelopment/blog/"
  },
];

export default function SuccessStoriesPage() {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Award className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              Success Stories
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Meet the innovators and changemakers who are transforming industry, infrastructure, and innovation globally
            </p>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: '100K+', label: 'Lives Impacted' },
              { icon: TrendingUp, value: '500+', label: 'Jobs Created' },
              { icon: Award, value: '50+', label: 'Awards Won' },
              { icon: MapPin, value: '30+', label: 'Countries' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={story.id}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                      {story.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Award className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {story.title}
                    </h3>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      <span className="font-semibold">{story.person}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{story.location}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {story.details}
                  </p>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm mb-2">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">Achievement:</span>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">{story.achievement}</p>
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold text-green-600 dark:text-green-400">Impact:</span>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">{story.impact}</p>
                    </div>
                  </div>

                  {story.externalLink && (
                    <a
                      href={story.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm"
                    >
                      <span>Read Full Story</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Be Part of the Change
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Every innovation story starts with a single step. Discover how you can contribute to SDG 9 and create your own success story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/targets"
              className="px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 font-semibold rounded-lg transition-colors"
            >
              Explore Targets
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold rounded-lg transition-colors"
            >
              Read Insights
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}