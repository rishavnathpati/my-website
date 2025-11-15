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
  date?: string;
  isHighlighted?: boolean;
  highlights?: string[];
}

export const portfolioItems: PortfolioItem[] = [
  {
    slug: 'convai-integration',
    title: 'Convai Unity Speech Stack',
    description: 'AI NPC speech + behaviour system that powers Convai demos and partner projects.',
    imageUrl: '/portfolio/games/convai-integration.jpg',
    tags: ['Unity', 'C#', 'AI NPCs', 'gRPC', 'Speech', 'Quest 3'],
    detailsUrl: '/portfolio/convai-integration',
    category: 'Games',
    date: '2023-09-15',
    isHighlighted: true,
    highlights: [
      'Implemented streaming speech + safety fallback layers so conversations never drop mid-session.',
      'Built prompt/memory tooling and a conversation debugger that designers can run directly in the editor.',
      'Cut Quest 3 round-trip latency by 22% through buffering tweaks, caching, and smarter network scheduling.'
    ]
  },
  {
    slug: 'quest-3-npc-lab',
    title: 'Quest 3 NPC Playtest Lab',
    description: 'Mixed-reality sandbox for rehearsing how people talk to AI-driven characters before we ship them.',
    imageUrl: '/portfolio/games/journey-under-the-sea.jpg',
    tags: ['Unity', 'Quest 3', 'XR Interaction Toolkit', 'AI NPCs', 'Playtesting'],
    detailsUrl: '/portfolio/quest-3-npc-lab',
    category: 'Games',
    date: '2024-01-10',
    isHighlighted: true,
    highlights: [
      'Combines gaze, proximity, and head-nod cues so NPCs react before the player even speaks.',
      'Captured MR playtests every Friday to see how the cast felt in the headset and to tune behaviours fast.',
      'Automated transcript tagging with a CLI so designers can flag awkward beats without a headphones-on meeting.'
    ]
  },
  {
    slug: 'hand-gesture-gui',
    title: 'Hand Gesture Controlled GUI',
    description: 'Computer-vision controller that turns fingertip gestures into GUI commands for accessibility and prototyping.',
    imageUrl: '/portfolio/ml/hand-gesture-gui.jpg',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'HCI', 'Machine Learning'],
    detailsUrl: '/portfolio/hand-gesture-gui',
    githubUrl: 'https://github.com/rishavnathpati/Hand-Gesture-Control',
    category: 'Machine Learning',
    date: '2023-04-15',
    isHighlighted: true,
    highlights: [
      'Stabilized MediaPipe Hands output with Kalman filters to keep cursors steady at 30+ FPS on consumer webcams.',
      'Mapped gestures to PySide controls so windows, sliders, and menus can be manipulated with a single hand.',
      'Bundled a calibration CLI to re-train thresholds for different lighting setups in under two minutes.'
    ]
  },
  {
    slug: 'beatrex-ball',
    title: 'BeatRex Ball',
    description: 'A rhythm runner where every obstacle is synced to procedural beats and live audio peaks.',
    imageUrl: '/portfolio/games/beatrex-ball.jpg',
    tags: ['Unity', 'C#', 'FMOD', 'Mobile', 'Rhythm'],
    detailsUrl: '/portfolio/beatrex-ball',
    githubUrl: 'https://github.com/rishavnathpati/BeatRex-Ball',
    category: 'Games',
    date: '2023-06-15',
    isHighlighted: true,
    highlights: [
      'Built a custom FMOD analyser so beat events drive physics, VFX, and UI without frame drift.',
      'Kept the game under 50 MB and 60 FPS on low-end Android hardware with aggressive pooling.',
      'Shipped a lightweight level-authoring tool that turns any MP3 into a playable layout in minutes.'
    ]
  },
  {
    slug: 'itch-io-collection',
    title: 'Collection of games on Itch.io',
    description: 'A diverse collection of games published on the Itch.io platform, showcasing various game mechanics and design principles implemented across different projects.',
    imageUrl: '/portfolio/games/itch-io-collection.jpg',
    tags: ['Unity', 'C#', 'Game Design', 'Game Development', 'Casual Games', 'Hyper-casual'],
    detailsUrl: '/portfolio/itch-io-collection',
    liveUrl: 'https://rishavnathpati.itch.io/',
    category: 'Games',
    date: '2023-05-20',
    isHighlighted: false
  },
  {
    slug: 'yoga-asana-trainer',
    title: 'Yoga Asana Trainer',
    description: 'AI-powered application that guides users through yoga poses and provides real-time feedback on posture and alignment using computer vision and pose estimation techniques.',
    imageUrl: '/portfolio/ml/yoga-asana-trainer.jpg',
    tags: ['Python', 'TensorFlow', 'MediaPipe', 'AI', 'Fitness Tech', 'Pose Estimation'],
    detailsUrl: '/portfolio/yoga-asana-trainer',
    githubUrl: 'https://github.com/rishavnathpati/Yoga-Asana-Trainer',
    category: 'Machine Learning',
    date: '2022-11-28',
    isHighlighted: false
  },
  {
    slug: 'brain-tumor-segmentation',
    title: 'Brain Tumor Extraction Publication',
    description: 'Research publication on brain tumor segmentation using U-Net architecture for automated detection and segmentation of tumors in MRI scans, improving diagnostic accuracy.',
    imageUrl: '/portfolio/publications/brain-tumor-publication.jpg',
    tags: ['Deep Learning', 'U-Net', 'Medical Imaging', 'Python', 'Research', 'Publication'],
    detailsUrl: '/portfolio/brain-tumor-publication',
    category: 'Publications',
    date: '2023-03-20',
    isHighlighted: false
  }
];
export const highlightedPortfolioItems: PortfolioItem[] = portfolioItems.filter(item => item.isHighlighted);
