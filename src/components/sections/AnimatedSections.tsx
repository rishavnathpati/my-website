'use client';

import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { PortfolioHighlights } from '@/components/sections/PortfolioHighlights';
import { BlogHighlights } from '@/components/sections/BlogHighlights';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { BlogPostMeta } from '@/lib/blog'; // Import BlogPostMeta

// Define props interface
interface AnimatedSectionsProps {
  recentPosts: BlogPostMeta[];
}

export function AnimatedSections({ recentPosts }: AnimatedSectionsProps) { // Accept recentPosts prop
  return (
    <>
      <AnimateOnScroll>
        <AboutSection />
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.1}>
        <ExperienceSection />
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.2}>
        <SkillsSection />
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.3}>
        <PortfolioHighlights />
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.4}>
        {/* Pass recentPosts prop to BlogHighlights */}
        <BlogHighlights recentPosts={recentPosts} />
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.5}>
        <ContactCTA />
      </AnimateOnScroll>
    </>
  );
}
