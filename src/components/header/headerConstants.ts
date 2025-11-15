import { Home, User, FileText, Mail, Bot, Github, Linkedin, FileCode2, Pencil, Gamepad2 } from 'lucide-react';

// Define navigation items with enhanced metadata
export const navItems = [
  { href: '#hero', icon: Home, label: 'Home', sectionId: 'hero', command: 'cd ~', shortcut: '1' },
  { href: '#about', icon: User, label: 'About', sectionId: 'about', command: 'cat about.md', shortcut: '2' },
  {
    href: '#experience',
    icon: FileText,
    label: 'Experience',
    sectionId: 'experience',
    command: 'cat experience.md',
    shortcut: '4'
  },
  { href: '#skills', icon: FileText, label: 'Skills', sectionId: 'skills', command: 'ls skills/', shortcut: '3' },
  { href: '#portfolio-highlights', icon: Gamepad2, label: 'Portfolio', sectionId: 'portfolio-highlights', command: './view_projects', shortcut: '5' },
  { href: '#notes', icon: Pencil, label: 'Notes', sectionId: 'notes', command: 'cat notes/logbook.md', shortcut: '6' },
  { href: '#contact-cta', icon: Mail, label: 'Contact', sectionId: 'contact-cta', command: 'mail -s "Hello"', shortcut: '7' },
];

// Define social links with enhanced metadata
export const socialLinks = [
  { href: 'https://www.linkedin.com/in/rishavnathpati', icon: Linkedin, label: 'LinkedIn', command: 'open linkedin' },
  { href: 'https://github.com/rishavnathpati', icon: Github, label: 'GitHub', command: 'git remote -v' },
  { href: 'https://medium.com/@patirishavnath', icon: Bot, label: 'Medium', command: 'read blog' },
  { href: 'https://leetcode.com/rishavnathpati/', icon: FileCode2, label: 'LeetCode', command: 'solve algo' },
];
