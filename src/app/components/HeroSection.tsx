'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

const roles = ['Full Stack Engineer', 'ML Engineer', 'Cybersecurity Enthusiast', 'Web Developer'];

// Reduced from 10 to 6 shapes — fewer composited layers = better FID/INP
const SHAPES = [
  { type: 'circle', size: 80, color: '#7C3AED', x: '8%', y: '15%', delay: 0, duration: 6 },
  { type: 'triangle', size: 60, color: '#EC4899', x: '85%', y: '20%', delay: 1, duration: 5 },
  { type: 'square', size: 50, color: '#06B6D4', x: '75%', y: '65%', delay: 2, duration: 7 },
  { type: 'diamond', size: 55, color: '#10B981', x: '50%', y: '10%', delay: 1.5, duration: 8 },
  { type: 'hexagon', size: 70, color: '#6366F1', x: '3%', y: '45%', delay: 2.5, duration: 9 },
  { type: 'circle', size: 30, color: '#F43F5E', x: '92%', y: '45%', delay: 3, duration: 5 },
];

function FloatingShape({ shape }: { shape: typeof SHAPES[0] }) {
  const animClass = shape.duration < 5 ? 'animate-float-fast' : shape.duration < 7 ? 'animate-float-slow' : 'animate-float-medium';

  const style: React.CSSProperties = {
    position: 'absolute',
    left: shape.x,
    top: shape.y,
    animationDelay: `${shape.delay}s`,
    opacity: 0.18,
    pointerEvents: 'none',
    zIndex: 1,
    // will-change only on transform — avoids promoting unnecessary layers
    willChange: 'transform',
  };

  if (shape.type === 'circle') {
    return (
      <div className={animClass} style={style}>
        <div style={{
          width: shape.size, height: shape.size,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${shape.color}88, ${shape.color}22)`,
          border: `2px solid ${shape.color}66`,
          // Reduced box-shadow spread to lower repaint cost
          boxShadow: `0 0 ${shape.size * 0.4}px ${shape.color}33`,
        }} />
      </div>
    );
  }
  if (shape.type === 'triangle') {
    return (
      <div className={`${animClass} animate-spin-slow`} style={style}>
        <svg width={shape.size} height={shape.size} viewBox="0 0 100 100" aria-hidden="true">
          <polygon points="50,5 95,90 5,90" fill={`${shape.color}33`} stroke={shape.color} strokeWidth="2" />
        </svg>
      </div>
    );
  }
  if (shape.type === 'square') {
    return (
      <div className={`${animClass} animate-spin-reverse`} style={style}>
        <div style={{
          width: shape.size, height: shape.size,
          background: `${shape.color}22`,
          border: `2px solid ${shape.color}66`,
          transform: 'rotate(45deg)',
          boxShadow: `0 0 ${shape.size * 0.3}px ${shape.color}22`,
        }} />
      </div>
    );
  }
  if (shape.type === 'diamond') {
    return (
      <div className={animClass} style={style}>
        <svg width={shape.size} height={shape.size} viewBox="0 0 100 100" aria-hidden="true">
          <polygon points="50,5 95,50 50,95 5,50" fill={`${shape.color}33`} stroke={shape.color} strokeWidth="2" />
        </svg>
      </div>
    );
  }
  if (shape.type === 'hexagon') {
    return (
      <div className={`${animClass} animate-spin-slow`} style={style}>
        <svg width={shape.size} height={shape.size} viewBox="0 0 100 100" aria-hidden="true">
          <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill={`${shape.color}22`} stroke={shape.color} strokeWidth="2" />
        </svg>
      </div>
    );
  }
  return null;
}

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  // Throttle scroll handler to reduce FID/INP impact
  const ticking = useRef(false);

  useEffect(() => { setMounted(true); }, []);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting) {
      if (displayText.length < current.length) {
        timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length - 1)), 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // Throttled parallax scroll — only runs once per rAF frame to reduce FID
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (bgRef.current) bgRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
        if (parallaxRef.current) parallaxRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const roleColors = ['#7C3AED', '#EC4899', '#06B6D4', '#10B981'];
  const currentColor = roleColors[roleIndex];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-20 px-6 md:px-10 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #05050f 0%, #0d0520 40%, #050d1a 70%, #05050f 100%)' }}
      aria-label="Hero">

      {/* Animated background blobs — reduced blur values for GPU cost */}
      <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ willChange: 'transform' }}>
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full animate-pulse-glow animate-morph"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 70%)', filter: 'blur(60px)', animationDelay: '1s' }} />
        <div className="absolute bottom-[-5%] left-[30%] w-[350px] h-[350px] rounded-full animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)', filter: 'blur(55px)', animationDelay: '2s' }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      {/* Floating geometric shapes — only rendered client-side after mount */}
      {mounted && SHAPES.map((shape, i) => (
        <FloatingShape key={i} shape={shape} />
      ))}

      {/* Orbiting ring decoration */}
      {mounted && (
        <div className="absolute top-[20%] right-[15%] w-48 h-48 pointer-events-none z-1" style={{ opacity: 0.15, willChange: 'transform' }}>
          <div className="absolute inset-0 rounded-full border-2 border-violet-500 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full border border-pink-500 animate-spin-reverse" />
          <div className="absolute inset-8 rounded-full border border-cyan-400 animate-spin-slow" style={{ animationDuration: '6s' }} />
          <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400 animate-pulse-glow-vivid" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div ref={parallaxRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8" style={{ willChange: 'transform' }}>
          <div>
            {/* Location badge */}
            <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest"
              style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.4)', color: '#a78bfa' }}>
              <span className="w-2 h-2 rounded-full animate-pulse-glow-vivid" style={{ background: '#7C3AED' }} />
              Dharwad, Karnataka — India
            </span>

            {/* Main headline — LCP element, no lazy loading */}
            <h1 className="text-hero-display text-foreground">
              LIKHITH
              <br />
              <span className="gold-gradient-text animate-gradient-shift">THEJAS</span>
            </h1>
          </div>

          {/* Right side meta */}
          <div className="flex flex-col items-start md:items-end gap-4 md:pb-3">
            {/* Typewriter role — fixed min-height prevents CLS when text changes */}
            <p className="font-mono text-sm md:text-base" style={{ minHeight: '1.5rem' }}>
              <span style={{ color: currentColor }}>&gt;</span>{' '}
              <span className="text-foreground/90" style={{ transition: 'color 0.5s' }}>{displayText}</span>
              <span className="inline-block w-0.5 h-4 ml-0.5 animate-pulse" style={{ background: currentColor }} />
            </p>

            {/* IIIT badge */}
            <p className="text-[11px] font-mono uppercase tracking-widest text-right"
              style={{ color: '#7c7c9e' }}>
              IIIT Dharwad · B.Tech CSE · CGPA 8.24
            </p>

            {/* Scroll indicator */}
            <div className="flex items-center gap-3 mt-2">
              <div className="relative w-px h-12 overflow-hidden" style={{ background: 'rgba(124,58,237,0.2)' }}>
                <div className="absolute inset-0 animate-scroll-line" style={{ background: 'linear-gradient(to bottom, #7C3AED, #EC4899)' }} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: '#7c7c9e' }}>Scroll</span>
            </div>
          </div>
        </div>

        {/* Colorful stat pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { label: '8+ Projects', color: '#7C3AED' },
            { label: 'CGPA 8.24', color: '#EC4899' },
            { label: 'Full Stack', color: '#06B6D4' },
            { label: 'ML / AI', color: '#10B981' },
            { label: 'Return 0 Club', color: '#F59E0B' },
          ].map((pill) => (
            <span key={pill.label} className="px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-widest font-bold"
              style={{ background: `${pill.color}18`, border: `1px solid ${pill.color}44`, color: pill.color }}>
              {pill.label}
            </span>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(124,58,237,0.2)' }}>
          <a href="#projects"
            className="inline-flex items-center gap-3 px-6 py-3 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 group rounded-sm"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', color: '#fff', boxShadow: '0 4px 20px rgba(124,58,237,0.4)' }}>
            View Projects
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="https://github.com/DarkVeteran28" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 rounded-sm"
            style={{ border: '1px solid rgba(6,182,212,0.4)', color: '#06B6D4', background: 'rgba(6,182,212,0.06)' }}>
            GitHub
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/likhith-thejas-b-gowda-a46218398/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 rounded-sm"
            style={{ border: '1px solid rgba(236,72,153,0.4)', color: '#EC4899', background: 'rgba(236,72,153,0.06)' }}>
            LinkedIn
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
