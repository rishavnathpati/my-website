import Link from 'next/link';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSortedPostsData } from "@/lib/blog";
import { ArrowRight, CalendarDays, Clock, FileText, Terminal, BookOpen } from 'lucide-react';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export function BlogHighlights() {
  const recentPosts = getSortedPostsData().slice(0, 3);

  return (
    <section id="blogs" className="py-20 lg:py-28 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold font-mono text-foreground">
              tech_blog.md
            </h2>
          </div>

          <div className="bg-black/30 rounded-lg border border-border p-6">
            <div className="flex items-center gap-2 mb-6 text-muted-foreground">
              <Terminal size={18} />
              <span className="font-mono text-sm">cat recent_posts/</span>
            </div>

            <div className="space-y-6">
              {recentPosts.map((post, index) => (
                <div
                  key={post.slug}
                  className="bg-black/20 rounded-lg border border-border/50 overflow-hidden hover:border-primary/50"
                >
                  <div className="border-b border-border/50 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-4 h-4 text-primary" />
                      <Link
                        href={post.externalUrl || `/blog/${post.slug}`}
                        target={post.externalUrl ? '_blank' : '_self'}
                        rel={post.externalUrl ? 'noopener noreferrer' : ''}
                        className="font-mono text-lg text-foreground hover:text-primary"
                      >
                        {post.title}
                      </Link>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3 font-mono">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" /> {formatDate(post.date)}
                      </span>
                      {post.readTimeMinutes && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> ~{post.readTimeMinutes}min
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground font-mono line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="aspect-video overflow-hidden border-b border-border/50">
                    <Image
                      src={post.imageUrl}
                      alt={`Thumbnail for ${post.title}`}
                      width={400}
                      height={225}
                      className="object-cover w-full h-full"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tags?.map((tag) => (
                        <Badge key={tag} variant="outline" className="font-mono text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button size="lg" className="font-mono" asChild>
                <Link href="/blog">
                  cd ./all_posts <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}