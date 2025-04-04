// Sound effect URLs
const SOUNDS = {
  select: '/sounds/select.mp3',
  hover: '/sounds/hover.mp3',
  success: '/sounds/success.mp3',
} as const;

// Sound volume levels
const VOLUMES = {
  select: 0.2,
  hover: 0.1,
  success: 0.3,
} as const;

type SoundType = keyof typeof SOUNDS;

class SoundManager {
  private static instance: SoundManager;
  private audioElements: Map<SoundType, HTMLAudioElement>;
  private enabled: boolean = true;

  private constructor() {
    this.audioElements = new Map();
    
    // Pre-create audio elements
    Object.entries(SOUNDS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.volume = VOLUMES[key as SoundType];
      this.audioElements.set(key as SoundType, audio);
    });
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public play(type: SoundType) {
    if (!this.enabled) return;
    
    const audio = this.audioElements.get(type);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }

  public toggle(enabled: boolean) {
    this.enabled = enabled;
  }
}

export const soundManager = SoundManager.getInstance();