'use client';

import { memo, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPostMeta } from "@/lib/blog";
import { ArrowRight, CalendarDays, Clock, BookOpen, Terminal } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Helper function
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Memoized BlogCard component
const BlogCard = memo(function BlogCard({ post }: { post: BlogPostMeta }) {
  // Memoize the formatted date
  const formattedDate = useMemo(() => formatDate(post.date), [post.date]);
  
  return (
    <Card className="flex flex-col md:flex-row overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg bg-black/20 border border-border/50 group">
      {/* Image on the left */}
      <CardHeader className="p-0 md:w-1/3 lg:w-1/4 flex-shrink-0">
        <Link 
          href={post.externalUrl || `/blog/${post.slug}`} 
          target={post.externalUrl ? '_blank' : '_self'} 
          rel={post.externalUrl ? 'noopener noreferrer' : ''} 
          aria-label={`Read more about ${post.title}`}
        >
          <div className="aspect-video md:aspect-square overflow-hidden h-full">
            <Image
              src={post.imageUrl}
              alt={`Thumbnail for ${post.title}`}
              width={300}
              height={300}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={75}
            />
          </div>
        </Link>
      </CardHeader>

      {/* Content on the right */}
      <CardContent className="flex-grow p-5 flex flex-col justify-center">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2 font-mono">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5" /> {formattedDate}
          </span>
          {post.readTimeMinutes && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {post.readTimeMinutes} min read
            </span>
          )}
        </div>
        <CardTitle className="text-lg font-semibold mb-2 font-mono line-clamp-2 group-hover:text-primary transition-colors">
          <Link 
            href={post.externalUrl || `/blog/${post.slug}`} 
            target={post.externalUrl ? '_blank' : '_self'} 
            rel={post.externalUrl ? 'noopener noreferrer' : ''}
          >
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-foreground mb-4 text-sm line-clamp-2 font-mono">
          {post.excerpt}
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {post.tags?.slice(0, 3).map((tag: string) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="font-mono text-xs transition-colors hover:bg-primary/10"
            >
              {tag}
            </Badge>
          ))}
          {post.tags && post.tags.length > 3 && (
            <Badge 
              variant="outline" 
              className="font-mono text-xs transition-colors hover:bg-primary/10"
            >
              ...
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

interface BlogHighlightsProps {
  recentPosts: BlogPostMeta[];
}

function BlogHighlightsComponent({ recentPosts }: BlogHighlightsProps) {
  // Memoize posts to prevent unnecessary re-renders
  const memoizedPosts = useMemo(() => recentPosts, [recentPosts]);

  return (
    <section id="blogs" className="py-20 lg:py-28 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-12">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6 group">
            <BookOpen className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold font-mono text-foreground group-hover:text-primary transition-colors">
              blog
            </h2>
          </div>

          {/* Main Content Card */}
          <div className="bg-black/30 rounded-lg border border-border p-6 hover:border-primary/50 transition-colors">
            {/* Primary terminal command */}
            <div className="flex items-center gap-2 mb-6 text-muted-foreground group">
              <Terminal size={18} className="group-hover:text-primary transition-colors" />
              <span className="font-mono text-sm group-hover:text-primary transition-colors">$ cat tech_blog.md</span>
            </div>
            
            {/* Secondary terminal command */}
            <div className="flex items-center gap-2 mb-6 text-muted-foreground group">
              <Terminal size={18} className="group-hover:text-primary transition-colors" />
              <span className="font-mono text-sm group-hover:text-primary transition-colors">$ ls recent_posts/</span>
            </div>

            {/* Grid for Blog Post Cards */}
            <div className="grid grid-cols-1 gap-6">
              {memoizedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-8 text-center">
              <Button 
                size="lg" 
                className="font-mono transition-transform hover:scale-105" 
                asChild
              >
                <Link href="/blog">
                  $ cd ./all_posts <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Export memoized component
export const BlogHighlights = memo(BlogHighlightsComponent);
