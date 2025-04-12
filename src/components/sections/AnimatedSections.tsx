'use client';

import { Suspense, memo } from 'react';
import dynamic from 'next/dynamic';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { BlogPostMeta } from '@/lib/blog';

// Dynamic imports for all sections
const AboutSection = dynamic(() => import('./AboutSection').then(mod => ({ default: mod.AboutSection })), {
  loading: () => <div className="h-[600px] bg-black/20 backdrop-blur-sm animate-pulse rounded-lg" />
});

const ExperienceSection = dynamic(() => import('./ExperienceSection').then(mod => ({ default: mod.ExperienceSection })), {
  loading: () => <div className="h-[800px] bg-black/20 backdrop-blur-sm animate-pulse rounded-lg" />
});

const SkillsSection = dynamic(() => import('./SkillsSection').then(mod => ({ default: mod.SkillsSection })), {
  loading: () => <div className="h-[700px] bg-black/20 backdrop-blur-sm animate-pulse rounded-lg" />
});

const PortfolioHighlights = dynamic(() => import('./PortfolioHighlights').then(mod => ({ default: mod.PortfolioHighlights })), {
  loading: () => <div className="h-[600px] bg-black/20 backdrop-blur-sm animate-pulse rounded-lg" />
});

const BlogHighlights = dynamic(() => import('./BlogHighlights').then(mod => ({ default: mod.BlogHighlights })), {
  loading: () => <div className="h-[500px] bg-black/20 backdrop-blur-sm animate-pulse rounded-lg" />
});

const ContactCTA = dynamic(() => import('./ContactCTA').then(mod => ({ default: mod.ContactCTA })), {
  loading: () => <div className="h-[300px] bg-black/20 backdrop-blur-sm animate-pulse rounded-lg" />
});

// Define props interface
interface AnimatedSectionsProps {
  recentPosts: BlogPostMeta[];
}

// Memoize the component to prevent unnecessary re-renders
function AnimatedSectionsComponent({ recentPosts }: AnimatedSectionsProps) {
  return (
    <>
      <Suspense fallback={<div className="h-[600px] bg-black/20 backdrop-blur-sm animate-pulse rounded-lg" />}>
        <AnimateOnScroll>
          <AboutSection />
        </AnimateOnScroll>
      </Suspense>

      <Suspense fallback={<div className="h-[800px] bg-black/20 backdrop-blur-sm animate-pulse rounded-lg" />}>
        <AnimateOnScroll delay={0.15}>
          <ExperienceSection />
        </AnimateOnScroll>
      </Suspense>

      <Suspense fallback={<div className="h-[700px] bg-black/20 backdrop-blur-sm animate-pulse rounded-lg" />}>
        <AnimateOnScroll delay={0.3}>
          <SkillsSection />
        </AnimateOnScroll>
      </Suspense>

      <Suspense fallback={<div className="h-[600px] bg-black/20 backdrop-blur-sm animate-pulse rounded-lg" />}>
        <AnimateOnScroll delay={0.45}>
          <PortfolioHighlights />
        </AnimateOnScroll>
      </Suspense>

      <Suspense fallback={<div className="h-[500px] bg-black/20 backdrop-blur-sm animate-pulse rounded-lg" />}>
        <AnimateOnScroll delay={0.6}>
          <BlogHighlights recentPosts={recentPosts} />
        </AnimateOnScroll>
      </Suspense>

      <Suspense fallback={<div className="h-[300px] bg-black/20 backdrop-blur-sm animate-pulse rounded-lg" />}>
        <AnimateOnScroll delay={0.75}>
          <ContactCTA />
        </AnimateOnScroll>
      </Suspense>
    </>
  );
}

// Export memoized component
export const AnimatedSections = memo(AnimatedSectionsComponent);
