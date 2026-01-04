// Google Analytics 4 Tracking Utility
// Replace 'G-XXXXXXXXXX' with your actual GA4 Measurement ID

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Your GA4 Measurement ID
export const GA_MEASUREMENT_ID = 'G-BKVK6KWYBX';

// Track page views
export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

// Track resume modal opened
export const trackResumeView = () => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'resume_opened', {
      event_category: 'engagement',
      event_label: 'Resume Modal Opened',
    });
  }
};

// Track resume download
export const trackResumeDownload = () => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'resume_downloaded', {
      event_category: 'engagement',
      event_label: 'Resume PDF Downloaded',
    });
  }
};

// Track project details viewed
export const trackProjectView = (projectId: string, projectTitle: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'project_viewed', {
      event_category: 'engagement',
      event_label: projectTitle,
      project_id: projectId,
      project_title: projectTitle,
    });
  }
};

// Track external link clicks
export const trackExternalLink = (
  linkType: 'github' | 'linkedin' | 'email' | 'live_demo' | 'project_github',
  destinationUrl: string,
  projectTitle?: string
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'external_link_click', {
      event_category: 'outbound',
      event_label: linkType,
      link_type: linkType,
      destination_url: destinationUrl,
      ...(projectTitle && { project_title: projectTitle }),
    });
  }
};

// Track navigation clicks
export const trackNavigation = (destination: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'navigation_click', {
      event_category: 'navigation',
      event_label: destination,
      destination: destination,
    });
  }
};
