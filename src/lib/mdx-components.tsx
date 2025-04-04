import { Card } from '@/components/ui/mdx/Card';
import { Note } from '@/components/ui/mdx/Note';
import { Steps, Step } from '@/components/ui/mdx/Steps';
import { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Card,
    Note,
    Steps,
    Step,
    ...components,
  };
} 