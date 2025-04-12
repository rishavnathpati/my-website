'use client';

import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { skillCategories } from "@/lib/data/skills";
import { Terminal } from "lucide-react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { useConsole } from "@/components/ui/console-provider";

export function SkillsSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);
  const { log, success } = useConsole();

  // Check if user has visited before
  useEffect(() => {
    const visited = localStorage.getItem('skillsVisited');
    if (visited) {
      setHasVisited(true);
    }
  }, []);

  // Loading simulation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasVisited) {
            setIsLoading(true);
            log('Initializing skill tree...');
            setTimeout(() => {
              setIsLoading(false);
              success('Skill tree data loaded successfully');
              localStorage.setItem('skillsVisited', 'true');
              setHasVisited(true);
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
  }, [log, success, hasVisited]);

  return (
    <section id="skills" className="py-20 lg:py-28 bg-black/20 backdrop-blur-sm relative">
      <LoadingOverlay isLoading={isLoading} text="Loading Skill Tree" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold font-mono text-foreground">
              tech_stack.json
            </h2>
          </div>

          <div className="bg-black/30 rounded-lg border border-border p-8 relative overflow-hidden">
            {/* Terminal-like header */}
            <div className="flex items-center gap-2 mb-6 text-muted-foreground">
              <Terminal size={18} className="text-muted-foreground" />
              <span className="font-mono text-sm">cat skills_overview.md</span>
            </div>

            {/* Description */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
