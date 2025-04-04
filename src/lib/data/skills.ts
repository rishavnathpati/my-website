export interface Skill {
  name: string;
  level?: number; // 1-5 for proficiency level
  icon?: string;  // For custom icons or emoji representations
}

export interface SkillCategory {
  title: string;
  icon: string;  // Terminal command or category identifier
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Core Development',
    icon: 'main.cs',
    skills: [
      { name: 'C#', level: 5 },
      { name: 'Unity Engine', level: 5, icon: '🎮' },
      { name: 'Git', level: 4, icon: '🔄' },
      { name: 'Software Architecture', level: 4 },
      { name: 'Design Patterns', level: 4 },
      { name: 'Problem Solving', level: 5 },
    ],
  },
  {
    title: 'Web Development',
    icon: 'web.config',
    skills: [
      { name: 'TypeScript', level: 4 },
      { name: 'React', level: 4, icon: '⚛️' },
      { name: 'Next.js', level: 4 },
      { name: 'Node.js', level: 3 },
      { name: 'HTML/CSS', level: 4 },
      { name: 'Tailwind', level: 4 },
    ],
  },
  {
    title: 'XR Development',
    icon: 'xr.unity',
    skills: [
      { name: 'AR Foundation', level: 4, icon: '📱' },
      { name: 'XR Toolkit', level: 4, icon: '🥽' },
      { name: 'Conversational AI', level: 3 },
      { name: 'gRPC', level: 3 },
    ],
  },
  {
    title: 'AI & ML',
    icon: 'ai.py',
    skills: [
      { name: 'Python', level: 4, icon: '🐍' },
      { name: 'TensorFlow', level: 3, icon: '🧠' },
      { name: 'MediaPipe', level: 3 },
      { name: 'OpenCV', level: 3, icon: '👁️' },
      { name: 'Machine Learning', level: 3 },
    ],
  },
  {
    title: 'Other Languages',
    icon: 'langs.sh',
    skills: [
      { name: 'Java', level: 3 },
      { name: 'C/C++', level: 3 },
      { name: 'SQL', level: 3 },
    ],
  },
];