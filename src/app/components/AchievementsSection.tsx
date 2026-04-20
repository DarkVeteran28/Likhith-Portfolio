'use client';

import React, { useState } from 'react';

interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  description: string;
}

const achievements: Achievement[] = [
  {
    id: 'coding-club',
    title: 'IIIT Dharwad Coding Club',
    subtitle: 'Active Member',
    year: '2024–Present',
    description: 'Participating in competitive programming sessions, peer code reviews, and organizing intra-college coding contests at IIIT Dharwad.',
  },
  {
    id: 'shadow-syndicate',
    title: 'Shadow Syndicate',
    subtitle: 'Hackathon Team',
    year: '2024–Present',
    description: 'Core member of a competitive hackathon team. Competed across multiple national-level hackathons building high-impact prototypes under 24–48 hour constraints.',
  },
  {
    id: 'uav-research',
    title: 'UAV Path Planning Survey',
    subtitle: 'Research Paper — 4D Taxonomy',
    year: '2025',
    description: 'Authored a comprehensive survey paper on UAV path planning algorithms, proposing a novel 4D taxonomy framework classifying approaches by environment, algorithm type, constraint model, and optimization target.',
  },
  {
    id: 'rift-2026',
    title: 'RIFT-2026 Hackathon',
    subtitle: 'Participant',
    year: '2026',
    description: 'Competed in RIFT-2026, building a real-time AI system prototype under hackathon conditions. Demonstrated rapid prototyping and system design skills.',
  },
  {
    id: 'cgpa',
    title: 'Academic Performance',
    subtitle: 'CGPA 8.24 / 10.0',
    year: '2024–Present',
    description: 'Maintaining strong academic performance at IIIT Dharwad — an Institute of National Importance — while simultaneously building 8+ production-grade projects.',
  },
];

export default function AchievementsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="achievements" className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left label */}
          <div className="lg:col-span-4 reveal-left">
            <span className="block font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground mb-6">
              Recognition
            </span>
            <h2 className="text-section-title text-foreground mb-8">
              Built &amp;<br />
              <span className="gold-gradient-text">Recognised.</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Research, hackathons, and consistent academic performance — evidence of depth beyond coursework.
            </p>
          </div>

          {/* Right: Achievement rows */}
          <div className="lg:col-span-8 reveal-up stagger-2">
            <div className="divide-y divide-border">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="achievement-row py-6 md:py-8 cursor-pointer group"
                  onClick={() => toggleExpand(achievement.id)}
                  role="button"
                  aria-expanded={expandedId === achievement.id}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && toggleExpand(achievement.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                        <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {achievement.title}
                        </h3>
                        <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
                        <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                          {achievement.subtitle}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-muted-foreground/60 uppercase tracking-widest">
                        {achievement.year}
                      </p>
                    </div>
                    <div
                      className={`flex-shrink-0 w-8 h-8 border border-border rounded-sm flex items-center justify-center transition-all duration-300 ${
                        expandedId === achievement.id
                          ? 'border-accent bg-accent/10 rotate-45' :'group-hover:border-accent/50'
                      }`}
                    >
                      <svg
                        className={`w-3 h-3 transition-colors duration-300 ${
                          expandedId === achievement.id ? 'text-accent' : 'text-muted-foreground'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>

                  {/* Expandable description */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      expandedId === achievement.id ? 'max-h-48 mt-4 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-accent/40 pl-4">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}