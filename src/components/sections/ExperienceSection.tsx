import React from 'react';
import { Briefcase, Terminal, GraduationCap, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills?: string[];
}

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
}

const professionalExperience: ExperienceItem[] = [
  {
    title: "Interactive Media Developer",
    company: "Convai",
    location: "San Jose, California",
    period: "July 2022 - Present",
    description: [
      "Designed and integrated Conversational AI solutions within Unity Engine.",
      "Engineered prompts to fine-tune deep learning models, ensuring optimal performance and user engagement.",
      "Worked extensively on gRPC networking to ensure efficient communication and data exchange within applications.",
      "Implemented game optimization techniques to enhance performance and user experience.",
      "Applied various design patterns to create robust and maintainable code.",
      "Engineered system design implementations to ensure scalability and reliability of applications.",
      "Designed and developed interactive experiences integrated with conversational AI in Unity and C#.",
      "Developing end-to-end speech solutions for virtual worlds in Unity."
    ],
    skills: ["Unity", "C#", "Conversational AI", "gRPC", "System Design", "Game Optimization"]
  },
  {
    title: "Freelance Software Engineer, Game Developer",
    company: "Self-employed",
    location: "Vellore, Tamil Nadu",
    period: "November 2021 - April 2022",
    description: [
      "Developing games, apps, and experiences in Unity"
    ],
    skills: ["Unity", "C#", "Game Development", "Mobile Development"]
  },
  {
    title: "Game Developer",
    company: "IDZ Digital Private Limited",
    location: "Mumbai, Maharashtra",
    period: "May 2021 - November 2021",
    description: [
      "Designed game prototypes and incorporated game mechanics in Unity."
    ],
    skills: ["Unity", "C#", "Game Design", "Prototyping"]
  }
];

const education: EducationItem[] = [
  {
    degree: "Master of Computer Applications",
    institution: "Vellore Institute of Technology",
    location: "Vellore, Tamil Nadu, India",
    period: "2022 - 2024",
    description: "Focus on computer science, application and statistics. Pursuing advanced knowledge in computing principles and and a published paper on hand gesture recognition."
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Ramakrishna Mission Residential College",
    location: "Kolkata, West Bengal, India",
    period: "2018 - 2021",
    description: "Specialized in theoritical computer science, mathematics and statistics, including a published research papers on brain tumor segmentation."
  },
  {
    degree: "School Level Courses",
    institution: "Julien Day School",
    location: "Kalyani, West Bengal, India",
    period: "Upto 2018",
    description: "Selected as School Captain for academic year 2017-2018. Courses: Programming, Computer Science, Mathematics, Physics, Chemistry, Biology, English, History, Geography and Literature."
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 lg:py-28 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/40 rounded-lg border border-border p-6 mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Terminal className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold font-mono text-foreground">
                cat resume.md
              </h2>
            </div>

            <div className="space-y-8 text-muted-foreground">
              <p className="leading-relaxed mb-6">
                Detail-oriented and innovative Interactive Media Developer with a passion for game development and extensive experience in developing user-centered digital content. Skilled in Unity, C#, Python, Java, C, and C++, with a proven track record of creating engaging games and applications. Committed to leveraging problem-solving skills and technical expertise to deliver high-performing interactive media solutions.
              </p>

              {/* Professional Experience */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold font-mono text-foreground">
                    Professional Experience
                  </h3>
                </div>

                <div className="space-y-8">
                  {professionalExperience.map((exp, index) => (
                    <div key={index} className="border-l border-border pl-5 relative">
                      <div className="absolute w-2 h-2 bg-primary rounded-full -left-1 top-2"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                        <h4 className="text-lg font-semibold text-foreground">{exp.title}</h4>
                        <div className="flex items-center text-sm text-primary">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">{exp.company} | {exp.location}</div>
                      <ul className="list-disc pl-4 space-y-1 mb-3 text-sm">
                        {exp.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                      {exp.skills && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {exp.skills.map((skill, i) => (
                            <Badge key={i} variant="outline" className="text-xs font-mono">{skill}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold font-mono text-foreground">
                    Education
                  </h3>
                </div>

                <div className="space-y-8">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l border-border pl-5 relative">
                      <div className="absolute w-2 h-2 bg-primary rounded-full -left-1 top-2"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                        <h4 className="text-lg font-semibold text-foreground">{edu.degree}</h4>
                        <div className="flex items-center text-sm text-primary">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{edu.period}</span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">{edu.institution} | {edu.location}</div>
                      <p className="text-sm">{edu.description}</p>
                    </div>
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