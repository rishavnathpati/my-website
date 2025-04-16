import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { BlogPostMeta } from "@/lib/blog";
import { ArrowRight, BookOpen, Terminal } from 'lucide-react';
import BlogCard from './blog/BlogCard';

interface BlogHighlightsProps {
  recentPosts: BlogPostMeta[];
}

function BlogHighlightsComponent({ recentPosts }: BlogHighlightsProps) {
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
              {recentPosts.map((post) => (
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

export const BlogHighlights = BlogHighlightsComponent;
