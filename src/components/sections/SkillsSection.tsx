import { skillCategories } from "@/lib/data/skills";
import { Terminal } from "lucide-react";
import {
  AnimatedSkillCategory,
  AnimatedDescription,
  AnimatedTerminalCommand
} from "./skills/AnimatedSkillCategory";

function SkillsSectionComponent() {
  return (
    <section id="skills" className="py-20 lg:py-28 bg-black/20 backdrop-blur-sm relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold font-mono text-foreground">
              skills
            </h2>
          </div>

          <div className="bg-black/30 rounded-lg border border-border p-8 relative overflow-hidden">
            {/* Terminal commands */}
            <AnimatedTerminalCommand delay={0.1}>
              <div className="flex items-center gap-2 mb-6 text-muted-foreground group">
                <Terminal size={18} className="group-hover:text-primary transition-colors" />
                <span className="font-mono text-sm group-hover:text-primary transition-colors">$ cat tech_stack.json</span>
              </div>
            </AnimatedTerminalCommand>
            
            <AnimatedTerminalCommand delay={0.2}>
              <div className="flex items-center gap-2 mb-6 text-muted-foreground group">
                <Terminal size={18} className="group-hover:text-primary transition-colors" />
                <span className="font-mono text-sm group-hover:text-primary transition-colors">$ cat skills_overview.md</span>
              </div>
            </AnimatedTerminalCommand>

            {/* Description */}
            <AnimatedDescription>
              <p className="text-foreground leading-relaxed mb-10 font-mono">
                As a Game and Interactive Media Developer with over 5 years of experience in Computer Science and 3+ years
                specializing in Unity, I bring a wealth of expertise to mobile games, AR/VR, and beyond. My passion lies in
                crafting immersive experiences that captivate users through engaging gameplay, stunning visuals, and intuitive UI design.
              </p>
            </AnimatedDescription>

            {/* Skills grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {skillCategories.map((category, index) => (
                <AnimatedSkillCategory
                  key={category.title}
                  category={category}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const SkillsSection = SkillsSectionComponent;
