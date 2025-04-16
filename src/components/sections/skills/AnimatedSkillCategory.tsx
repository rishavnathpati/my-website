'use client';

import React from 'react';
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { SkillCategory, Skill } from "@/lib/data/skills";

// Skill card component
function SkillCard({ skill }: { skill: Skill }) {
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
}

// Animated skill category component
export function AnimatedSkillCategory({
  category,
  index
}: {
  category: SkillCategory;
  index: number;
}) {
  return (
    <AnimateOnScroll key={category.title} delay={0.4 + index * 0.1}>
      <div className="bg-black/20 rounded-lg border border-border/50 overflow-hidden">
        <div className="border-b border-border/50 px-4 py-2 flex items-center gap-2 bg-black/40">
          <span className="font-mono text-sm text-primary">{category.icon}</span>
          <h3 className="font-mono text-sm text-foreground">
            {category.title}
          </h3>
        </div>

        <div className="p-6 space-y-4">
          {category.skills.map((skill: Skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </AnimateOnScroll>
  );
}

// Animated description component
export function AnimatedDescription({ children }: { children: React.ReactNode }) {
  return (
    <AnimateOnScroll delay={0.3}>
      {children}
    </AnimateOnScroll>
  );
}

// Animated terminal command component
export function AnimatedTerminalCommand({ 
  children, 
  delay 
}: { 
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <AnimateOnScroll delay={delay}>
      {children}
    </AnimateOnScroll>
  );
}