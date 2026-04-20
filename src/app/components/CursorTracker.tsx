'use client';

import React, { useEffect, useRef } from 'react';

export default function CursorTracker() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices — no cursor to track, saves rAF overhead
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;
    let isRunning = true;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX - 4}px`;
      dot.style.top = `${mouseY - 4}px`;
    };

    const animateRing = () => {
      if (!isRunning) return;
      ringX += (mouseX - ringX - 16) * 0.12;
      ringY += (mouseY - ringY - 16) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      rafId = requestAnimationFrame(animateRing);
    };

    const handleMouseEnterLink = () => {
      ring.style.width = '48px';
      ring.style.height = '48px';
      ring.style.opacity = '0.6';
    };

    const handleMouseLeaveLink = () => {
      ring.style.width = '32px';
      ring.style.height = '32px';
      ring.style.opacity = '1';
    };

    // Pause rAF when tab is hidden — reduces background CPU/GPU usage
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(rafId);
      } else {
        isRunning = true;
        rafId = requestAnimationFrame(animateRing);
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    rafId = requestAnimationFrame(animateRing);

    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterLink);
      el.addEventListener('mouseleave', handleMouseLeaveLink);
    });

    return () => {
      isRunning = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(rafId);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterLink);
        el.removeEventListener('mouseleave', handleMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring hidden md:block" aria-hidden="true" />
    </>
  );
}