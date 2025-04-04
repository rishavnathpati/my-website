export interface PortfolioItem {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  detailsUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  category: 'Games' | 'Machine Learning' | 'Publications' | 'Web';
}

export const portfolioItems: PortfolioItem[] = [
  {
    slug: 'journey-under-the-sea',
    title: 'Journey Under the Sea',
    description: 'An immersive underwater exploration game with stunning visuals and engaging gameplay.',
    imageUrl: 'https://placehold.co/600x400/png?text=Journey+Under+The+Sea',
    tags: ['Unity', 'C#', 'Game Development', '3D', 'Adventure'],
    detailsUrl: '/portfolio/journey-under-the-sea',
    category: 'Games',
  },
  {
    slug: 'beatrex-ball',
    title: 'Beatrex Ball',
    description: 'Engaging rhythm-based mobile game synchronizing obstacles with music beats. Built with Unity.',
    imageUrl: 'https://placehold.co/600x400/png?text=Beatrex+Ball',
    tags: ['Unity', 'C#', 'Mobile Game', 'Rhythm'],
    detailsUrl: '/portfolio/beatrex-ball',
    githubUrl: 'https://github.com/rishavnathpati/BeatRex-Ball',
    category: 'Games',
  },
  {
    slug: 'hand-gesture-gui',
    title: 'Hand Gesture Controlled GUI',
    description: 'Real-time system using MediaPipe & OpenCV to control interfaces via hand movements.',
    imageUrl: 'https://placehold.co/600x400/png?text=Hand+Gesture+GUI',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision', 'HCI'],
    detailsUrl: '/portfolio/hand-gesture-gui',
    githubUrl: 'https://github.com/rishavnathpati/Hand-Gesture-Control',
    category: 'Machine Learning',
  },
  {
    slug: 'yoga-asana-trainer',
    title: 'AI Yoga Asana Trainer',
    description: 'Real-time pose detection & analysis providing feedback using MediaPipe & TensorFlow.',
    imageUrl: 'https://placehold.co/600x400/png?text=Yoga+Asana+Trainer',
    tags: ['Python', 'TensorFlow', 'MediaPipe', 'AI', 'Fitness Tech'],
    detailsUrl: '/portfolio/yoga-asana-trainer',
    githubUrl: 'https://github.com/rishavnathpati/Yoga-Asana-Trainer',
    category: 'Machine Learning',
  },
  {
    slug: 'brain-tumor-segmentation',
    title: 'Brain Tumor Segmentation',
    description: 'Research implementing U-Net architecture for automated brain tumor detection in MRI scans.',
    imageUrl: 'https://placehold.co/600x400/png?text=Brain+Tumor+Segmentation',
    tags: ['Deep Learning', 'U-Net', 'Medical Imaging', 'Python', 'Research'],
    detailsUrl: '/portfolio/brain-tumor-publication',
    category: 'Publications',
  },
];
export const highlightedPortfolioItems: PortfolioItem[] = [
  portfolioItems[0], // Journey Under the Sea
  portfolioItems[1], // Beatrex Ball
  portfolioItems[2], // Hand Gesture Controlled GUI
];