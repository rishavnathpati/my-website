/**
 * Virtual File System for Terminal Portfolio
 * This creates a navigable directory structure for the portfolio
 */

import { aboutData } from './data/about';
import { skillCategories } from './data/skills';
import { professionalExperience, education, professionalSummary } from './data/experience';
import { portfolioItems } from './data/portfolio';
import { contactInfo } from './data/contact';

export type FileType = 'file' | 'directory';

export interface VirtualFile {
  name: string;
  type: FileType;
  content?: string | (() => string);
  children?: Record<string, VirtualFile>;
  size?: number;
  modified?: string;
  permissions?: string;
}

/**
 * Get formatted content for different data types
 */
function formatAboutContent(): string {
  const lines = [
    '# About Rishav Nath Pati',
    '',
    ...aboutData.paragraphs.map(p => `${p}\n`),
    '## Core Competencies',
    '',
    ...aboutData.competencies.map((c, i) => `${i + 1}. ${c.text}`)
  ];
  return lines.join('\n');
}

function formatSkillsContent(): string {
  const lines = ['# Technical Skills\n'];
  
  skillCategories.forEach(category => {
    lines.push(`## ${category.title} (${category.icon})`);
    lines.push(`${category.description}\n`);
    
    category.skills.forEach(skill => {
      const level = skill.level ? '█'.repeat(skill.level) + '░'.repeat(5 - skill.level) : '';
      const icon = skill.icon || '•';
      lines.push(`${icon} ${skill.name.padEnd(30)} ${level} ${skill.level}/5`);
      if (skill.description) {
        lines.push(`  └─ ${skill.description}`);
      }
    });
    lines.push('');
  });
  
  return lines.join('\n');
}

function formatExperienceContent(): string {
  const lines = [
    '# Professional Experience',
    '',
    `## Summary`,
    professionalSummary,
    '',
    '## Work History',
    ''
  ];
  
  professionalExperience.forEach((exp, index) => {
    lines.push(`### ${index + 1}. ${exp.title}`);
    lines.push(`**${exp.company}** | ${exp.location}`);
    lines.push(`📅 ${exp.period}`);
    lines.push('');
    lines.push('**Key Achievements:**');
    exp.description.forEach(desc => {
      lines.push(`  • ${desc}`);
    });
    if (exp.skills) {
      lines.push('');
      lines.push(`**Skills:** ${exp.skills.join(', ')}`);
    }
    lines.push('');
  });
  
  return lines.join('\n');
}

function formatEducationContent(): string {
  const lines = ['# Education\n'];
  
  education.forEach((edu, index) => {
    lines.push(`## ${index + 1}. ${edu.degree}`);
    lines.push(`**${edu.institution}** | ${edu.location}`);
    lines.push(`📅 ${edu.period}`);
    lines.push('');
    lines.push(edu.description);
    lines.push('');
  });
  
  return lines.join('\n');
}

function formatPortfolioContent(): string {
  const lines = ['# Portfolio Projects\n'];
  
  const categories = ['Games', 'Machine Learning', 'Publications', 'Web'];
  
  categories.forEach(cat => {
    const items = portfolioItems.filter(item => item.category === cat);
    if (items.length > 0) {
      lines.push(`## ${cat}`);
      lines.push('');
      items.forEach((item, idx) => {
        const highlight = item.isHighlighted ? '⭐' : '•';
        lines.push(`${highlight} ${item.title}`);
        lines.push(`  ${item.description}`);
        lines.push(`  Tags: ${item.tags.join(', ')}`);
        if (item.date) lines.push(`  Date: ${item.date}`);
        if (item.liveUrl) lines.push(`  Live: ${item.liveUrl}`);
        if (item.githubUrl) lines.push(`  GitHub: ${item.githubUrl}`);
        lines.push('');
      });
    }
  });
  
  return lines.join('\n');
}

function formatContactContent(): string {
  const lines = [
    '# Contact Information',
    '',
    '## Get in Touch',
    ''
  ];
  
  contactInfo.forEach(info => {
    if (info.isPrimary) {
      lines.push(`💬 ${info.text}`);
    } else {
      lines.push(`• ${info.text}`);
    }
  });
  
  lines.push('');
  lines.push('---');
  lines.push('Email: nathpatirishav@gmail.com');
  lines.push('GitHub: github.com/rishavnathpati');
  lines.push('LinkedIn: linkedin.com/in/rishavnathpati');
  
  return lines.join('\n');
}

function formatREADME(): string {
  return `# Rishav Nath Pati - Portfolio

Welcome to my interactive terminal portfolio! 👋

This isn't just styled to *look* like a terminal — it actually works like one.
You can navigate directories, read files, search through content, and discover things.

## ⭐ Start Here

If you're short on time, check these out first:

\`\`\`bash
cat featured/START_HERE.txt     # Quick intro to my best work
cat featured/current-work.md    # What I'm building now
cat featured/best-projects.json # Top 4 projects
\`\`\`

## How to Navigate

\`\`\`bash
ls              # List files and directories
cd [directory]  # Change directory
cat [file]      # View file contents
pwd             # Show current directory
tree            # View directory structure
grep [pattern]  # Search through content
find [name]     # Find files by name
help            # Show all available commands
\`\`\`

## Directory Structure

~/
├── featured/       # ⭐ START HERE - Best work and current projects
├── portfolio/      # All projects and work samples
├── about/          # Who I am, what I do
├── experience/     # Work history
├── skills/         # Technical skills
├── education/      # Academic background
├── contact/        # How to reach me
└── README.md       # This file

## Explore More

\`\`\`bash
cat about/profile.md        # Full background
cat portfolio/projects.md   # All projects
grep "AI"                   # Find AI-related work
tour                        # Guided walkthrough
\`\`\`

## Fun Stuff

- 🎮 Hidden easter eggs (try the Konami code!)
- 📜 Command history with arrow keys
- 🔍 Full-text search through everything
- 🌳 Visual directory tree
- 💡 Smart hints and suggestions

Type \`help\` to see all commands or \`cat featured/START_HERE.txt\` to jump straight to the good stuff.

Happy exploring! 🚀
`;
}

/**
 * Virtual File System Structure
 */
export const virtualFileSystem: Record<string, VirtualFile> = {
  'featured': {
    name: 'featured',
    type: 'directory',
    permissions: 'drwxr-xr-x',
    modified: '2024-01-15',
    children: {
      'START_HERE.txt': {
        name: 'START_HERE.txt',
        type: 'file',
        content: `# Start Here - The Good Stuff

Hi! If you're short on time, here's what matters:

## What I'm Doing Now

Building AI-driven NPCs and speech systems at Convai. I spend most of my time
wiring up conversational AI to Unity characters so they can talk, listen, and
actually respond in real time.

## Projects Worth Checking Out

🎮 Convai Integration (portfolio/convai-integration.json)
   Real-time AI NPCs with speech in Unity

🧠 Hand Gesture Control (portfolio/hand-gesture-gui.json)
   Computer vision + GUI control using MediaPipe

🎵 BeatRex Ball (portfolio/beatrex-ball.json)
   Rhythm-based mobile game

📄 Brain Tumor Segmentation (portfolio/brain-tumor-segmentation.json)
   Published ML research on medical imaging

## Quick Commands

cat featured/current-work.md    # What I'm building now
cat featured/best-projects.json # Top 4 projects
grep "AI"                        # Find all AI-related work
cat contact/info.md              # Get in touch

## The Full Tour

If you want the complete picture:
- cat about/profile.md       # Who I am, how I got here
- cat portfolio/projects.md  # All projects
- tour                       # Guided walkthrough
`,
        size: 1024,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      },
      'current-work.md': {
        name: 'current-work.md',
        type: 'file',
        content: `# What I'm Building Now

## At Convai (July 2022 - Present)

I'm building systems that let virtual characters actually converse.

The interesting parts:
- Real-time speech streaming to/from Unity Engine using gRPC
- Character AI that can stay in-character while responding naturally
- SDK tools so other devs can integrate this without drowning in docs
- Performance optimization for VR (latency matters a LOT)

Recent wins:
- Cut response latency by 25% through better networking
- Improved AI accuracy by 30% with smarter prompting
- Built end-to-end speech pipeline with 95% accuracy
- Scaled to handle 100K+ daily active users

The stack: Unity, C#, gRPC, conversational AI, speech recognition/synthesis

## Side Projects

Small experiments to learn and build:
- Python CLIs and backends to glue systems together
- Android tools for productivity
- VR prototypes testing interaction ideas
- Game jam submissions when time allows
`,
        size: 896,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      },
      'best-projects.json': {
        name: 'best-projects.json',
        type: 'file',
        content: JSON.stringify([
          {
            title: 'Conversational AI in Unity',
            category: 'Professional Work',
            tech: ['Unity', 'C#', 'AI', 'gRPC', 'Speech'],
            description: 'Real-time AI NPCs with speech for Unity Engine',
            impact: '100K+ daily users, 25% latency reduction',
            why_cool: 'Characters that can actually hold conversations in VR/games'
          },
          {
            title: 'Hand Gesture GUI Control',
            category: 'Computer Vision',
            tech: ['Python', 'OpenCV', 'MediaPipe', 'HCI'],
            description: 'Control your computer with hand gestures using CV',
            impact: 'Real-time gesture recognition with MediaPipe',
            why_cool: 'Mouse-free computing through camera-based hand tracking'
          },
          {
            title: 'BeatRex Ball',
            category: 'Mobile Game',
            tech: ['Unity', 'C#', 'iOS', 'Android', 'Audio'],
            description: 'Rhythm-based mobile game with dynamic music sync',
            impact: 'Published on App Store & Play Store',
            why_cool: 'Gameplay that actually reacts to music beats'
          },
          {
            title: 'Brain Tumor Segmentation',
            category: 'ML Research',
            tech: ['Python', 'TensorFlow', 'U-Net', 'Medical Imaging'],
            description: 'Published research on tumor detection in MRI scans',
            impact: '92% detection accuracy, peer-reviewed publication',
            why_cool: 'Applied deep learning to help diagnose brain tumors'
          }
        ], null, 2),
        size: 1536,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      }
    }
  },
  
  'about': {
    name: 'about',
    type: 'directory',
    permissions: 'drwxr-xr-x',
    modified: '2024-01-15',
    children: {
      'profile.md': {
        name: 'profile.md',
        type: 'file',
        content: formatAboutContent,
        size: 2048,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      },
      'bio.txt': {
        name: 'bio.txt',
        type: 'file',
        content: aboutData.paragraphs.join('\n\n'),
        size: 1024,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      },
      'competencies.json': {
        name: 'competencies.json',
        type: 'file',
        content: JSON.stringify(aboutData.competencies, null, 2),
        size: 512,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      }
    }
  },
  
  'skills': {
    name: 'skills',
    type: 'directory',
    permissions: 'drwxr-xr-x',
    modified: '2024-01-15',
    children: {
      'summary.txt': {
        name: 'summary.txt',
        type: 'file',
        content: formatSkillsContent,
        size: 3072,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      },
      'core-development.json': {
        name: 'core-development.json',
        type: 'file',
        content: JSON.stringify(skillCategories[0], null, 2),
        size: 1024,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      },
      'data-ai.json': {
        name: 'data-ai.json',
        type: 'file',
        content: JSON.stringify(skillCategories[1], null, 2),
        size: 768,
        permissions: '-rw-r--r--',
        modified: '2024-01-14'
      },
      'web-development.json': {
        name: 'web-development.json',
        type: 'file',
        content: JSON.stringify(skillCategories[2], null, 2),
        size: 896,
        permissions: '-rw-r--r--',
        modified: '2024-01-14'
      },
      'xr-development.json': {
        name: 'xr-development.json',
        type: 'file',
        content: JSON.stringify(skillCategories[3], null, 2),
        size: 640,
        permissions: '-rw-r--r--',
        modified: '2024-01-14'
      }
    }
  },
  
  'experience': {
    name: 'experience',
    type: 'directory',
    permissions: 'drwxr-xr-x',
    modified: '2024-01-15',
    children: {
      'work-history.md': {
        name: 'work-history.md',
        type: 'file',
        content: formatExperienceContent,
        size: 4096,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      },
      'summary.txt': {
        name: 'summary.txt',
        type: 'file',
        content: professionalSummary,
        size: 512,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      },
      'jobs.json': {
        name: 'jobs.json',
        type: 'file',
        content: JSON.stringify(professionalExperience, null, 2),
        size: 2048,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      }
    }
  },
  
  'education': {
    name: 'education',
    type: 'directory',
    permissions: 'drwxr-xr-x',
    modified: '2024-01-15',
    children: {
      'degrees.md': {
        name: 'degrees.md',
        type: 'file',
        content: formatEducationContent,
        size: 2048,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      },
      'academic-records.json': {
        name: 'academic-records.json',
        type: 'file',
        content: JSON.stringify(education, null, 2),
        size: 1536,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      }
    }
  },
  
  'portfolio': {
    name: 'portfolio',
    type: 'directory',
    permissions: 'drwxr-xr-x',
    modified: '2024-01-15',
    children: {
      'projects.md': {
        name: 'projects.md',
        type: 'file',
        content: formatPortfolioContent,
        size: 5120,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      },
      'games.json': {
        name: 'games.json',
        type: 'file',
        content: JSON.stringify(portfolioItems.filter(i => i.category === 'Games'), null, 2),
        size: 2048,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      },
      'machine-learning.json': {
        name: 'machine-learning.json',
        type: 'file',
        content: JSON.stringify(portfolioItems.filter(i => i.category === 'Machine Learning'), null, 2),
        size: 1024,
        permissions: '-rw-r--r--',
        modified: '2024-01-14'
      },
      'publications.json': {
        name: 'publications.json',
        type: 'file',
        content: JSON.stringify(portfolioItems.filter(i => i.category === 'Publications'), null, 2),
        size: 768,
        permissions: '-rw-r--r--',
        modified: '2024-01-13'
      },
      'highlighted.json': {
        name: 'highlighted.json',
        type: 'file',
        content: JSON.stringify(portfolioItems.filter(i => i.isHighlighted), null, 2),
        size: 1536,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      }
    }
  },
  
  'contact': {
    name: 'contact',
    type: 'directory',
    permissions: 'drwxr-xr-x',
    modified: '2024-01-15',
    children: {
      'info.md': {
        name: 'info.md',
        type: 'file',
        content: formatContactContent,
        size: 768,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      },
      'social-links.json': {
        name: 'social-links.json',
        type: 'file',
        content: JSON.stringify({
          email: 'nathpatirishav@gmail.com',
          phone: '+91 9123877594',
          github: 'https://github.com/rishavnathpati',
          linkedin: 'https://linkedin.com/in/rishavnathpati',
          itch: 'https://rishavnathpati.itch.io',
          location: 'Kalyani, West Bengal, India'
        }, null, 2),
        size: 384,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      }
    }
  },
  
  'README.md': {
    name: 'README.md',
    type: 'file',
    content: formatREADME,
    size: 2560,
    permissions: '-rw-r--r--',
    modified: '2024-01-15'
  },
  
  'user_profile.json': {
    name: 'user_profile.json',
    type: 'file',
    content: JSON.stringify({
      name: 'Rishav Nath Pati',
      title: 'Interactive Media Developer',
      location: 'Kalyani, West Bengal, India',
      bio: 'Game & interactive media dev at Convai. I build AI NPCs, speech systems, and VR experiences in Unity.',
      status: 'Currently at Convai',
      yearsOfExperience: 3,
      projectsCompleted: 10,
      focus: ['AI NPCs', 'Speech Systems', 'VR', 'Real-time Interaction', 'Unity3D']
    }, null, 2),
    size: 512,
    permissions: '-rw-r--r--',
    modified: '2024-01-15'
  }
};

/**
 * Current working directory state (to be managed by commands)
 */
export let currentDirectory = '~';
export const setCurrentDirectory = (dir: string) => {
  currentDirectory = dir;
};

/**
 * Resolve path (handles ~, /, .., .)
 */
export function resolvePath(path: string, current: string = currentDirectory): string {
  // Handle absolute paths
  if (path.startsWith('~')) {
    path = path.slice(1);
  }
  if (path.startsWith('/')) {
    path = path.slice(1);
  }
  
  // Handle current directory
  if (path === '.' || path === '') {
    return current === '~' ? '' : current;
  }
  
  // Handle parent directory
  if (path === '..') {
    if (current === '~' || current === '') {
      return '';
    }
    const parts = current.split('/').filter(Boolean);
    parts.pop();
    return parts.join('/');
  }
  
  // Combine current and new path
  if (current === '~' || current === '') {
    return path;
  }
  
  return `${current}/${path}`.replace(/\/+/g, '/');
}

/**
 * Get file/directory at path
 */
export function getFileAtPath(path: string): VirtualFile | null {
  const normalizedPath = resolvePath(path);
  
  if (normalizedPath === '' || normalizedPath === '~') {
    return {
      name: '~',
      type: 'directory',
      children: virtualFileSystem,
      permissions: 'drwxr-xr-x',
      modified: '2024-01-15'
    };
  }
  
  const parts = normalizedPath.split('/').filter(Boolean);
  let current: VirtualFile | null = null;
  let currentChildren = virtualFileSystem;
  
  for (const part of parts) {
    if (!currentChildren[part]) {
      return null;
    }
    current = currentChildren[part];
    if (current.type === 'directory' && current.children) {
      currentChildren = current.children;
    }
  }
  
  return current;
}

/**
 * Get file content (evaluates functions if needed)
 */
export function getFileContent(file: VirtualFile): string {
  if (typeof file.content === 'function') {
    return file.content();
  }
  return file.content || '';
}

/**
 * List directory contents
 */
export function listDirectory(path: string = ''): VirtualFile[] {
  const dir = getFileAtPath(path);
  if (!dir || dir.type !== 'directory' || !dir.children) {
    return [];
  }
  return Object.values(dir.children);
}

/**
 * Search for files by name
 */
export function findFiles(pattern: string, searchPath: string = ''): { path: string; file: VirtualFile }[] {
  const results: { path: string; file: VirtualFile }[] = [];
  const regex = new RegExp(pattern, 'i');
  
  function search(currentPath: string, children: Record<string, VirtualFile>) {
    for (const [name, file] of Object.entries(children)) {
      const fullPath = currentPath ? `${currentPath}/${name}` : name;
      
      if (regex.test(name)) {
        results.push({ path: fullPath, file });
      }
      
      if (file.type === 'directory' && file.children) {
        search(fullPath, file.children);
      }
    }
  }
  
  const startDir = getFileAtPath(searchPath);
  if (startDir && startDir.type === 'directory' && startDir.children) {
    search(searchPath, startDir.children);
  } else {
    search('', virtualFileSystem);
  }
  
  return results;
}

/**
 * Search for content within files
 */
export function grepFiles(pattern: string, searchPath: string = ''): { path: string; matches: string[] }[] {
  const results: { path: string; matches: string[] }[] = [];
  const regex = new RegExp(pattern, 'gi');
  
  function search(currentPath: string, children: Record<string, VirtualFile>) {
    for (const [name, file] of Object.entries(children)) {
      const fullPath = currentPath ? `${currentPath}/${name}` : name;
      
      if (file.type === 'file' && file.content) {
        const content = getFileContent(file);
        const lines = content.split('\n');
        const matches: string[] = [];
        
        lines.forEach((line, idx) => {
          if (regex.test(line)) {
            matches.push(`${idx + 1}: ${line.trim()}`);
          }
        });
        
        if (matches.length > 0) {
          results.push({ path: fullPath, matches });
        }
      }
      
      if (file.type === 'directory' && file.children) {
        search(fullPath, file.children);
      }
    }
  }
  
  const startDir = getFileAtPath(searchPath);
  if (startDir && startDir.type === 'directory' && startDir.children) {
    search(searchPath, startDir.children);
  } else {
    search('', virtualFileSystem);
  }
  
  return results;
}

/**
 * Generate tree structure
 */
export function generateTree(path: string = '', prefix: string = '', isLast: boolean = true): string[] {
  const lines: string[] = [];
  const dir = getFileAtPath(path);
  
  if (!dir) return lines;
  
  if (path === '' || path === '~') {
    lines.push('~/');
  }
  
  if (dir.type === 'directory' && dir.children) {
    const entries = Object.values(dir.children);
    entries.forEach((entry, index) => {
      const isLastEntry = index === entries.length - 1;
      const connector = isLastEntry ? '└── ' : '├── ';
      const displayName = entry.type === 'directory' ? `${entry.name}/` : entry.name;
      
      lines.push(`${prefix}${connector}${displayName}`);
      
      if (entry.type === 'directory' && entry.children) {
        const newPrefix = prefix + (isLastEntry ? '    ' : '│   ');
        const subPath = path ? `${path}/${entry.name}` : entry.name;
        const subLines = generateTree(subPath, newPrefix, isLastEntry);
        lines.push(...subLines.slice(1)); // Skip the first line (directory name)
      }
    });
  }
  
  return lines;
}

