import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { PortfolioHighlights } from '@/components/sections/PortfolioHighlights';
import { BlogHighlights } from '@/components/sections/BlogHighlights';
import { ContactCTA } from '@/components/sections/ContactCTA';

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <PortfolioHighlights />
      <BlogHighlights />
      <ContactCTA />

      {/* Add padding below the last section */}
      <div className="h-20"></div>
    </main>
  );
}
