"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink } from 'lucide-react';

const targets = [
  {
    id: '11.1',
    title: 'Safe and Affordable Housing',
    description: 'By 2030, ensure access for all to adequate, safe and affordable housing and basic services and upgrade slums.',
    link: 'https://sdgs.un.org/goals/goal11#target-11-1',
  },
  {
    id: '11.2',
    title: 'Affordable and Sustainable Transport',
    description: 'By 2030, provide access to safe, affordable, accessible and sustainable transport systems for all, improving road safety, notably by expanding public transport.',
    link: 'https://sdgs.un.org/goals/goal11#target-11-2',
  },
  {
    id: '11.3',
    title: 'Inclusive and Sustainable Urbanization',
    description: 'By 2030, enhance inclusive and sustainable urbanization and capacity for participatory, integrated and sustainable human settlement planning and management in all countries.',
    link: 'https://sdgs.un.org/goals/goal11#target-11-3',
  },
  {
    id: '11.4',
    title: 'Protect Cultural and Natural Heritage',
    description: "Strengthen efforts to protect and safeguard the world's cultural and natural heritage.",
    link: 'https://sdgs.un.org/goals/goal11#target-11-4',
  },
  {
    id: '11.5',
    title: 'Reduce the Impact of Disasters',
    description: 'By 2030, significantly reduce the number of deaths and the number of people affected and substantially decrease the direct economic losses relative to global gross domestic product caused by disasters.',
    link: 'https://sdgs.un.org/goals/goal11#target-11-5',
  },
  {
    id: '11.6',
    title: 'Reduce Environmental Impact of Cities',
    description: 'By 2030, reduce the adverse per capita environmental impact of cities, including by paying special attention to air quality and municipal and other waste management.',
    link: 'https://sdgs.un.org/goals/goal11#target-11-6',
  },
  {
    id: '11.7',
    title: 'Provide Access to Green and Public Spaces',
    description: 'By 2030, provide universal access to safe, inclusive and accessible, green and public spaces, in particular for women and children, older persons and persons with disabilities.',
    link: 'https://sdgs.un.org/goals/goal11#target-11-7',
  },
];

const timelineItems = [
  {
    year: 'BY 2025',
    title: 'Strengthen Resilience',
    description: 'Develop and implement holistic disaster risk management at all levels.',
  },
  {
    year: 'BY 2030',
    title: 'Universal Access',
    description: 'Ensure access for all to adequate housing, basic services, and sustainable transport.',
  },
  {
    year: 'BY 2030',
    title: 'Reduce Environmental Impact',
    description: 'Focus on air quality and waste management to reduce the adverse environmental impact of cities.',
  },
];

export default function TargetsPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              {t('targets_hero_title') || 'SDG 11: Detailed Targets'}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t('targets_hero_subtitle') || 'A closer look at the specific goals for sustainable urban development'}
            </p>
          </div>
        </div>
      </section>

      {/* Targets Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            The 7 Targets of SDG 11
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
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {target.id}
                </div>

                {/* Content */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {target.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-4">
                    {target.description}
                  </p>
                  <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
                    <span>Learn More</span>
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-tl-full" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            A Roadmap to 2030
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-600 to-blue-600 hidden md:block" />

              {/* Timeline Items */}
              {timelineItems.map((item, index) => (
                <div
                  key={index}
                  className={`relative mb-12 ${
                    index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:text-left'
                  } animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-gray-900 border-4 border-green-600 rounded-full hidden md:block z-10" />

                  {/* Content Card */}
                  <div className={`inline-block ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                      <span className="inline-block px-4 py-1 bg-gradient-to-r from-green-600 to-blue-600 text-white text-sm font-bold rounded-full mb-3">
                        {item.year}
                      </span>
                      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Objectives */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Core Objectives
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🏠',
                title: 'Safe Housing',
                description: 'Upgrade slums and ensure access to adequate and affordable housing for all.',
              },
              {
                icon: '🚊',
                title: 'Sustainable Transport',
                description: 'Provide safe, affordable, and accessible transport systems, especially public transit.',
              },
              {
                icon: '🏛️',
                title: 'Protect Heritage',
                description: "Strengthen efforts to protect and safeguard the world's cultural and natural heritage.",
              },
              {
                icon: '🌳',
                title: 'Green Spaces',
                description: 'Ensure universal access to safe, inclusive, and accessible green and public spaces.',
              },
            ].map((objective, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-6xl mb-4">{objective.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {objective.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {objective.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-green-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            How You Can Help
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Every action counts in building sustainable cities. Discover how you can contribute to achieving these goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/gallery"
              className="px-8 py-3 bg-white text-green-900 hover:bg-gray-100 font-semibold rounded-lg transition-colors"
            >
              See Success Stories
            </a>
            <a
              href="/blog"
              className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold rounded-lg transition-colors"
            >
              Read Our Blog
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}