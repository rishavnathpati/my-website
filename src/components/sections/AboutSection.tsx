import React from 'react';
import { Terminal } from "lucide-react";
import { aboutData, type Competency } from '@/lib/data/about';

// Competency component
function CompetencyItem({ competency }: { competency: Competency }) {
  return (
    <li className="group transition-transform hover:translate-x-1">
      <div className="flex items-start gap-2 group-hover:bg-primary/5 p-2 rounded-lg transition-colors">
        <span className="text-primary group-hover:scale-110 transition-transform">•</span>
        <span className="group-hover:text-primary transition-colors">{competency.text}</span>
      </div>
    </li>
  );
}

function AboutSectionComponent() {
  // Use data directly - these are static imports that don't change
  const { paragraphs, competencies } = aboutData;

  return (
    <section id="about" className="py-20 lg:py-28 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header - Using a more generic section title */}
          <div className="flex items-center gap-3 mb-8 group">
            <Terminal className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold font-mono text-foreground group-hover:text-primary transition-colors">
              about_me
            </h2>
          </div>

          {/* Content */}
          <div className="bg-black/30 rounded-lg border border-border p-8 hover:border-primary/50 transition-colors">
            {/* Terminal-like header inside the box */}
            <div className="flex items-center gap-2 mb-6 text-muted-foreground group">
              <Terminal size={18} className="group-hover:text-primary transition-colors" />
              <span className="font-mono text-sm group-hover:text-primary transition-colors">$ cat about.md</span>
            </div>
            <div className="space-y-6 font-mono">
              {/* Paragraphs */}
              {paragraphs.map((text, index) => (
                <p 
                  key={index}
                  className="group"
                >
                  <span className="block p-2 rounded-lg transition-colors group-hover:bg-primary/5 group-hover:text-primary">
                    {text}
                  </span>
                </p>
              ))}

              {/* Competencies */}
              <div className="mt-12">
                <h3 className="text-lg font-bold mb-4 text-primary group flex items-center gap-2">
                  <span className="group-hover:rotate-3 transition-transform inline-block">$</span>
                  <span className="group-hover:text-primary/80 transition-colors">key_competencies</span>
                </h3>
                <ul className="space-y-4">
                  {competencies.map((competency, index) => (
                    <CompetencyItem key={index} competency={competency} />
                  ))}
                </ul>
              </div>

              {/* Download CV Button */}
              <div className="mt-8">
                <a
                  href="/cv.pdf"
                  download
                  className="inline-flex items-center px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-lg transition-all hover:scale-105 hover:shadow-lg group gap-2"
                >
                  <span className="font-mono text-sm group-hover:text-primary transition-colors">
                    cv.pdf
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Export component directly
export const AboutSection = AboutSectionComponent;
