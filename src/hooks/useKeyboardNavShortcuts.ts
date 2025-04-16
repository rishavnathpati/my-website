'use client';

import { useEffect } from 'react';
import { useConsole } from '@/components/ui/console-provider';

interface NavItem {
  sectionId: string;
  command: string;
  shortcut: string;
}

interface UseKeyboardNavShortcutsProps {
  navItems: NavItem[];
  onNavigate?: () => void;
}

export function useKeyboardNavShortcuts({ navItems, onNavigate }: UseKeyboardNavShortcutsProps) {
  const { success } = useConsole();

  useEffect(() => {
    const handleShortcuts = (e: KeyboardEvent) => {
      // Only trigger when Alt key is pressed along with a number key
      if (e.type === 'keydown' && !e.repeat && e.altKey) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= navItems.length) {
          e.preventDefault(); // Prevent default browser behavior
          const section = navItems[num - 1];
          const element = document.getElementById(section.sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            success(`Executing: ${section.command}`);
            
            // Set focus to the section for better accessibility
            element.setAttribute('tabindex', '-1');
            element.focus();
            
            // Call the optional callback if provided
            if (onNavigate) {
              onNavigate();
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleShortcuts);
    return () => {
      window.removeEventListener('keydown', handleShortcuts);
    };
  }, [navItems, success, onNavigate]);
}