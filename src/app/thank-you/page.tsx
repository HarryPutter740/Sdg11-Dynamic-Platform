import Link from 'next/link';
import { CheckCircle, Home, Mail } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-600 text-white rounded-full mb-6">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
            Your message has been successfully received.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            We appreciate you reaching out to us about SDG 9 and industrial innovation. 
            Our team will review your message and get back to you as soon as possible.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <div className="text-left flex-1">
              <h3 className="font-bold text-lg mb-2">What happens next?</h3>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                <li>• We'll review your message within 24-48 hours</li>
                <li>• You'll receive a confirmation email shortly</li>
                <li>• Our team will respond with relevant information or next steps</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
          >
            <span>Read Our Blog</span>
          </Link>
        </div>

        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            While you wait, explore more:
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