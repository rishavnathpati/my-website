import { MessageSquare, Send, Laptop, Phone, MapPin } from 'lucide-react';

export interface ContactInfo {
  icon: typeof MessageSquare;
  text: string;
  isPrimary?: boolean;
}

export const contactInfo: ContactInfo[] = [
  {
    icon: MessageSquare,
    text: "Let's create something amazing together!",
    isPrimary: true
  },
  {
    icon: Laptop,
    text: "Open for: Game Dev, XR, AR/VR, AI Integration, Interactive Media"
  },
  {
    icon: Phone,
    text: "Phone: +91 9123877594"
  },
  {
    icon: MapPin,
    text: "Kalyani, West Bengal, India"
  },
  {
    icon: Send,
    text: "Response Time: < 24 hours"
  }
];