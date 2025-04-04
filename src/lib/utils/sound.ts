'use client';

// Sound effect URLs - commented out since files don't exist
// Loading disabled to prevent 404 errors
const SOUNDS = {
  select: '',  // '/sounds/select.mp3',
  hover: '',   // '/sounds/hover.mp3',
  success: '', // '/sounds/success.mp3',
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
  private initialized: boolean = false;

  private constructor() {
    this.audioElements = new Map();
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private initialize() {
    if (this.initialized || typeof window === 'undefined') return;
    
    // Skip initialization since we don't have sound files
    this.initialized = true;
    
    // Commented out to prevent 404 errors
    /*
    Object.entries(SOUNDS).forEach(([key, url]) => {
      if (!url) return; // Skip empty URLs
      try {
        const audio = new window.Audio(url);
        audio.volume = VOLUMES[key as SoundType];
        this.audioElements.set(key as SoundType, audio);
      } catch (e) {
        console.debug(`Failed to load sound: ${key}`);
      }
    });
    */
  }

  public play(type: SoundType) {
    // No-op function since sounds are disabled
    // This way components can still call soundManager.play() without errors
    return;
  }

  public toggle(enabled: boolean) {
    this.enabled = enabled;
  }
}

export const soundManager = SoundManager.getInstance();