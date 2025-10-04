"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import SearchOverlay from './SearchOverlay';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: t('nav_home') || 'Home' },
    { href: '/targets', label: t('nav_targets') || 'Targets' },
    { href: '/gallery', label: t('nav_gallery') || 'Gallery' },
    { href: '/blog', label: t('nav_blog') || 'Blog' },
    { href: '/data-hub', label: 'Data Hub' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-white text-sm group-hover:scale-105 transition-transform">
                <span className="text-center leading-tight">OPT</span>
              </div>
              <span className="font-bold text-xl hidden sm:inline">Optivio</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                    pathname === item.href
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <SearchOverlay />

              {/* Language Switcher */}
              <button
                onClick={() => changeLanguage(language === 'EN' ? 'ES' : 'EN')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label={`Switch to ${language === 'EN' ? 'Spanish' : 'English'}`}
                title={`Current language: ${language}`}
              >
                <Globe className="w-5 h-5" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                title={`Current theme: ${theme}`}
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-800" role="menu">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg ${
                    pathname === item.href
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                  role="menuitem"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </header>
      <div className="h-20" aria-hidden="true" />
    </>
  );
}