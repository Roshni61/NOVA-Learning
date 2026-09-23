import { useEffect } from 'react';

interface SEOOptions {
  title?: string;
  description?: string;
  ogImage?: string;
}

const DEFAULT_TITLE = 'NOVA Learning — Continuous AI Learning Platform';
const DEFAULT_DESCRIPTION =
  'NOVA Learning — Adaptive, Continuous AI Learning Platform featuring personalized daily execution cycles, Learning Twin telemetry, and knowledge graph mapping.';
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200&auto=format&fit=crop&q=80';

/**
 * Custom React hook to dynamically update document <title> and Open Graph / Twitter Card meta tags
 * when navigating between pages in the single-page application.
 */
export function useSEO({ title, description, ogImage }: SEOOptions = {}) {
  useEffect(() => {
    // 1. Update Document Title
    const newTitle = title ? `${title} | NOVA Learning` : DEFAULT_TITLE;
    document.title = newTitle;

    // Helper to safely set meta tag content
    const updateMetaTag = (selector: string, content: string) => {
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const nameAttr = selector.slice(11, -2);
          element.setAttribute('name', nameAttr);
        } else if (selector.startsWith('meta[property=')) {
          const propAttr = selector.slice(15, -2);
          element.setAttribute('property', propAttr);
        }
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // 2. Update Standard & Social Meta Tags
    const newDesc = description || DEFAULT_DESCRIPTION;
    const newImg = ogImage || DEFAULT_IMAGE;

    updateMetaTag('meta[name="description"]', newDesc);
    updateMetaTag('meta[property="og:title"]', newTitle);
    updateMetaTag('meta[property="og:description"]', newDesc);
    updateMetaTag('meta[property="og:image"]', newImg);
    updateMetaTag('meta[name="twitter:title"]', newTitle);
    updateMetaTag('meta[name="twitter:description"]', newDesc);
    updateMetaTag('meta[name="twitter:image"]', newImg);

    return () => {
      // Revert title on unmount if needed
    };
  }, [title, description, ogImage]);
}
