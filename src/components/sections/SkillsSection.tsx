'use client';

import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { skillCategories } from "@/lib/data/skills";
import { Terminal, Code2, Command, Volume2, VolumeX } from "lucide-react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { useConsole } from "@/components/ui/console-provider";
import { soundManager } from "@/lib/utils/sound";

// Effect for sound toggle
const toggleSound = (enabled: boolean) => {
  soundManager.toggle(enabled);
  return enabled;
};

// Removed SkillLevel component as per new requirements
// Skills will only show names and icons with details in tooltip

export function SkillsSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { log, success } = useConsole();

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isLoading) return;

      // Find current category and skill indices
      let currentCatIndex = -1;
      let currentSkillIndex = -1;

      skillCategories.forEach((cat, catIdx) => {
        const skillIdx = cat.skills.findIndex(s => s.name === selectedSkill);
        if (skillIdx !== -1) {
          currentCatIndex = catIdx;
          currentSkillIndex = skillIdx;
        }
      });

      // Handle sound toggle with 'M' key
      if (e.key.toLowerCase() === 'm') {
        setSoundEnabled(!soundEnabled);
        toggleSound(!soundEnabled);
        log(`Sound effects ${!soundEnabled ? 'enabled' : 'disabled'}`);
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          if (currentSkillIndex > 0) {
            const newSkill = skillCategories[currentCatIndex].skills[currentSkillIndex - 1];
            setSelectedSkill(newSkill.name);
            log(`Selected: ${newSkill.name}`);
            soundManager.play('select');
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (currentCatIndex !== -1 && currentSkillIndex < skillCategories[currentCatIndex].skills.length - 1) {
            const newSkill = skillCategories[currentCatIndex].skills[currentSkillIndex + 1];
            setSelectedSkill(newSkill.name);
            log(`Selected: ${newSkill.name}`);
            soundManager.play('select');
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (currentCatIndex > 0) {
            const newSkill = skillCategories[currentCatIndex - 1].skills[0];
            setSelectedSkill(newSkill.name);
            log(`Switched to: ${skillCategories[currentCatIndex - 1].title}`);
            soundManager.play('select');
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (currentCatIndex < skillCategories.length - 1) {
            const newSkill = skillCategories[currentCatIndex + 1].skills[0];
            setSelectedSkill(newSkill.name);
            log(`Switched to: ${skillCategories[currentCatIndex + 1].title}`);
            soundManager.play('select');
          }
          break;
        case 'Escape':
          if (selectedSkill) {
            setSelectedSkill(null);
            log('Selection cleared');
            soundManager.play('hover');
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedSkill, isLoading, log]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoading(true);
            log('Initializing skill tree...');
            
            // Simulate loading time for game-like feel
            setTimeout(() => {
              setIsLoading(false);
              success('Skill tree data loaded successfully');
              soundManager.play('success');
            }, 1500);
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('skills');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [log, success]);

  return (
    <section id="skills" className="py-20 lg:py-28 bg-black/20 backdrop-blur-sm relative">
      <LoadingOverlay isLoading={isLoading} text="Loading Skill Tree" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-12">
          {/* Keyboard controls hint */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-mono mb-6 bg-black/30 p-3 rounded-lg border border-border/20">
            <Command size={14} className="text-primary" />
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-black/50 rounded border border-primary/20">↑↓</kbd>
              <span>Navigate Skills</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-black/50 rounded border border-primary/20">←→</kbd>
              <span>Switch Category</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-black/50 rounded border border-primary/20">ESC</kbd>
              <span>Clear Selection</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-black/50 rounded border border-primary/20">M</kbd>
              <span>Toggle Sound</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <Code2 className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold font-mono text-foreground">
                tech_stack.json
              </h2>
            </div>
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                toggleSound(!soundEnabled);
                log(`Sound effects ${!soundEnabled ? 'enabled' : 'disabled'}`);
              }}
              className="p-2 rounded-md bg-black/30 border border-border hover:border-primary transition-colors group"
              aria-label={soundEnabled ? "Disable sound effects" : "Enable sound effects"}
            >
              {soundEnabled ? (
                <Volume2 size={18} className="text-primary group-hover:scale-110 transition-transform" />
              ) : (
                <VolumeX size={18} className="text-muted-foreground group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>
          
          <div className="bg-black/30 rounded-lg border border-border p-6 relative overflow-hidden">
            {/* Terminal-like header */}
            <div className="flex items-center gap-2 mb-6 text-muted-foreground">
              <Terminal size={18} />
              <span className="font-mono text-sm">cat skills_overview.md</span>
            </div>

            {/* Description with typing animation */}
            <p className="text-muted-foreground leading-relaxed mb-8 font-mono">
              As a Game and Interactive Media Developer with over 5 years of experience in Computer Science and 3+ years
              specializing in Unity, I bring a wealth of expertise to mobile games, AR/VR, and beyond. My passion lies in
              crafting immersive experiences that captivate users through engaging gameplay, stunning visuals, and intuitive UI design.
            </p>

            {/* Skills grid with game-like styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skillCategories.map((category, index) => (
                <div
                  key={category.title}
                  className={`bg-black/20 rounded-lg border border-border/50 overflow-hidden transition-all duration-300 ${
                    isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Category header with game UI style */}
                  <div className="border-b border-border/50 px-4 py-2 flex items-center gap-2 bg-black/40">
                    <span className="font-mono text-sm text-primary">{category.icon}</span>
                    <h3 className="font-mono text-sm text-foreground">
                      {category.title}
                    </h3>
                  </div>
                  
                  {/* Skills list with hover effects */}
                  <div className="p-4 space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skill.name}
                        className={`flex items-center p-2 rounded transition-all duration-300 group relative cursor-pointer ${
                          selectedSkill === skill.name
                            ? 'bg-primary/10 border border-primary/30'
                            : 'hover:bg-primary/5'
                        }`}
                        data-selected={selectedSkill === skill.name}
                        style={{
                          transitionDelay: `${(index * 100) + (skillIndex * 50)}ms`,
                          animation: !isLoading ? 'fadeIn 0.5s ease forwards' : 'none'
                        }}
                        onClick={() => {
                          setSelectedSkill(skill.name);
                          log(`Selected: ${skill.name}`);
                          soundManager.play('select');
                        }}
                        onMouseEnter={() => soundManager.play('hover')}
                      >
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded blur-sm" />
                        
                        <div className="flex items-center justify-between w-full relative">
                          <div className="flex items-center gap-2">
                            {skill.icon && (
                              <span className="text-lg group-hover:scale-110 transition-transform duration-300 skill-icon relative">
                                {skill.icon}
                                {/* Power glow effect on hover */}
                                <span className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full blur-md" />
                              </span>
                            )}
                            <span className="font-mono text-sm text-muted-foreground group-hover:text-primary transition-colors">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-xs text-primary/60">Level {skill.level}/5</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}