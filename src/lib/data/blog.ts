export interface BlogPostHighlight {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  tags: string[];
  readTimeMinutes?: number;
  externalUrl?: string;
}

export const blogPostsData: BlogPostHighlight[] = [
  {
    slug: 'mac-terminal-setup',
    title: 'Ultimate Mac Terminal Setup Guide',
    date: '2024-03-15',
    excerpt: 'A comprehensive guide to setting up a modern, efficient terminal environment on macOS with iTerm2, Oh My Zsh, and essential tools.',
    imageUrl: '/blog/thumbnails/mac-terminal.png',
    tags: ['Development', 'Terminal', 'macOS'],
    readTimeMinutes: 15,
  },
  {
    slug: 'beatrex-ball-dev-journey',
    title: 'Beatrex Ball: A Unity Game Development Journey',
    date: '2023-06-15',
    excerpt: 'Deep dive into the development process of Beatrex Ball, exploring the technical challenges and solutions in creating this rhythm-based mobile game.',
    imageUrl: 'https://placehold.co/600x400/8844ee/ffffff.png?text=Beatrex+Ball+Journey',
    tags: ['GameDev', 'Unity', 'Mobile'],
    readTimeMinutes: 8,
  },
  {
    slug: 'hand-gesture-recognition-research',
    title: 'Real-time Hand Gesture Recognition Research',
    date: '2023-05-20',
    excerpt: 'Research publication on developing an efficient hand gesture recognition system using deep learning and computer vision techniques.',
    imageUrl: 'https://placehold.co/600x400/44aaee/ffffff.png?text=Hand+Gesture+Recognition',
    tags: ['ML', 'Computer Vision', 'Research'],
    readTimeMinutes: 12,
  },
  {
    slug: 'hand-gesture-gui-mediapipe',
    title: 'Realtime Hand Gesture Controlled GUI (Medium)',
    date: '2023-04-15',
    excerpt: 'Learn how to create a hand gesture-controlled interface using computer vision and machine learning with MediaPipe and Python.',
    imageUrl: 'https://placehold.co/600x400/ee4488/ffffff.png?text=Hand+Gesture+GUI+Tutorial',
    tags: ['CV', 'Python', 'MediaPipe'],
    readTimeMinutes: 10,
    externalUrl: 'https://medium.com/@patirishavnath/realtime-hand-gesture-controlled-gui-using-mediapipe-and-python-c80f3a295fb',
  },
  {
    slug: 'brain-tumor-segmentation-unet',
    title: 'Brain Tumor Segmentation Using U-Net (Medium)',
    date: '2023-03-20',
    excerpt: 'Explore how deep learning, specifically the U-Net architecture, can be used for accurate brain tumor detection and segmentation.',
    imageUrl: 'https://placehold.co/600x400/4488ee/ffffff.png?text=Brain+Tumor+Segmentation',
    tags: ['Deep Learning', 'Medical Imaging', 'U-Net'],
    readTimeMinutes: 15,
    externalUrl: 'https://medium.com/@patirishavnath/brain-tumor-segmentation-using-u-net-architecture-d6c32bc9fa82',
  },
];

export const highlightedBlogPosts: BlogPostHighlight[] = blogPostsData
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3); 