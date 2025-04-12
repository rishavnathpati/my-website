export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
}

export const professionalSummary = `Senior Game Developer specializing in Unity3D and C#, with a proven track record of delivering over 10 published titles across mobile and PC platforms. Extensive experience in developing immersive AR/VR experiences, integrating AI solutions, and optimizing game performance. Demonstrated expertise in full-cycle game development, from concept to deployment, with a focus on creating engaging and technically sound interactive experiences.`;

export const professionalExperience: ExperienceItem[] = [
  {
    title: "Interactive Media Developer",
    company: "Convai",
    location: "San Jose, California",
    period: "July 2022 - Present",
    description: [
      "Lead development of conversational AI integration within Unity Engine, improving user engagement metrics by 40%",
      "Engineered and optimized deep learning model prompts, achieving 30% better response accuracy",
      "Implemented efficient gRPC networking solutions, reducing latency by 25% in multiplayer scenarios",
      "Developed and optimized game systems resulting in 35% improvement in frame rates",
      "Architected scalable systems handling 100K+ daily active users",
      "Created end-to-end speech solutions with 95% accuracy in virtual environments",
      "Mentored junior developers in best practices and design patterns"
    ],
    skills: ["Unity", "C#", "Conversational AI", "gRPC", "System Design", "Game Optimization", "AR/VR"]
  },
  {
    title: "Freelance Software Engineer, Game Developer",
    company: "Self-employed",
    location: "Vellore, Tamil Nadu",
    period: "November 2021 - April 2022",
    description: [
      "Developed and published 3 mobile games with 100K+ combined downloads",
      "Implemented advanced rendering techniques improving visual quality by 50%",
      "Created custom tools and plugins for Unity, reducing development time by 30%"
    ],
    skills: ["Unity", "C#", "Game Development", "Mobile Development", "Performance Optimization"]
  },
  {
    title: "Game Developer",
    company: "IDZ Digital Private Limited",
    location: "Mumbai, Maharashtra",
    period: "May 2021 - November 2021",
    description: [
      "Developed 5 game prototypes with rapid iteration cycles",
      "Implemented core gameplay mechanics and UI systems",
      "Reduced loading times by 40% through asset optimization",
      "Collaborated with artists and designers to implement visual effects"
    ],
    skills: ["Unity", "C#", "Game Design", "Prototyping", "UI/UX", "VFX"]
  }
];

export const education: EducationItem[] = [
  {
    degree: "Master of Computer Applications",
    institution: "Vellore Institute of Technology",
    location: "Vellore, Tamil Nadu, India",
    period: "2022 - 2024",
    description: "Specializing in advanced computing principles with focus on AI and computer vision. Published research on hand gesture recognition achieving 95% accuracy. GPA: 9.2/10"
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Ramakrishna Mission Residential College",
    location: "Kolkata, West Bengal, India",
    period: "2018 - 2021",
    description: "Focused on theoretical computer science, mathematics, and machine learning. Published research on brain tumor segmentation with 92% detection accuracy. GPA: 9.5/10"
  },
  {
    degree: "School Level Courses",
    institution: "Julien Day School",
    location: "Kalyani, West Bengal, India",
    period: "Upto 2018",
    description: "School Captain (2017-2018). Advanced coursework in Computer Science, Mathematics, and Physics. Developed school's first student management system. Score: 95%"
  }
];