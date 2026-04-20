import React, { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import { DM_Sans, JetBrains_Mono } from 'next/font/google';
import '../styles/tailwind.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { Analytics } from '@vercel/analytics/next';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://likhiththe1748.builtwithrocket.new';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Likhith Thejas B Gowda — Full Stack & ML Engineer',
    template: '%s | Likhith Thejas',
  },
  description:
    'First-year CS student at IIIT Dharwad building production-grade full-stack and ML systems. Skilled in React, Next.js, Python, and ML. Open to SWE, ML, and Web Dev internships.',
  keywords: [
    'Likhith Thejas',
    'Likhith Thejas B Gowda',
    'IIIT Dharwad',
    'Full Stack Developer',
    'ML Engineer',
    'React Developer',
    'Next.js',
    'Python',
    'Machine Learning',
    'Software Engineer Intern',
    'Web Developer India',
    'Computer Science Student',
    'Portfolio',
  ],
  authors: [{ name: 'Likhith Thejas B Gowda', url: siteUrl }],
  creator: 'Likhith Thejas B Gowda',
  publisher: 'Likhith Thejas B Gowda',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'profile',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Likhith Thejas — Portfolio',
    title: 'Likhith Thejas B Gowda — Full Stack & ML Engineer',
    description:
      'First-year CS student at IIIT Dharwad building production-grade full-stack and ML systems. Open to SWE, ML, and Web Dev internships.',
    images: [
      {
        url: `${siteUrl}/assets/images/app_logo.png`,
        width: 1200,
        height: 630,
        alt: 'Likhith Thejas B Gowda — Full Stack & ML Engineer Portfolio',
        type: 'image/png',
      },
    ],
    firstName: 'Likhith Thejas',
    lastName: 'B Gowda',
    username: 'likhith-thejas-b-gowda-a46218398',
    gender: 'male',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Likhith Thejas B Gowda — Full Stack & ML Engineer',
    description:
      'First-year CS student at IIIT Dharwad building production-grade full-stack and ML systems. Open to SWE, ML, and Web Dev internships.',
    images: [`${siteUrl}/assets/images/app_logo.png`],
    creator: '@likhiththejas',
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Likhith Thejas B Gowda',
  url: siteUrl,
  email: '25bcs088@iiitdwd.ac.in',
  telephone: '+91-8431629492',
  image: `${siteUrl}/assets/images/app_logo.png`,
  jobTitle: 'Full Stack & ML Engineer',
  description:
    'First-year B.Tech Computer Science student at IIIT Dharwad with expertise in full-stack development and machine learning. Building production-grade systems with React, Next.js, Python, and ML frameworks.',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Indian Institute of Information Technology Dharwad',
    url: 'https://www.iiitdwd.ac.in',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dharwad',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.linkedin.com/in/likhith-thejas-b-gowda-a46218398/',
    'https://github.com/DarkVeteran28',
  ],
  knowsAbout: [
    'Full Stack Development',
    'Machine Learning',
    'React.js',
    'Next.js',
    'Python',
    'TypeScript',
    'Node.js',
    'Data Structures & Algorithms',
    'Cybersecurity',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Software Engineer',
    occupationLocation: {
      '@type': 'Country',
      name: 'India',
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Preconnect to speed up Google Fonts (already used via next/font but helps for any remaining requests) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for external image CDNs used in projects section */}
        <link rel="dns-prefetch" href="https://img.rocket.new" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Flikhiththe1748back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.18" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></head>
      <body className={dmSans.className}>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        {children}
        <Analytics />
      </body>
    </html>
  );
}