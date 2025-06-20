import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
 import { getSortedPostsData } from '@/lib/blog';
 import { Suspense } from 'react'; // Re-import Suspense
 import { BlogCardSkeleton } from '@/components/BlogCardSkeleton';
 import {
   Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock } from 'lucide-react';

// Helper function (can be moved to utils if needed)
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Define the BlogGrid component containing the mapping logic
function BlogGrid() {
  const allPosts = getSortedPostsData();

  if (allPosts.length === 0) {
    return <p className="text-center text-foreground font-mono">No blog posts found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {allPosts.map((post, index) => (
        <Card
          key={post.slug}
          className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg bg-black/30 border border-border group" // Added border
        >
          <CardHeader className="p-0">
            <Link href={post.externalUrl || `/blog/${post.slug}`} target={post.externalUrl ? '_blank' : '_self'} rel={post.externalUrl ? 'noopener noreferrer' : ''} aria-label={`Read more about ${post.title}`}>
              <div className="aspect-video overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={`Thumbnail for ${post.title}`}
                  width={600}
                  height={338}
                  className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                  priority={index < 3} // Priority loading for first 3 images (above the fold)
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  sizes="(max-width:768px) 100vw,
                         (max-width:1200px) 50vw,
                         33vw"
                />
              </div>
            </Link>
          </CardHeader>
          <CardContent className="flex-grow p-5">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2 font-mono"> {/* Keep date/time muted, add mono */}
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" /> {formatDate(post.date)}
              </span>
              {post.readTimeMinutes && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {post.readTimeMinutes} min read
                </span>
              )}
            </div>
            {/* Use font-mono, text-foreground */}
            <CardTitle className="text-xl font-semibold mb-2 font-mono line-clamp-2 group-hover:text-primary transition-colors">
              <Link href={post.externalUrl || `/blog/${post.slug}`} target={post.externalUrl ? '_blank' : '_self'} rel={post.externalUrl ? 'noopener noreferrer' : ''}>
                {post.title}
              </Link>
            </CardTitle>
            {/* Use font-mono, text-foreground */}
            <CardDescription className="text-foreground mb-4 text-sm line-clamp-3 font-mono">
              {post.excerpt}
            </CardDescription>
            <div className="flex flex-wrap gap-2">
              {/* Use outline variant, font-mono */}
              {post.tags?.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="font-mono text-xs">{tag}</Badge>
              ))}
              {post.tags && post.tags.length > 3 && <Badge variant="outline" className="font-mono text-xs">...</Badge>}
            </div>
          </CardContent>
          {/* No CardFooter needed */}
        </Card>
      ))}
    </div>
   );
 }
 
 // Fallback component displaying multiple skeletons
 function BlogSkeletonFallback() {
   return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       {Array.from({ length: 6 }).map((_, index) => (
         <BlogCardSkeleton key={index} />
       ))}
     </div>
   );
 }
export const metadata: Metadata = {
  title: 'Blog | Rishav Nath Pati',
  description: 'Read articles and insights on game development, interactive media, AI, and technology by Rishav Nath Pati.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};


export default function BlogListPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
        {/* Use font-mono, text-foreground */}
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-mono text-foreground">
          Blog Posts
        </h1>
        {/* Use font-mono, text-foreground */}
        <p className="text-lg lg:text-xl text-foreground leading-relaxed font-mono">
          Exploring ideas and sharing knowledge on topics I&apos;m passionate about.
       </p>
       </div>
 
       {/* Re-add Suspense wrapper */}
       <Suspense fallback={<BlogSkeletonFallback />}>
         <BlogGrid />
       </Suspense>
     </div>
   );
}
