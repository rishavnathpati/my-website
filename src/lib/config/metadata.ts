import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rishav Nath Pati | Game & Interactive Media Developer",
  description: "Portfolio of Rishav Nath Pati, specializing in Unity 3D/2D/AR/VR, C#, and Machine Learning.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: 'Rishav Nath Pati | Game & Interactive Media Developer',
    description: 'Portfolio of Rishav Nath Pati, specializing in Unity 3D/2D/AR/VR, C#, and Machine Learning.',
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
    title: 'Rishav Nath Pati | Game & Interactive Media Developer',
    description: 'Portfolio of Rishav Nath Pati, specializing in Unity 3D/2D/AR/VR, C#, and Machine Learning.',
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