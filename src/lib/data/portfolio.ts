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
}

export const portfolioItems: PortfolioItem[] = [
  {
    slug: 'beatrex-ball',
    title: 'Beatrex Ball Game',
    description: 'A rhythm-based mobile game developed with Unity. Features dynamic gameplay that synchronizes with music beats for an immersive gaming experience. This project showcases my expertise in game mechanics, sound integration, and responsive UI design.',
    imageUrl: '/portfolio/games/beatrex-ball.jpg',
    tags: ['Unity', 'C#', 'Mobile Game', 'Rhythm', 'iOS', 'Android'],
    detailsUrl: '/portfolio/beatrex-ball',
    githubUrl: 'https://github.com/rishavnathpati/BeatRex-Ball',
    category: 'Games',
    date: '2023-06-15',
    isHighlighted: true
  },
  {
    slug: 'itch-io-collection',
    title: 'Collection of games on Itch.io',
    description: 'A diverse collection of games published on the Itch.io platform, showcasing various game mechanics and design principles implemented across different projects. These games demonstrate my versatility in developing across various genres from casual to educational games.',
    imageUrl: '/portfolio/games/itch-io-collection.jpg',
    tags: ['Unity', 'C#', 'Game Design', 'Game Development', 'Casual Games', 'Hyper-casual'],
    detailsUrl: '/portfolio/itch-io-collection',
    liveUrl: 'https://rishavnathpati.itch.io/',
    category: 'Games',
    date: '2023-05-20',
    isHighlighted: false
  },
  {
    slug: 'journey-under-the-sea',
    title: 'Journey Under the Sea Game',
    description: 'An immersive underwater adventure game with stunning visuals and engaging gameplay that takes players on an exploration journey beneath the ocean. This project highlights my ability to create atmospheric environments and engaging player experiences.',
    imageUrl: '/portfolio/games/journey-under-the-sea.jpg',
    tags: ['Unity', 'C#', 'Game Development', '3D', 'Adventure', 'Immersive Experience'],
    detailsUrl: '/portfolio/journey-under-the-sea',
    category: 'Games',
    date: '2023-02-10',
    isHighlighted: false
  },
  {
    slug: 'hand-gesture-gui',
    title: 'Hand Gesture Controlled GUI',
    description: 'Computer vision project utilizing MediaPipe and OpenCV to create a real-time hand gesture recognition system that allows controlling graphical interfaces with hand movements. This project demonstrates my expertise in combining computer vision with interactive applications.',
    imageUrl: '/portfolio/ml/hand-gesture-gui.jpg',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision', 'HCI', 'Machine Learning'],
    detailsUrl: '/portfolio/hand-gesture-gui',
    githubUrl: 'https://github.com/rishavnathpati/Hand-Gesture-Control',
    category: 'Machine Learning',
    date: '2023-04-15',
    isHighlighted: true
  },
  {
    slug: 'yoga-asana-trainer',
    title: 'Yoga Asana Trainer',
    description: 'AI-powered application that guides users through yoga poses and provides real-time feedback on posture and alignment using computer vision and pose estimation techniques. This project combines my interest in wellness with technical expertise in machine learning.',
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
    description: 'Research publication on brain tumor segmentation using U-Net architecture for automated detection and segmentation of tumors in MRI scans, improving diagnostic accuracy. This paper highlights my ability to apply deep learning techniques to solve complex medical imaging problems.',
    imageUrl: '/portfolio/publications/brain-tumor-publication.jpg',
    tags: ['Deep Learning', 'U-Net', 'Medical Imaging', 'Python', 'Research', 'Publication'],
    detailsUrl: '/portfolio/brain-tumor-publication',
    category: 'Publications',
    date: '2023-03-20',
    isHighlighted: true
  },
  {
    slug: 'convai-integration',
    title: 'Conversational AI in Unity',
    description: 'Developed end-to-end speech solutions and integrated conversational AI within Unity environments. This project showcases my work at Convai, where I designed and implemented AI-driven interactive character systems using gRPC networking and advanced prompt engineering.',
    imageUrl: '/portfolio/games/convai-integration.jpg',
    tags: ['Unity', 'C#', 'AI', 'Conversational AI', 'gRPC', 'Speech Recognition'],
    detailsUrl: '/portfolio/convai-integration',
    category: 'Games',
    date: '2023-09-15',
    isHighlighted: true
  },
];
export const highlightedPortfolioItems: PortfolioItem[] = portfolioItems.filter(item => item.isHighlighted);