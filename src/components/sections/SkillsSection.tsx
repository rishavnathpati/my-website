import { Badge } from "@/components/ui/badge";
import { skillCategories } from "@/lib/data/skills";
import { Terminal, Code2 } from "lucide-react";

function SkillLevel({ level }: { level?: number }) {
  const maxLevel = 5;
  const blocks = Array(maxLevel).fill('▱');
  if (level) {
    blocks.fill('▰', 0, level);
  }
  return (
    <span className="font-mono text-xs text-primary ml-2">
      {blocks.join('')}
    </span>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 lg:py-28 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold font-mono text-foreground">
              tech_stack.json
            </h2>
          </div>
          
          <div className="bg-black/30 rounded-lg border border-border p-6">
            <div className="flex items-center gap-2 mb-6 text-muted-foreground">
              <Terminal size={18} />
              <span className="font-mono text-sm">cat skills_overview.md</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8 font-mono">
              A comprehensive tech stack built through game development, interactive media, and AI projects.
              Constantly exploring new technologies and pushing boundaries.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skillCategories.map((category, index) => (
                <div
                  key={category.title}
                  className="bg-black/20 rounded-lg border border-border/50 overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="border-b border-border/50 px-4 py-2 flex items-center gap-2">
                    <span className="font-mono text-sm text-primary">{category.icon}</span>
                    <h3 className="font-mono text-sm text-foreground">
                      {category.title}
                    </h3>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {skill.icon && <span className="text-lg">{skill.icon}</span>}
                          <span className="font-mono text-sm text-muted-foreground">
                            {skill.name}
                          </span>
                        </div>
                        <SkillLevel level={skill.level} />
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