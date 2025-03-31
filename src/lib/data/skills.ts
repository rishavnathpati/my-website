export interface Skill {
  name: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Core Development',
    skills: [
      { name: 'C#' },
      { name: 'Unity Engine (2D/3D)' },
      { name: 'Git / Version Control' },
      { name: 'Software Architecture' },
      { name: 'Design Patterns' },
      { name: 'Problem Solving' },
    ],
  },
  {
    title: 'Web & Interactive',
    skills: [
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    title: 'XR & Emerging Tech',
    skills: [
      { name: 'Unity AR Foundation' },
      { name: 'Unity VR (XR Toolkit)' },
      { name: 'Conversational AI (Integration)' },
      { name: 'gRPC Networking' },
    ],
  },
  {
    title: 'AI / Machine Learning',
    skills: [
      { name: 'Python' },
      { name: 'Machine Learning Concepts' },
      { name: 'Deep Learning Concepts' },
      { name: 'TensorFlow (Basic)' },
      { name: 'MediaPipe' },
      { name: 'Computer Vision (Basic)' },
    ],
  },
  {
    title: 'Other Languages',
    skills: [
      { name: 'Java' },
      { name: 'C' },
      { name: 'C++' },
    ],
  },
]; 