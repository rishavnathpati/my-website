'use client';

import dynamic from 'next/dynamic';

const FloatingParticles = dynamic(() => import("./FloatingParticles"), {
  ssr: false,
  loading: () => null
});

export default function BackgroundEffects() {
  return <FloatingParticles />;
}