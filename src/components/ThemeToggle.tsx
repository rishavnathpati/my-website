'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering theme-dependent UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder on the server/before mount
    return <div className="fixed top-4 right-4 z-[9999] h-10 w-10"></div>;
  }

  // Use resolvedTheme to check the *actual* current theme (respecting 'system')
  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div className="fixed top-4 right-4 z-[9999]">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
        title={isDark ? 'Activate light mode' : 'Activate dark mode'}
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </div>
  );
} 