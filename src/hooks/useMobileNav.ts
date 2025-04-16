'use client'
import { useState } from 'react';

export function useMobileNav() {
  const [open, setOpen] = useState(false);
  return { open, toggle: () => setOpen(o => !o), close: () => setOpen(false) };
} 