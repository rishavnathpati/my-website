'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { BlogPostMeta } from '@/lib/blog';

// Dynamic imports for all sections
// Import skeleton components
import {
  AboutSectionSkeleton,
  ExperienceSectionSkeleton,
  SkillsSectionSkeleton,
  PortfolioHighlightsSkeleton,
  BlogHighlightsSkeleton,
  ContactCTASkeleton
} from '@/components/SectionSkeleton';

const AboutSection = dynamic(() => import('./AboutSection').then(mod => ({ default: mod.AboutSection })), {
  loading: () => <AboutSectionSkeleton />,
  ssr: true // Keep SSR for above-the-fold content
});

const ExperienceSection = dynamic(() => import('./ExperienceSection').then(mod => ({ default: mod.ExperienceSection })), {
  loading: () => <ExperienceSectionSkeleton />,
  ssr: false // Disable SSR for below-the-fold content
});

const SkillsSection = dynamic(() => import('./SkillsSection').then(mod => ({ default: mod.SkillsSection })), {
  loading: () => <SkillsSectionSkeleton />,
  ssr: false // Disable SSR for below-the-fold content
});

const PortfolioHighlights = dynamic(() => import('./PortfolioHighlights').then(mod => ({ default: mod.PortfolioHighlights })), {
  loading: () => <PortfolioHighlightsSkeleton />,
  ssr: false // Disable SSR for below-the-fold content
});

const BlogHighlights = dynamic(() => import('./BlogHighlights').then(mod => ({ default: mod.BlogHighlights })), {
  loading: () => <BlogHighlightsSkeleton />,
  ssr: false // Disable SSR for below-the-fold content
});

const ContactCTA = dynamic(() => import('./ContactCTA').then(mod => ({ default: mod.ContactCTA })), {
  loading: () => <ContactCTASkeleton />,
  ssr: false // Disable SSR for below-the-fold content
});

// Define props interface
interface AnimatedSectionsProps {
  recentPosts: BlogPostMeta[];
}

// Memoize the component to prevent unnecessary re-renders
function AnimatedSectionsComponent({ recentPosts }: AnimatedSectionsProps) {
  return (
    <>
      <Suspense fallback={<AboutSectionSkeleton />}>
        <AnimateOnScroll>
          <AboutSection />
        </AnimateOnScroll>
      </Suspense>

      <Suspense fallback={<ExperienceSectionSkeleton />}>
        <AnimateOnScroll delay={0.15}>
          <ExperienceSection />
        </AnimateOnScroll>
      </Suspense>

      <Suspense fallback={<SkillsSectionSkeleton />}>
        <AnimateOnScroll delay={0.3}>
          <SkillsSection />
        </AnimateOnScroll>
      </Suspense>

      <Suspense fallback={<PortfolioHighlightsSkeleton />}>
        <AnimateOnScroll delay={0.45}>
          <PortfolioHighlights />
        </AnimateOnScroll>
      </Suspense>

      <Suspense fallback={<BlogHighlightsSkeleton />}>
        <AnimateOnScroll delay={0.6}>
          <BlogHighlights recentPosts={recentPosts} />
        </AnimateOnScroll>
      </Suspense>

      <Suspense fallback={<ContactCTASkeleton />}>
        <AnimateOnScroll delay={0.75}>
          <ContactCTA />
        </AnimateOnScroll>
      </Suspense>
    </>
  );
}

// This component doesn't need memoization as it's only rendered once
// and its props (recentPosts) rarely change
export const AnimatedSections = AnimatedSectionsComponent;
