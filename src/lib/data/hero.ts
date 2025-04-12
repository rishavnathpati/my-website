export interface TypedText {
  text: string;
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
}

export const typedStrings = [
  'a Software Engineer',
  'an Interactive Media Developer @ Convai',
  'a Unity GameDev | 2D | 3D | AR/VR |',
];

export const typedConfig = {
  typeSpeed: 70,
  backSpeed: 50,
  backDelay: 3000,
  startDelay: 1000,
  loop: true,
  smartBackspace: false,
};

export const particleConfig = {
  count: 150,          // Significantly increased particle count to fill the entire screen
  maxSize: 3,
  minSize: 0.8,        // Smaller minimum size for more variety
  maxSpeed: 0.4,       // Slightly reduced for smoother movement
  mouseRadius: 150,    // Increased mouse influence radius
  mouseForce: 0.8,     // Increased mouse repulsion force
  opacity: {
    min: 0.1,
    max: 0.6           // Increased maximum opacity for better visibility
  }
};