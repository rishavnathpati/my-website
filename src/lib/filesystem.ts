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
    aboutData.summary,
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
        content: `# START_HERE.txt

I'm Rishav — I build AI NPCs, speech systems, and VR characters at Convai.
This directory is the fast lane through the good stuff.

## If you're short on time
- cat featured/current-work.md        # What I'm shaping this week
- cat featured/best-projects.json     # 4 projects to judge me by
- tour                                # Guided walkthrough of the terminal
- cat contact/info.md                 # Say hi or book time

## Deep-dive commands
- cat about/profile.md            # Background + how I think
- ls portfolio/                   # Everything else I've shipped
- cat portfolio/convai-integration.json # More detail on the flagship build
- help                            # Complete command list

## Keep an eye on
- current-work.md                 # Updated whenever I land a new win
- best-projects.json              # Curated, no filler
- README.md                       # Cheatsheet if you're lost
`,
        size: 1024,
        permissions: '-rw-r--r--',
        modified: '2024-01-15'
      },
      'current-work.md': {
        name: 'current-work.md',
        type: 'file',
        content: `# Current Work Log

## Convai — AI NPCs that can actually talk
- Maintaining the speech stack: Unity <-> gRPC streaming, safety filters, and fallback TTS so characters never drop a line.
- Prompt + memory systems that keep personalities intact even when the conversation gets chaotic.
- Editor tooling for designers (conversation debugger, latency tracer, persona switchers) so they can iterate without calling me.
- Recent wins: 22% faster round trip on Quest 3, new utterance tagging that lets writers script reactions in plain text.

## Quest 3 + VR experiments
- Building a "presence lab" scene where NPCs respond to head direction, gaze, and proxemics so testing feels like theatre, not QA.
- Prototyping lightweight full-body IK + facial cues that survive mobile hardware limits.
- Running mixed-reality capture sessions to watch how people naturally approach AI-driven characters.

## Tools + glue work
- Tiny Python services (FastAPI, websockets) that let Unity talk to speech and LLM infra without bloating the game build.
- Command-line utilities for QA to replay dialogue transcripts and flag weird behaviour.
- Android + Quest automations for deploying test builds every Friday without babysitting adb.

## Go deeper
- cat featured/best-projects.json
- ls portfolio/
- tour filesystem
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
            title: 'Convai Unity Speech Stack',
            tech: ['Unity', 'C#', 'gRPC', 'LLM tooling', 'Quest 3'],
            description: 'End-to-end conversational pipeline so studios can drop AI NPCs into their projects without touching infrastructure.',
            impact: 'Supports 100K+ daily interactions with guardrails, personality memory, and latency tuned for VR.',
            why_cool: 'It feels like debugging a game server and a writer’s room at the same time — and it works inside a headset.'
          },
          {
            title: 'Quest 3 NPC Playtest Lab',
            tech: ['Unity', 'XR Interaction Toolkit', 'Cinemachine', 'LLM eval'],
            description: 'Sandbox scene for rehearsing embodied conversations: gaze tracking, proximity rules, and reactive body language.',
            impact: 'Used weekly by design + narrative teams to spot rough edges before demos; catches 90% of weirdness before QA.',
            why_cool: 'Turns AI testing into improv theatre — you can feel when an NPC draws you in or drifts off.'
          },
          {
            title: 'Hand Gesture Controlled GUI',
            tech: ['Python', 'OpenCV', 'MediaPipe', 'PySide'],
            description: 'Camera-based interaction layer that maps gestures to desktop actions for accessibility and prototyping.',
            impact: 'Tracks fingertips at 30+ FPS on consumer hardware; demoed internally for touchless kiosks.',
            why_cool: 'It’s the closest I’ve been to waving at my computer and having it actually understand.'
          },
          {
            title: 'BeatRex Ball',
            tech: ['Unity', 'C#', 'FMOD', 'Mobile'],
            description: 'A rhythm runner where obstacles sync to procedural beats so every level feels like a live set.',
            impact: 'Launched on iOS + Android with 10K organic downloads and <50 MB build size.',
            why_cool: 'Gameplay is literally driven by audio analysis — miss the beat and you feel it instantly.'
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
        content: aboutData.summary,
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
      bio: aboutData.summary,
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
