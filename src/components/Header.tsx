'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'px-6 md:px-10 py-4' : 'px-6 md:px-10 py-6'
        }`}
        style={scrolled ? {
          background: 'rgba(5,5,15,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(124,58,237,0.2)',
          boxShadow: '0 4px 30px rgba(124,58,237,0.1)',
        } : {}}>

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" aria-label="Likhith Thejas Home">
          <AppLogo size={32} />
          <span className="font-mono text-sm tracking-widest uppercase transition-colors hidden sm:block"
            style={{ color: 'rgba(167,139,250,0.8)' }}>
            LTG
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-full"
          style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}>
          {navLinks?.map((link, i) => {
            const colors = ['#7C3AED', '#EC4899', '#06B6D4'];
            return (
              <a key={link?.label} href={link?.href}
                className="px-5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 hover:bg-white/5"
                style={{ color: 'rgba(240,235,248,0.6)' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = colors[i]; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(240,235,248,0.6)'; }}>
                {link?.label}
              </a>
            );
          })}
          <a href="mailto:25bcs088@iiitdwd.ac.in"
            className="ml-2 px-5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-widest transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', color: '#fff', boxShadow: '0 2px 12px rgba(124,58,237,0.4)' }}>
            Hire Me
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden z-50 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu"
          style={{ color: '#a78bfa' }}>
          <div className="flex flex-col gap-1.5 w-6">
            <span className={`block h-px transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              style={{ background: '#7C3AED' }} />
            <span className={`block h-px transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}
              style={{ background: '#EC4899' }} />
            <span className={`block h-px transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              style={{ background: '#06B6D4' }} />
          </div>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 flex flex-col justify-center items-center transition-all duration-500 ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
        style={{ background: 'rgba(5,5,15,0.97)', backdropFilter: 'blur(20px)' }}>
        <div className="flex flex-col gap-8 text-center">
          {navLinks?.map((link, i) => {
            const colors = ['#7C3AED', '#EC4899', '#06B6D4'];
            return (
              <a key={link?.label} href={link?.href} onClick={handleLinkClick}
                className="text-5xl font-bold uppercase tracking-tighter transition-colors"
                style={{ color: menuOpen ? colors[i] : 'rgba(240,235,248,0.3)', transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}>
                {link?.label}
              </a>
            );
          })}
          <a href="mailto:25bcs088@iiitdwd.ac.in" onClick={handleLinkClick}
            className="text-5xl font-bold uppercase tracking-tighter"
            style={{ background: 'linear-gradient(135deg, #F59E0B, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', transitionDelay: menuOpen ? `${navLinks?.length * 60}ms` : '0ms' }}>
            Hire Me
          </a>
        </div>
      </div>
    </>
  );
}