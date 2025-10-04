"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const targets = [
  {
    id: '9.1',
    title: 'Develop Quality Infrastructure',
    description: 'Develop quality, reliable, sustainable and resilient infrastructure, including regional and transborder infrastructure, to support economic development and human well-being, with a focus on affordable and equitable access for all.',
    link: 'https://sdgs.un.org/goals/goal9#target-9-1',
  },
  {
    id: '9.2',
    title: 'Promote Inclusive Industrialization',
    description: 'Promote inclusive and sustainable industrialization and, by 2030, significantly raise industry\'s share of employment and gross domestic product, in line with national circumstances, and double its share in least developed countries.',
    link: 'https://sdgs.un.org/goals/goal9#target-9-2',
  },
  {
    id: '9.3',
    title: 'Increase Access to Financial Services',
    description: 'Increase the access of small-scale industrial and other enterprises, in particular in developing countries, to financial services, including affordable credit, and their integration into value chains and markets.',
    link: 'https://sdgs.un.org/goals/goal9#target-9-3',
  },
  {
    id: '9.4',
    title: 'Upgrade Infrastructure for Sustainability',
    description: 'By 2030, upgrade infrastructure and retrofit industries to make them sustainable, with increased resource-use efficiency and greater adoption of clean and environmentally sound technologies and industrial processes.',
    link: 'https://sdgs.un.org/goals/goal9#target-9-4',
  },
  {
    id: '9.5',
    title: 'Enhance Scientific Research',
    description: 'Enhance scientific research, upgrade the technological capabilities of industrial sectors in all countries, in particular developing countries, including, by 2030, encouraging innovation and substantially increasing the number of research and development workers.',
    link: 'https://sdgs.un.org/goals/goal9#target-9-5',
  },
  {
    id: '9.a',
    title: 'Facilitate Sustainable Infrastructure Development',
    description: 'Facilitate sustainable and resilient infrastructure development in developing countries through enhanced financial, technological and technical support to African countries, least developed countries, landlocked developing countries and small island developing States.',
    link: 'https://sdgs.un.org/goals/goal9#target-9-a',
  },
  {
    id: '9.b',
    title: 'Support Domestic Technology Development',
    description: 'Support domestic technology development, research and innovation in developing countries, including by ensuring a conducive policy environment for, inter alia, industrial diversification and value addition to commodities.',
    link: 'https://sdgs.un.org/goals/goal9#target-9-b',
  },
  {
    id: '9.c',
    title: 'Increase Access to ICT',
    description: 'Significantly increase access to information and communications technology and strive to provide universal and affordable access to the Internet in least developed countries by 2020.',
    link: 'https://sdgs.un.org/goals/goal9#target-9-c',
  },
];

const timelineItems = [
  {
    year: '2020',
    status: 'completed',
    title: 'Universal Internet Access',
    description: 'Provide universal and affordable access to the Internet in least developed countries.',
    progress: 85,
  },
  {
    year: '2025',
    status: 'in-progress',
    title: 'Enhanced R&D Investment',
    description: 'Increase research and development workers per million people and enhance innovation capabilities.',
    progress: 60,
  },
  {
    year: '2030',
    status: 'upcoming',
    title: 'Double Industrial Share',
    description: 'Significantly raise industry\'s share of employment and GDP in least developed countries.',
    progress: 40,
  },
  {
    year: '2030',
    status: 'upcoming',
    title: 'Sustainable Infrastructure',
    description: 'Upgrade infrastructure and retrofit industries for sustainability with clean technologies.',
    progress: 35,
  },
];

const coreObjectives = [
  {
    icon: '🏗️',
    title: 'Quality Infrastructure',
    description: 'Develop reliable, sustainable and resilient infrastructure to support economic development and human well-being.',
    link: '/objectives/infrastructure',
  },
  {
    icon: '🏭',
    title: 'Sustainable Industry',
    description: 'Promote inclusive and sustainable industrialization with increased employment and GDP share.',
    link: '/objectives/industry',
  },
  {
    icon: '💡',
    title: 'Foster Innovation',
    description: 'Enhance scientific research and upgrade technological capabilities across all sectors.',
    link: '/objectives/innovation',
  },
  {
    icon: '🌐',
    title: 'Universal Connectivity',
    description: 'Increase access to ICT and provide universal and affordable Internet access globally.',
    link: '/objectives/connectivity',
  },
];

export default function TargetsPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              {t('targets_hero_title') || 'SDG 9: Detailed Targets'}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Eight clear goals driving infrastructure, industry, and innovation forward by 2030
            </p>
          </div>
        </div>
      </section>

      {/* Targets Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            The 8 Targets of SDG 9
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targets.map((target, index) => (
              <a
                key={target.id}
                href={target.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Target Number Badge */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {target.id}
                </div>

                {/* Content */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {target.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-4">
                    {target.description}
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    <span>Learn More</span>
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-tl-full" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Timeline Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Roadmap to 2030
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Track our progress towards achieving sustainable industry, innovation, and infrastructure goals
          </p>
          
          <div className="max-w-5xl mx-auto">
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className="relative mb-12 last:mb-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Timeline connector line */}
                {index !== timelineItems.length - 1 && (
                  <div className="absolute left-8 top-20 w-1 h-full bg-gradient-to-b from-blue-600 to-indigo-600 hidden md:block" />
                )}

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Year badge */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg shadow-lg ${
                      item.status === 'completed' ? 'bg-green-600 text-white' :
                      item.status === 'in-progress' ? 'bg-blue-600 text-white' :
                      'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                      {item.year}
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {item.title}
                          </h3>
                          {item.status === 'completed' && (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Progress
                        </span>
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          {item.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            item.status === 'completed' ? 'bg-green-600' :
                            item.status === 'in-progress' ? 'bg-blue-600' :
                            'bg-gray-400'
                          }`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="mt-4">
                      <span className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        item.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {item.status === 'completed' ? 'Completed' :
                         item.status === 'in-progress' ? 'In Progress' :
                         'Upcoming'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Objectives - Now with Links */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Core Objectives
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreObjectives.map((objective, index) => (
              <Link
                key={index}
                href={objective.link}
                className="group text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  {objective.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {objective.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {objective.description}
                </p>
                <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-medium group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            How You Can Contribute
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Every innovation matters in building sustainable infrastructure. Discover how you can contribute to achieving these goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/success-stories"
              className="px-8 py-3 bg-white text-blue-900 hover:bg-gray-100 font-semibold rounded-lg transition-colors"
            >
              See Success Stories
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold rounded-lg transition-colors"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}