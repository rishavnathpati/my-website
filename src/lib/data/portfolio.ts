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
    slug: 'beatrex-ball',
    title: 'Beatrex Ball',
    description: 'Engaging rhythm-based mobile game synchronizing obstacles with music beats. Built with Unity.',
    imageUrl: '/portfolio/games/BeatRex Ball.jpeg',
    tags: ['Unity', 'C#', 'Mobile Game', 'Rhythm'],
    detailsUrl: '/portfolio/beatrex-ball',
    githubUrl: 'https://github.com/rishavnathpati/BeatRex-Ball',
    category: 'Games',
  },
  {
    slug: 'hand-gesture-gui',
    title: 'Hand Gesture Controlled GUI',
    description: 'Real-time system using MediaPipe & OpenCV to control interfaces via hand movements.',
    imageUrl: '/portfolio/ml/hand gesture.jpeg',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision', 'HCI'],
    detailsUrl: '/portfolio/hand-gesture-gui',
    githubUrl: 'https://github.com/rishavnathpati/Hand-Gesture-Control',
    category: 'Machine Learning',
  },
  {
    slug: 'yoga-asana-trainer',
    title: 'AI Yoga Asana Trainer',
    description: 'Real-time pose detection & analysis providing feedback using MediaPipe & TensorFlow.',
    imageUrl: '/portfolio/ml/yoga-asana.jpeg',
    tags: ['Python', 'TensorFlow', 'MediaPipe', 'AI', 'Fitness Tech'],
    detailsUrl: '/portfolio/yoga-asana-trainer',
    githubUrl: 'https://github.com/rishavnathpati/Yoga-Asana-Trainer',
    category: 'Machine Learning',
  },
  {
    slug: 'brain-tumor-segmentation',
    title: 'Brain Tumor Segmentation',
    description: 'Research implementing U-Net architecture for automated brain tumor detection in MRI scans.',
    imageUrl: '/portfolio/publications/brain tumour.jpeg',
    tags: ['Deep Learning', 'U-Net', 'Medical Imaging', 'Python', 'Research'],
    detailsUrl: '/portfolio/brain-tumor-publication',
    category: 'Publications',
  },
];

export const highlightedPortfolioItems: PortfolioItem[] = portfolioItems.slice(0, 3); 