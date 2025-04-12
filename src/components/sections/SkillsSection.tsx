'use client';

import { useState, useEffect, useMemo, memo } from 'react';
import { Badge } from "@/components/ui/badge";
import { skillCategories } from "@/lib/data/skills";
import { Terminal } from "lucide-react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { useConsole } from "@/components/ui/console-provider";

// Memoized skill card component
const SkillCard = memo(function SkillCard({ skill }: { skill: any }) {
  return (
    <div className="flex items-center p-2 rounded">
      <div className="flex items-center justify-between w-full relative">
        <div className="flex items-center gap-2">
          {skill.icon && (
            <span className="text-lg">
              {skill.icon}
            </span>
          )}
          <span className="font-mono text-sm text-foreground">
            {skill.name}
          </span>
        </div>
        <span className="text-xs text-primary/60">Level {skill.level}/5</span>
      </div>
    </div>
  );
});

// Memoized category component
const SkillCategory = memo(function SkillCategory({ 
  category,
  isVisible
}: { 
  category: any;
  isVisible: boolean;
}) {
  return (
    <div
      className="bg-black/20 rounded-lg border border-border/50 overflow-hidden transition-opacity duration-500"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="border-b border-border/50 px-4 py-2 flex items-center gap-2 bg-black/40">
        <span className="font-mono text-sm text-primary">{category.icon}</span>
        <h3 className="font-mono text-sm text-foreground">
          {category.title}
        </h3>
      </div>

      <div className="p-6 space-y-4">
        {category.skills.map((skill: any) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
});

function SkillsSectionComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { log, success } = useConsole();

  // Memoize categories to prevent unnecessary re-renders
  const memoizedCategories = useMemo(() => skillCategories, []);

  // Check if user has visited before
  useEffect(() => {
    const visited = localStorage.getItem('skillsVisited');
    if (visited) {
      setHasVisited(true);
      setIsVisible(true);
    }
  }, []);

  // Optimized intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasVisited) {
              setIsLoading(true);
              log('Initializing skill tree...');
              setTimeout(() => {
                setIsLoading(false);
                success('Skill tree data loaded successfully');
                localStorage.setItem('skillsVisited', 'true');
                setHasVisited(true);
                setIsVisible(true);
              }, 1500);
            } else {
              setIsVisible(true);
            }
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const section = document.getElementById('skills');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [log, success, hasVisited]);

  return (
    <section id="skills" className="py-20 lg:py-28 bg-black/20 backdrop-blur-sm relative">
      <LoadingOverlay isLoading={isLoading} text="Loading Skill Tree" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold font-mono text-foreground">
              skills
            </h2>
          </div>

          <div className="bg-black/30 rounded-lg border border-border p-8 relative overflow-hidden">
            {/* Primary terminal command */}
            <div className="flex items-center gap-2 mb-6 text-muted-foreground group">
              <Terminal size={18} className="group-hover:text-primary transition-colors" />
              <span className="font-mono text-sm group-hover:text-primary transition-colors">$ cat tech_stack.json</span>
            </div>
            
            {/* Secondary terminal command */}
            <div className="flex items-center gap-2 mb-6 text-muted-foreground group">
              <Terminal size={18} className="group-hover:text-primary transition-colors" />
              <span className="font-mono text-sm group-hover:text-primary transition-colors">$ cat skills_overview.md</span>
            </div>

            {/* Description */}
            <p className="text-foreground leading-relaxed mb-10 font-mono">
              As a Game and Interactive Media Developer with over 5 years of experience in Computer Science and 3+ years
              specializing in Unity, I bring a wealth of expertise to mobile games, AR/VR, and beyond. My passion lies in
              crafting immersive experiences that captivate users through engaging gameplay, stunning visuals, and intuitive UI design.
            </p>

            {/* Skills grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {memoizedCategories.map((category) => (
                <SkillCategory
                  key={category.title}
                  category={category}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Export memoized component
export const SkillsSection = memo(SkillsSectionComponent);
