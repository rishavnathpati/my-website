import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rishav Nath Pati | AI NPCs, Speech & VR in Unity",
  description: "I build AI-driven NPCs, speech systems, and VR experiences inside Unity — here are the tools, experiments, and notes behind that work.",
  // viewport moved to separate export for Next.js 15 compatibility
  openGraph: {
    title: 'Rishav Nath Pati | AI NPCs, Speech & VR in Unity',
    description: 'I build AI-driven NPCs, speech systems, and VR experiences inside Unity — here are the tools, experiments, and notes behind that work.',
    url: '/',
    siteName: 'Rishav Nath Pati Portfolio',
    images: [
      {
        url: '/profile-img.jpg',
        width: 800,
        height: 800,
        alt: 'Rishav Nath Pati',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rishav Nath Pati | AI NPCs, Speech & VR in Unity',
    description: 'I build AI-driven NPCs, speech systems, and VR experiences inside Unity — here are the tools, experiments, and notes behind that work.',
    images: ['/profile-img.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

// Separate viewport export for Next.js 15 compatibility
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};
