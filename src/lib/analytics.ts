declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, eventParams: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}

// Portfolio-specific tracking helpers
export function trackProjectView(projectName: string) {
  trackEvent('project_view', {
    event_category: 'Portfolio',
    event_label: projectName,
    project_name: projectName,
  });
}

export function trackProjectLinkClick(projectName: string, linkType: 'live' | 'github') {
  trackEvent('project_link_click', {
    event_category: 'Engagement',
    event_label: `${projectName} — ${linkType}`,
    project_name: projectName,
    link_type: linkType,
  });
}

export function trackContactClick(method: 'email' | 'linkedin' | 'github' | 'phone') {
  trackEvent('contact_click', {
    event_category: 'Recruiter Interaction',
    event_label: method,
    contact_method: method,
  });
}

export function trackSectionView(sectionName: string) {
  trackEvent('section_view', {
    event_category: 'Scroll Engagement',
    event_label: sectionName,
    section_name: sectionName,
  });
}

export function trackResumeDownload() {
  trackEvent('resume_download', {
    event_category: 'Recruiter Interaction',
    event_label: 'Resume Download',
  });
}
