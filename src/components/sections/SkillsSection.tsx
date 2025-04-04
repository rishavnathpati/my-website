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

      // Tab key for navigation (more reliable than arrows)
      if (e.key === 'Tab') {
        e.preventDefault();
        
        // Find the next skill to select
        let nextSkill = null;
        
        // If we already have a selection
        if (selectedSkill) {
          let foundCurrent = false;
          let foundNext = false;
          
          // Loop through all categories and skills to find the next one after current
          outerLoop: for (let catIdx = 0; catIdx < skillCategories.length; catIdx++) {
            for (let skillIdx = 0; skillIdx < skillCategories[catIdx].skills.length; skillIdx++) {
              const skill = skillCategories[catIdx].skills[skillIdx];
              
              // If we found the current skill, mark it and continue to find the next
              if (skill.name === selectedSkill) {
                foundCurrent = true;
                continue;
              }
              
              // If we already found the current, this is our next skill
              if (foundCurrent) {
                nextSkill = skill;
                foundNext = true;
                break outerLoop;
              }
            }
          }
          
          // If we went through all skills and didn't find next, loop to beginning
          if (!foundNext) {
            nextSkill = skillCategories[0].skills[0];
          }
        } else {
          // If no selection yet, select the first skill
          nextSkill = skillCategories[0].skills[0];
        }
        
        if (nextSkill) {
          setSelectedSkill(nextSkill.name);
          log(`Selected: ${nextSkill.name}`);
          soundManager.play('select');
        }
      }
      
      // Escape key for clearing selection
      if (e.key === 'Escape' && selectedSkill) {
        setSelectedSkill(null);
        log('Selection cleared');
        soundManager.play('hover');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedSkill, isLoading, log, soundEnabled]);

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
              <kbd className="px-2 py-1 bg-black/50 rounded border border-primary/20">Tab</kbd>
              <span>Navigate Skills</span>
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
                  className={`bg-black/20 rounded-lg border border-border/50 overflow-hidden ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                  }`}
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
                        className={`flex items-center p-2 rounded cursor-pointer ${
                          selectedSkill === skill.name
                            ? 'bg-primary/10 border border-primary/30'
                            : 'hover:bg-primary/5'
                        }`}
                        onClick={() => {
                          if (selectedSkill !== skill.name) {
                            setSelectedSkill(skill.name);
                            log(`Selected: ${skill.name}`);
                            soundManager.play('select');
                          }
                        }}
                      >
                        
                        <div className="flex items-center justify-between w-full relative">
                          <div className="flex items-center gap-2">
                            {skill.icon && (
                              <span className="text-lg">
                                {skill.icon}
                              </span>
                            )}
                            <span className="font-mono text-sm text-muted-foreground">
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