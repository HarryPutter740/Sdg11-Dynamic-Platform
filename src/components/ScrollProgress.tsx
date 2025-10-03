"use client";

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollHeight > clientHeight) {
        const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setProgress(scrollPercent);
      } else {
        setProgress(0);
      }
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-blue-500 z-50 transition-all duration-100"
      style={{ width: `${progress}%` }}
    />
  );
}