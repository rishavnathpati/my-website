  // No 'use client' directive needed here

import { HeroSection } from '@/components/sections/HeroSection';
import { AnimatedSections } from '@/components/sections/AnimatedSections'; // Import the new client component
import { getSortedPostsData } from '@/lib/blog'; // Import data fetching function
// Removed individual section imports as they are now handled by AnimatedSections

export default function Home() {
  // Fetch recent posts data here
  const recentPosts = getSortedPostsData().slice(0, 3);

  return (
    <div className="flex flex-col">
      <HeroSection />
      {/* Render all animated sections via the client component, passing posts data */}
      <AnimatedSections recentPosts={recentPosts} />

      {/* Add padding below the last section */}
      <div className="h-20"></div>
    </div>
  );
}
