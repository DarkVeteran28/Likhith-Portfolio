'use client';

import React, { Suspense, lazy } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import CursorTracker from '@/app/components/CursorTracker';
import ScrollRevealInit from '@/app/components/ScrollRevealInit';

// Lazy-load below-fold sections to reduce initial JS bundle (improves LCP + FID)
const ProjectsSection = lazy(() => import('@/app/components/ProjectsSection'));
const SkillsSection = lazy(() => import('@/app/components/SkillsSection'));
const ContactSection = lazy(() => import('@/app/components/ContactSection'));

// Minimal skeleton placeholder to prevent CLS while sections load
function SectionSkeleton({ height = '600px' }: { height?: string }) {
  return <div style={{ minHeight: height }} aria-hidden="true" />;
}

export default function HomePage() {
  return (
    <>
      <CursorTracker />
      <ScrollRevealInit />
      <Header />
      <main>
        {/* HeroSection is LCP element — loaded eagerly, no lazy */}
        <HeroSection />

        {/* Below-fold sections lazy-loaded to reduce initial bundle */}
        <Suspense fallback={<SectionSkeleton height="700px" />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height="600px" />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height="500px" />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}