'use client';

import { memo, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { BlogPostMeta } from "@/lib/blog";
import { CalendarDays, Clock } from 'lucide-react';

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
    <div className="flex flex-col md:flex-row overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg bg-black/20 border border-border/50 group">
      {/* Image on the left */}
      <div className="p-0 md:w-1/3 lg:w-1/4 flex-shrink-0">
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
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              quality={75}
            />
          </div>
        </Link>
      </div>

      {/* Content on the right */}
      <div className="flex-grow p-5 flex flex-col justify-center">
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
        <h3 className="text-lg font-semibold mb-2 font-mono line-clamp-2 group-hover:text-primary transition-colors">
          <Link 
            href={post.externalUrl || `/blog/${post.slug}`} 
            target={post.externalUrl ? '_blank' : '_self'} 
            rel={post.externalUrl ? 'noopener noreferrer' : ''}
          >
            {post.title}
          </Link>
        </h3>
        <p className="text-foreground mb-4 text-sm line-clamp-2 font-mono">
          {post.excerpt}
        </p>
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
      </div>
    </div>
  );
});

export default BlogCard;