import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-9xl font-bold text-green-600 dark:text-green-400 mb-4">
            404
          </h1>
          <h2 className="text-4xl font-bold mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>

        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You might be interested in:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/targets"
              className="px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg transition-colors shadow-sm"
            >
              SDG 9 Targets
            </Link>
            <Link
              href="/gallery"
              className="px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg transition-colors shadow-sm"
            >
              Gallery
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg transition-colors shadow-sm"
            >
              Blog
            </Link>
            <Link
              href="/data-hub"
              className="px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg transition-colors shadow-sm"
            >
              Data Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}