import { Badge } from "@/components/ui/badge";
import { skillCategories } from "@/lib/data/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-raleway text-foreground">
            Technical Skills
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            A versatile skill set honed through game development, interactive media projects, and explorations into AI and machine learning. Continuously learning and adapting to new technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="bg-card p-6 rounded-lg shadow-sm border border-border dark:bg-neutral-800/30"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <h3 className="text-xl font-semibold mb-4 font-poppins text-primary">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="secondary"
                    className="text-sm px-3 py-1"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 