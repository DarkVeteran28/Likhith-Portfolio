'use client';

import React, { useState } from 'react';

interface SkillCategory {
  id: string;
  label: string;
  monoLabel: string;
  skills: string[];
  color: string;
  accent: string;
  icon: string;
}

const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    monoLabel: '01',
    skills: ['C++', 'Python', 'Java', 'C', 'TypeScript', 'JavaScript', 'SQL'],
    color: '#7C3AED',
    accent: '#a78bfa',
    icon: '{ }',
  },
  {
    id: 'frontend',
    label: 'Frontend',
    monoLabel: '02',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'HTML5', 'CSS3', 'Chart.js', 'Recharts'],
    color: '#EC4899',
    accent: '#f9a8d4',
    icon: '◈',
  },
  {
    id: 'backend',
    label: 'Backend',
    monoLabel: '03',
    skills: ['Node.js', 'Flask', 'FastAPI', 'Supabase', 'PostgreSQL'],
    color: '#06B6D4',
    accent: '#67e8f9',
    icon: '⚡',
  },
  {
    id: 'mlai',
    label: 'ML / AI',
    monoLabel: '04',
    skills: ['Scikit-learn', 'XGBoost', 'Pandas', 'NumPy', 'spaCy', 'Transformers', 'DeepFace', 'Vosk', 'TextBlob'],
    color: '#10B981',
    accent: '#6ee7b7',
    icon: '◉',
  },
  {
    id: 'tools',
    label: 'Tools & DevOps',
    monoLabel: '05',
    skills: ['Git', 'Docker', 'VS Code', 'Postman', 'Linux Terminal', 'NetworkX'],
    color: '#F59E0B',
    accent: '#fcd34d',
    icon: '⚙',
  },
];

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-10 relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(124,58,237,0.15)' }}>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', filter: 'blur(60px)', animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="reveal-up">
            <span className="block font-mono text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: '#7c7c9e' }}>
              Technical Depth
            </span>
            <h2 className="text-section-title text-foreground">
              Ski<span className="violet-gradient-text">lls</span>
            </h2>
          </div>
          <p className="text-sm max-w-xs leading-relaxed reveal-up stagger-2" style={{ color: '#7c7c9e' }}>
            Full-stack capability across web, ML, and systems — from browser to model to terminal.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 reveal-up stagger-3">

          {/* Card: Languages — row-span-2 */}
          <div
            className="md:col-span-1 md:row-span-2 rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-500 cursor-pointer"
            style={{
              background: activeCategory === 'languages' ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.06)',
              border: `1px solid ${activeCategory === 'languages' ? 'rgba(124,58,237,0.5)' : 'rgba(124,58,237,0.2)'}`,
              boxShadow: activeCategory === 'languages' ? '0 8px 40px rgba(124,58,237,0.2)' : 'none',
              minHeight: '280px',
            }}
            onMouseEnter={() => setActiveCategory('languages')}
            onMouseLeave={() => setActiveCategory(null)}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-2xl mb-2 block" style={{ color: '#7C3AED' }}>{skillCategories[0].icon}</span>
                <h3 className="text-xl font-bold" style={{ color: '#a78bfa' }}>{skillCategories[0].label}</h3>
              </div>
              <span className="font-mono text-[10px] px-2 py-1 rounded-full" style={{ background: 'rgba(124,58,237,0.2)', color: '#7C3AED' }}>{skillCategories[0].monoLabel}</span>
            </div>
            <div className="flex flex-wrap gap-2 flex-1 content-start">
              {skillCategories[0].skills.map((skill) => (
                <button key={skill}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all duration-300 rounded-full"
                  style={hoveredSkill === skill ? {
                    background: 'rgba(124,58,237,0.3)', border: '1px solid rgba(124,58,237,0.8)', color: '#a78bfa',
                    boxShadow: '0 0 12px rgba(124,58,237,0.4)',
                  } : {
                    background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)', color: '#7c7c9e',
                  }}>
                  {skill}
                </button>
              ))}
            </div>
            <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(124,58,237,0.2)' }}>
              <span className="text-[10px] font-mono" style={{ color: '#7C3AED' }}>7 languages</span>
            </div>
          </div>

          {/* Card: Frontend */}
          <div className="md:col-span-1 rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-500 cursor-pointer"
            style={{
              background: activeCategory === 'frontend' ? 'rgba(236,72,153,0.15)' : 'rgba(236,72,153,0.06)',
              border: `1px solid ${activeCategory === 'frontend' ? 'rgba(236,72,153,0.5)' : 'rgba(236,72,153,0.2)'}`,
              boxShadow: activeCategory === 'frontend' ? '0 8px 40px rgba(236,72,153,0.2)' : 'none',
            }}
            onMouseEnter={() => setActiveCategory('frontend')}
            onMouseLeave={() => setActiveCategory(null)}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-2xl mb-2 block" style={{ color: '#EC4899' }}>{skillCategories[1].icon}</span>
                <h3 className="text-xl font-bold" style={{ color: '#f9a8d4' }}>{skillCategories[1].label}</h3>
              </div>
              <span className="font-mono text-[10px] px-2 py-1 rounded-full" style={{ background: 'rgba(236,72,153,0.2)', color: '#EC4899' }}>{skillCategories[1].monoLabel}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillCategories[1].skills.map((skill) => (
                <button key={skill}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all duration-300 rounded-full"
                  style={hoveredSkill === skill ? {
                    background: 'rgba(236,72,153,0.3)', border: '1px solid rgba(236,72,153,0.8)', color: '#f9a8d4',
                    boxShadow: '0 0 12px rgba(236,72,153,0.4)',
                  } : {
                    background: 'rgba(236,72,153,0.08)', border: '1px solid rgba(236,72,153,0.25)', color: '#7c7c9e',
                  }}>
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Card: Backend */}
          <div className="md:col-span-1 rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-500 cursor-pointer"
            style={{
              background: activeCategory === 'backend' ? 'rgba(6,182,212,0.15)' : 'rgba(6,182,212,0.06)',
              border: `1px solid ${activeCategory === 'backend' ? 'rgba(6,182,212,0.5)' : 'rgba(6,182,212,0.2)'}`,
              boxShadow: activeCategory === 'backend' ? '0 8px 40px rgba(6,182,212,0.2)' : 'none',
            }}
            onMouseEnter={() => setActiveCategory('backend')}
            onMouseLeave={() => setActiveCategory(null)}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-2xl mb-2 block" style={{ color: '#06B6D4' }}>{skillCategories[2].icon}</span>
                <h3 className="text-xl font-bold" style={{ color: '#67e8f9' }}>{skillCategories[2].label}</h3>
              </div>
              <span className="font-mono text-[10px] px-2 py-1 rounded-full" style={{ background: 'rgba(6,182,212,0.2)', color: '#06B6D4' }}>{skillCategories[2].monoLabel}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillCategories[2].skills.map((skill) => (
                <button key={skill}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all duration-300 rounded-full"
                  style={hoveredSkill === skill ? {
                    background: 'rgba(6,182,212,0.3)', border: '1px solid rgba(6,182,212,0.8)', color: '#67e8f9',
                    boxShadow: '0 0 12px rgba(6,182,212,0.4)',
                  } : {
                    background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.25)', color: '#7c7c9e',
                  }}>
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Card: ML/AI — col-span-2 */}
          <div className="md:col-span-2 rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-500 cursor-pointer"
            style={{
              background: activeCategory === 'mlai' ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.06)',
              border: `1px solid ${activeCategory === 'mlai' ? 'rgba(16,185,129,0.5)' : 'rgba(16,185,129,0.2)'}`,
              boxShadow: activeCategory === 'mlai' ? '0 8px 40px rgba(16,185,129,0.2)' : 'none',
            }}
            onMouseEnter={() => setActiveCategory('mlai')}
            onMouseLeave={() => setActiveCategory(null)}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-2xl mb-2 block" style={{ color: '#10B981' }}>{skillCategories[3].icon}</span>
                <h3 className="text-xl font-bold" style={{ color: '#6ee7b7' }}>{skillCategories[3].label}</h3>
              </div>
              <span className="font-mono text-[10px] px-2 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.2)', color: '#10B981' }}>{skillCategories[3].monoLabel}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillCategories[3].skills.map((skill) => (
                <button key={skill}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all duration-300 rounded-full"
                  style={hoveredSkill === skill ? {
                    background: 'rgba(16,185,129,0.3)', border: '1px solid rgba(16,185,129,0.8)', color: '#6ee7b7',
                    boxShadow: '0 0 12px rgba(16,185,129,0.4)',
                  } : {
                    background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', color: '#7c7c9e',
                  }}>
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Card: Tools — col-span-3 */}
          <div className="md:col-span-3 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition-all duration-500 cursor-pointer"
            style={{
              background: activeCategory === 'tools' ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.06)',
              border: `1px solid ${activeCategory === 'tools' ? 'rgba(245,158,11,0.5)' : 'rgba(245,158,11,0.2)'}`,
              boxShadow: activeCategory === 'tools' ? '0 8px 40px rgba(245,158,11,0.2)' : 'none',
            }}
            onMouseEnter={() => setActiveCategory('tools')}
            onMouseLeave={() => setActiveCategory(null)}>
            <div className="flex items-center gap-4">
              <span className="text-2xl" style={{ color: '#F59E0B' }}>{skillCategories[4].icon}</span>
              <h3 className="text-xl font-bold" style={{ color: '#fcd34d' }}>{skillCategories[4].label}</h3>
              <span className="font-mono text-[10px] px-2 py-1 rounded-full" style={{ background: 'rgba(245,158,11,0.2)', color: '#F59E0B' }}>{skillCategories[4].monoLabel}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillCategories[4].skills.map((skill) => (
                <button key={skill}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all duration-300 rounded-full"
                  style={hoveredSkill === skill ? {
                    background: 'rgba(245,158,11,0.3)', border: '1px solid rgba(245,158,11,0.8)', color: '#fcd34d',
                    boxShadow: '0 0 12px rgba(245,158,11,0.4)',
                  } : {
                    background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', color: '#7c7c9e',
                  }}>
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}