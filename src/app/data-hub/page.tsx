"use client";

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartData {
  id: number;
  title: string;
  description: string;
  type: 'bar' | 'line' | 'pie' | 'doughnut';
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}

export default function DataHubPage() {
  const { t } = useLanguage();
  const [charts, setCharts] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharts();
  }, []);

  const fetchCharts = async () => {
    try {
      const response = await fetch('/api/charts');
      if (response.ok) {
        const data = await response.json();
        setCharts(data);
      }
    } catch (error) {
      console.error('Failed to fetch charts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getChartIcon = (type: string) => {
    switch (type) {
      case 'bar':
        return <BarChart3 className="w-6 h-6" />;
      case 'line':
        return <TrendingUp className="w-6 h-6" />;
      case 'pie':
        return <PieChart className="w-6 h-6" />;
      case 'doughnut':
        return <Activity className="w-6 h-6" />;
      default:
        return <BarChart3 className="w-6 h-6" />;
    }
  };

  const renderChart = (chart: ChartData) => {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            color: 'rgb(156, 163, 175)',
            font: {
              family: 'Poppins, sans-serif'
            }
          }
        },
        title: {
          display: false
        }
      },
      scales: chart.type !== 'pie' && chart.type !== 'doughnut' ? {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'rgb(156, 163, 175)'
          },
          grid: {
            color: 'rgba(156, 163, 175, 0.1)'
          }
        },
        x: {
          ticks: {
            color: 'rgb(156, 163, 175)'
          },
          grid: {
            color: 'rgba(156, 163, 175, 0.1)'
          }
        }
      } : undefined
    };

    const chartData = {
      labels: chart.labels,
      datasets: chart.datasets
    };

    switch (chart.type) {
      case 'bar':
        return <Bar data={chartData} options={options} />;
      case 'line':
        return <Line data={chartData} options={options} />;
      case 'pie':
        return <Pie data={chartData} options={options} />;
      case 'doughnut':
        return <Doughnut data={chartData} options={options} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-6 animate-fade-in-up">
            <BarChart3 className="w-8 h-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {t('data_hub_title') || 'Interactive Data Hub'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t('data_hub_description') || 'Explore comprehensive data visualizations on industrial innovation, infrastructure development, and SDG 9 progress worldwide'}
          </p>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { value: '$2.4T', label: 'Global R&D Investment', change: '+8.5%', trend: 'up' },
              { value: '2.6B', label: 'People Lack Internet', change: '-12%', trend: 'down' },
              { value: '17%', label: 'Manufacturing of GDP', change: '+2.1%', trend: 'up' },
              { value: '90%', label: 'R&D in High-Income', change: '+1.8%', trend: 'up' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                  {stat.label}
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? '↑' : '↓'}
                  <span>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg animate-pulse">
                  <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded mb-4 w-3/4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-6 w-full" />
                  <div className="h-80 bg-gray-200 dark:bg-gray-800 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {charts.map((chart, index) => (
                <div
                  key={chart.id}
                  className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center">
                      {getChartIcon(chart.type)}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">{chart.title}</h2>
                      <p className="text-gray-600 dark:text-gray-400">{chart.description}</p>
                    </div>
                  </div>
                  <div className="h-80">
                    {renderChart(chart)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && charts.length === 0 && (
            <div className="text-center py-16">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-500 dark:text-gray-400">
                No data visualizations available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Want to Explore More Data?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Access comprehensive reports and detailed analysis on industrial innovation and infrastructure development
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/gallery"
              className="px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 font-semibold rounded-lg transition-colors"
            >
              View Gallery
            </a>
            <a
              href="/blog"
              className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold rounded-lg transition-colors"
            >
              Read Case Studies
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}