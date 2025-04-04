export interface Skill {
  name: string;
  level?: number;  // 1-5 for proficiency level
  icon?: string;   // For custom icons or emoji representations
  description?: string;  // Skill description for tooltips
  xp?: number;     // Experience points (percentage to next level)
}

export interface SkillCategory {
  title: string;
  icon: string;    // Terminal command or category identifier
  description: string;  // Category description
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Core Development',
    icon: 'main.cs',
    description: 'Primary development skills and tools',
    skills: [
      { 
        name: 'Unity 3D/2D/AR/VR',
        level: 3,
        icon: '🎮',
        description: 'Expert in Unity game engine, including 2D/3D development, AR/VR, and custom tooling',
        xp: 60
      },
      { 
        name: 'C#',
        level: 3,
        description: 'Advanced C# programming with focus on game development and system architecture',
        xp: 50
      },
      { 
        name: 'Java',
        level: 3,
        icon: '☕',
        description: 'Java programming with focus on application development',
        xp: 55
      },
      { 
        name: 'Design Patterns and Principles',
        level: 3,
        description: 'Implementation of software design patterns and best practices',
        xp: 55
      },
      { 
        name: 'Software Architecture',
        level: 3,
        description: 'System design, patterns, and scalable architecture',
        xp: 50
      },
      { 
        name: 'Problem Solving',
        level: 5,
        description: 'Algorithmic thinking and complex problem resolution',
        xp: 95
      },
    ],
  },
  {
    title: 'Data & AI',
    icon: 'ai.py',
    description: 'Artificial Intelligence and Machine Learning',
    skills: [
      { 
        name: 'Python',
        level: 3,
        icon: '🐍',
        description: 'Python programming for AI/ML applications and data science',
        xp: 55
      },
      { 
        name: 'Machine Learning / Deep Learning',
        level: 2,
        icon: '🤖',
        description: 'Machine learning and deep learning concepts and applications',
        xp: 35
      },
      { 
        name: 'TensorFlow',
        level: 2,
        icon: '🧠',
        description: 'Machine learning framework for AI development',
        xp: 35
      },
      { 
        name: 'OpenCV',
        level: 3,
        icon: '👁️',
        description: 'Computer vision and image processing',
        xp: 70
      },
    ],
  },
  {
    title: 'Web Development',
    icon: 'web.config',
    description: 'Modern web development stack',
    skills: [
      { 
        name: 'Git',
        level: 3,
        icon: '🔄',
        description: 'Version control and collaboration workflows',
        xp: 50
      },
      { 
        name: 'React',
        level: 4,
        icon: '⚛️',
        description: 'Component-based UI development with React ecosystem',
        xp: 85
      },
      { 
        name: 'Next.js',
        level: 4,
        description: 'Full-stack React framework with SSR/SSG capabilities',
        xp: 75
      },
      { 
        name: 'Node.js',
        level: 3,
        description: 'Server-side JavaScript runtime and API development',
        xp: 65
      },
      { 
        name: 'HTML/CSS',
        level: 4,
        description: 'Semantic markup and modern CSS techniques',
        xp: 90
      },
      { 
        name: 'Tailwind',
        level: 4,
        description: 'Utility-first CSS framework for rapid UI development',
        xp: 85
      },
    ],
  },
  {
    title: 'XR Development',
    icon: 'xr.unity',
    description: 'Extended Reality and immersive experiences',
    skills: [
      { 
        name: 'AR Foundation',
        level: 4,
        icon: '📱',
        description: 'Cross-platform AR development with Unity',
        xp: 80
      },
      { 
        name: 'XR Toolkit',
        level: 4,
        icon: '🥽',
        description: 'Virtual and mixed reality development tools',
        xp: 75
      },
      { 
        name: 'Conversational AI',
        level: 3,
        description: 'Integration of AI-powered conversation systems',
        xp: 60
      },
      { 
        name: 'gRPC',
        level: 3,
        description: 'High-performance RPC framework for services',
        xp: 65
      },
    ],
  },
];