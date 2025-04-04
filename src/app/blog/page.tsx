import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/blog';
import { Suspense } from 'react'; // Import Suspense
import { BlogCardSkeleton } from '@/components/BlogCardSkeleton'; // Import Skeleton
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock } from 'lucide-react';

// Define the BlogGrid component containing the mapping logic
function BlogGrid() {
  const allPosts = getSortedPostsData();

  if (allPosts.length === 0) {
    return <p className="text-center text-muted-foreground">No blog posts found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {allPosts.map((post) => (
        <Card
          key={post.slug}
          className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg bg-neutral-800/50 group"
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
                  loading="lazy" // Keep lazy loading for blog list images
                />
              </div>
            </Link>
          </CardHeader>
          <CardContent className="flex-grow p-5">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" /> {formatDate(post.date)}
              </span>
              {post.readTimeMinutes && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {post.readTimeMinutes} min read
                </span>
              )}
            </div>
            <CardTitle className="text-xl font-semibold mb-2 font-poppins line-clamp-2 group-hover:text-primary transition-colors">
              <Link href={post.externalUrl || `/blog/${post.slug}`} target={post.externalUrl ? '_blank' : '_self'} rel={post.externalUrl ? 'noopener noreferrer' : ''}>
                {post.title}
              </Link>
            </CardTitle>
            <CardDescription className="text-muted-foreground mb-4 text-sm line-clamp-3">
              {post.excerpt}
            </CardDescription>
            <div className="flex flex-wrap gap-2">
              {post.tags?.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
              {post.tags && post.tags.length > 3 && <Badge variant="outline">...</Badge>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Blog | Rishav Nath Pati',
  description: 'Read articles and insights on game development, interactive media, AI, and technology by Rishav Nath Pati.',
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function BlogListPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-raleway text-foreground">
          Blog Posts
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
          Exploring ideas and sharing knowledge on topics I'm passionate about.
        </p>
      </div>

      {/* Wrap the grid in Suspense */}
      <Suspense fallback={<BlogSkeletonFallback />}>
        <BlogGrid />
      </Suspense>
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