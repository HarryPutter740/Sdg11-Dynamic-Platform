"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Share2, Twitter, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, page: 'footer' }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'SDG 11: Sustainable Cities',
        text: 'Building sustainable cities and communities',
        url: window.location.href,
      });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-green-900 to-blue-900 dark:from-gray-900 dark:to-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              {t('footer_about') || 'SDG 11: Sustainable Cities and Communities'}
            </h3>
            <p className="text-gray-300 mb-6">
              Building a better urban future for everyone through inclusive, safe, resilient, and sustainable development.
            </p>
            <div className="flex space-x-4 mb-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                {t('nav_home') || 'Home'}
              </Link>
              <span className="text-gray-500">|</span>
              <Link href="/targets" className="text-gray-300 hover:text-white transition-colors">
                {t('nav_targets') || 'Targets'}
              </Link>
              <span className="text-gray-500">|</span>
              <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors">
                {t('nav_gallery') || 'Gallery'}
              </Link>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              {t('contact_title') || 'Get in Touch'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('contact_name') || 'Your Name'}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t('contact_email') || 'Your Email'}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t('contact_message') || 'Your Message'}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (t('loading') || 'Sending...') : (t('contact_submit') || 'Send Message')}
              </button>
              {submitStatus === 'success' && (
                <p className="text-green-400 text-sm">{t('contact_success') || 'Message sent successfully!'}</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm">Failed to send message. Please try again.</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-gray-300 text-sm">
            {t('footer_copyright') || '© 2024 SDG 11 Project | Building Sustainable Cities'}
          </p>
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Share this page"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </footer>
  );
}