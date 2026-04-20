'use client';

import { useEffect } from 'react';

export default function ScrollRevealInit() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements?.forEach((el) => observer?.observe(el));

    return () => observer?.disconnect();
  }, []);

  return null;
}