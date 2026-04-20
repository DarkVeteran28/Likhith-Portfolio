'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';

interface Project {
  id: number;
  name: string;
  category: string;
  description: string;
  stack: string[];
  image: string;
  imageAlt: string;
  liveUrl?: string;
  isLive: boolean;
  highlight: string;
  color: string;
  accent: string;
}

const projects: Project[] = [
{
  id: 0,
  name: 'RouteDeconstruct',
  category: 'Algorithm Visualizer',
  description: 'A* algorithm visualizer with scrollytelling UI that deconstructs pathfinding step-by-step. Interactive grid lets users place walls, set start/end points, and watch the algorithm navigate in real-time.',
  stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_131031e15-1773058686870.png",
  imageAlt: 'Dark data visualization dashboard with glowing network graph lines on black background',
  liveUrl: 'https://a-algoritm-application-shortest-distance-in-maps-mllelsq1k.vercel.app',
  isLive: true,
  highlight: 'Scrollytelling A* pathfinding',
  color: '#7C3AED',
  accent: '#a78bfa'
},
{
  id: 1,
  name: 'Nexus Ed',
  category: 'Educational SaaS',
  description: 'Multi-role educational platform with RBAC — students, teachers, and admins each see a different dashboard. Built with real-time data, analytics charts, and Supabase for auth and database.',
  stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Recharts'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11cc2132a-1771902525376.png",
  imageAlt: 'Dark SaaS dashboard interface with charts and data panels on deep charcoal background',
  liveUrl: 'https://nexus-ed-qjw7qy9ga-likhith-thejas-projects.vercel.app',
  isLive: true,
  highlight: 'RBAC multi-role SaaS',
  color: '#EC4899',
  accent: '#f9a8d4'
},
{
  id: 2,
  name: 'Zenomed',
  category: 'Pharmacogenomics AI',
  description: 'Pharmacogenomics platform using K-Means clustering and Gemini API to personalize drug recommendations based on genetic markers. Bridges genomics data with actionable clinical insights.',
  stack: ['Python', 'K-Means', 'Gemini API', 'Flask', 'React'],
  image: "https://images.unsplash.com/photo-1731775748389-0fb0047fa626",
  imageAlt: 'DNA helix molecular structure visualization on deep black background with subtle blue glow',
  isLive: false,
  highlight: 'K-Means + Gemini API',
  color: '#06B6D4',
  accent: '#67e8f9'
},
{
  id: 3,
  name: 'MoneyTrace',
  category: 'Fraud Detection',
  description: 'Financial fraud detection system using graph theory and NetworkX to model transaction networks, identify suspicious clusters, and flag anomalous money flows with visual graph traversal.',
  stack: ['Python', 'NetworkX', 'Graph Theory', 'FastAPI', 'Pandas'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_15103fe66-1772325460056.png",
  imageAlt: 'Financial data network graph with glowing nodes and edges on dark background',
  isLive: false,
  highlight: 'Graph theory fraud detection',
  color: '#F59E0B',
  accent: '#fcd34d'
},
{
  id: 4,
  name: 'Empathy Mirror',
  category: 'Real-time Sentiment AI',
  description: 'Real-time multimodal sentiment analysis combining facial expression recognition (DeepFace/OpenCV), speech emotion detection (Vosk), and text analysis (TextBlob) into a unified empathy score.',
  stack: ['OpenCV', 'DeepFace', 'Vosk', 'TextBlob', 'Python', 'FastAPI'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_113c8f6f0-1764648553585.png",
  imageAlt: 'AI neural network visualization with glowing data points on deep black background',
  isLive: false,
  highlight: 'OpenCV + DeepFace + Vosk',
  color: '#10B981',
  accent: '#6ee7b7'
},
{
  id: 5,
  name: 'NeuroHealth AI',
  category: 'Medical ML',
  description: 'XGBoost-powered diabetes prediction system achieving 94.2% accuracy on the Pima Indians dataset. Features SHAP explainability, feature importance visualization, and risk stratification.',
  stack: ['XGBoost', 'Scikit-learn', 'SHAP', 'Pandas', 'NumPy'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_16717a569-1767756414195.png",
  imageAlt: 'Medical data visualization with brain scan imagery on dark background',
  isLive: false,
  highlight: 'XGBoost 94.2% accuracy',
  color: '#F43F5E',
  accent: '#fda4af'
}];


export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    setImageLoading(true);
    setTimeout(() => {setActiveIndex(index);setImageLoading(false);}, 250);
  };

  const active = projects[activeIndex];

  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="mb-16 reveal-up">
        <span className="block font-mono text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: '#7c7c9e' }}>
          Selected Work
        </span>
        <h2 className="text-section-title text-foreground">
          Pro<span className="violet-gradient-text">jects</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Project list */}
        <div className="lg:col-span-4 space-y-2 reveal-left" style={{ borderLeft: '2px solid rgba(124,58,237,0.3)', paddingLeft: '1.5rem' }}>
          {projects.map((project, i) =>
          <button
            key={project.id}
            onClick={() => handleSelect(i)}
            className="w-full text-left py-4 px-3 group transition-all duration-400 rounded-lg"
            style={i === activeIndex ? {
              background: `${project.color}12`,
              border: `1px solid ${project.color}40`,
              boxShadow: `0 4px 20px ${project.color}15`
            } : {
              background: 'transparent',
              border: '1px solid transparent'
            }}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold transition-colors duration-300"
                style={{ color: i === activeIndex ? project.color : 'rgba(240,235,248,0.5)' }}>
                    {project.name}
                  </h3>
                  <p className="text-[11px] font-mono uppercase tracking-wider mt-0.5" style={{ color: '#7c7c9e' }}>
                    {project.category}
                  </p>
                </div>
                {project.isLive &&
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
              style={{ background: `${project.color}18`, border: `1px solid ${project.color}44` }}>
                    <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: project.color }} />
                    <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: project.color }}>Live</span>
                  </span>
              }
              </div>
              {i === activeIndex &&
            <p className="text-[11px] font-mono mt-2" style={{ color: project.accent }}>
                  {project.highlight}
                </p>
            }
            </button>
          )}
        </div>

        {/* Right: Project display */}
        <div className="lg:col-span-8 reveal-up stagger-2">
          {/* Image — explicit aspect ratio container prevents CLS */}
          <div className="relative overflow-hidden mb-8 rounded-xl"
          style={{
            aspectRatio: '16/9',
            border: `1px solid ${active.color}30`,
            boxShadow: `0 8px 40px ${active.color}20`,
          }}>
            <AppImage
              src={active.image}
              alt={active.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              loading="lazy"
              className={`object-cover transition-all duration-500 ${imageLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
              style={{ filter: 'saturate(0.7) brightness(0.85)' }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${active.color}30, transparent 60%)` }} />
            {active.isLive &&
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(5,5,15,0.8)', border: `1px solid ${active.color}60`, backdropFilter: 'blur(8px)' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: active.color }} />
                <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: active.color }}>Deployed</span>
              </div>
            }
            {/* Color accent bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1"
            style={{ background: `linear-gradient(90deg, ${active.color}, ${active.accent}, ${active.color})` }} />
          </div>

          {/* Project info card */}
          <div className="p-6 md:p-8 rounded-xl"
          style={{ background: `${active.color}08`, border: `1px solid ${active.color}25`, backdropFilter: 'blur(16px)' }}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: active.accent }}>
                  {active.name}
                </h3>
                <p className="text-[11px] font-mono uppercase tracking-widest mt-1" style={{ color: '#7c7c9e' }}>
                  {active.category}
                </p>
              </div>
              {active.liveUrl &&
              <a href={active.liveUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 group rounded-lg flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${active.color}, ${active.accent}33)`, color: '#fff', border: `1px solid ${active.color}60` }}>
                  Live Demo
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              }
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(240,235,248,0.7)' }}>
              {active.description}
            </p>
            {/* Stack pills */}
            <div className="flex flex-wrap gap-2">
              {active.stack.map((tech) =>
              <span key={tech} className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest rounded-full transition-all duration-300"
              style={{ background: `${active.color}15`, border: `1px solid ${active.color}35`, color: active.accent }}>
                  {tech}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}