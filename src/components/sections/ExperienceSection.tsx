'use client';

import { memo, useMemo } from 'react';
import { Briefcase, Terminal, GraduationCap, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  professionalExperience, 
  education, 
  professionalSummary,
  type ExperienceItem, 
  type EducationItem 
} from '@/lib/data/experience';

// Memoized Experience Item component
const ExperienceItem = memo(function ExperienceItem({ experience }: { experience: ExperienceItem }) {
  return (
    <div className="border-l border-border pl-5 relative group">
      <div className="absolute w-2 h-2 bg-primary rounded-full -left-1 top-2 transition-transform group-hover:scale-125"></div>
      <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
        <h4 className="text-lg font-semibold text-foreground font-mono group-hover:text-primary transition-colors">
          {experience.title}
        </h4>
        <div className="flex items-center text-sm text-primary">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{experience.period}</span>
        </div>
      </div>
      <div className="text-sm text-muted-foreground mb-2">
        {experience.company} | {experience.location}
      </div>
      <ul className="list-disc pl-4 space-y-1 mb-3 text-sm font-mono text-foreground">
        {experience.description.map((desc, i) => (
          <li key={i} className="transition-colors hover:text-primary">{desc}</li>
        ))}
      </ul>
      {experience.skills && (
        <div className="flex flex-wrap gap-2 mt-3">
          {experience.skills.map((skill) => (
            <Badge 
              key={skill} 
              variant="outline" 
              className="text-xs font-mono transition-colors hover:bg-primary/10"
            >
              {skill}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
});

// Memoized Education Item component
const EducationItem = memo(function EducationItem({ education }: { education: EducationItem }) {
  return (
    <div className="border-l border-border pl-5 relative group">
      <div className="absolute w-2 h-2 bg-primary rounded-full -left-1 top-2 transition-transform group-hover:scale-125"></div>
      <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
        <h4 className="text-lg font-semibold text-foreground font-mono group-hover:text-primary transition-colors">
          {education.degree}
        </h4>
        <div className="flex items-center text-sm text-primary">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{education.period}</span>
        </div>
      </div>
      <div className="text-sm text-muted-foreground mb-2">
        {education.institution} | {education.location}
      </div>
      <p className="text-sm font-mono transition-colors hover:text-primary">
        {education.description}
      </p>
    </div>
  );
});

function ExperienceSectionComponent() {
  // Memoize data to prevent unnecessary re-renders
  const memoizedExperience = useMemo(() => professionalExperience, []);
  const memoizedEducation = useMemo(() => education, []);

  return (
    <section id="experience" className="py-20 lg:py-28 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header - Using a generic section title */}
          <div className="flex items-center gap-3 mb-8 group">
            <Terminal className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold font-mono text-foreground group-hover:text-primary transition-colors">
              experience
            </h2>
          </div>

          <div className="bg-black/40 rounded-lg border border-border p-6 mb-12 hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-2 mb-6 group">
              <Terminal className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-bold font-mono text-foreground group-hover:text-primary transition-colors">
                $ cat resume.md
              </h2>
            </div>

            <div className="space-y-8 text-foreground font-mono">
              <div className="bg-black/20 rounded-lg border border-border/50 p-4 group hover:border-primary/50 transition-colors">
                <p className="leading-relaxed group-hover:text-primary transition-colors">
                  {professionalSummary}
                </p>
              </div>

              {/* Professional Experience */}
              <div>
                <div className="flex items-center gap-2 mb-6 group">
                  <Briefcase className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold font-mono text-foreground group-hover:text-primary transition-colors">
                    Professional Experience
                  </h3>
                </div>
                <div className="space-y-8">
                  {memoizedExperience.map((exp, index) => (
                    <ExperienceItem key={index} experience={exp} />
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center gap-2 mb-6 group">
                  <GraduationCap className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold font-mono text-foreground group-hover:text-primary transition-colors">
                    Education
                  </h3>
                </div>
                <div className="space-y-8">
                  {memoizedEducation.map((edu, index) => (
                    <EducationItem key={index} education={edu} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Export memoized component
export const ExperienceSection = memo(ExperienceSectionComponent);
