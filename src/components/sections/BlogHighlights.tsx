import Link from 'next/link';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSortedPostsData } from "@/lib/blog";
import { ArrowRight, CalendarDays, Clock, BookOpen, Terminal } from 'lucide-react'; // Removed FileText as it's not used in CardTitle
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Import Card components

// Helper function (can be moved to utils if needed)
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export function BlogHighlights() {
  // Fetch only the 3 most recent posts
  const recentPosts = getSortedPostsData().slice(0, 3);

  return (
    <section id="blogs" className="py-20 lg:py-28 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-12">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold font-mono text-foreground">
              tech_blog.md
            </h2>
          </div>

          {/* Main Content Card */}
          <div className="bg-black/30 rounded-lg border border-border p-6">
            <div className="flex items-center gap-2 mb-6 text-muted-foreground">
              <Terminal size={18} />
              <span className="font-mono text-sm">cat recent_posts/</span>
            </div>

            {/* Grid for Blog Post Cards */}
            <div className="grid grid-cols-1 gap-6"> {/* Changed to single column grid for highlights */}
              {recentPosts.map((post) => (
                <Card
                  key={post.slug}
                  className="flex flex-col md:flex-row overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg bg-black/20 border border-border/50 group" // Use bg-black/20 like portfolio highlights items
                >
                  {/* Image on the left (or top on small screens) */}
                  <CardHeader className="p-0 md:w-1/3 lg:w-1/4 flex-shrink-0">
                    <Link href={post.externalUrl || `/blog/${post.slug}`} target={post.externalUrl ? '_blank' : '_self'} rel={post.externalUrl ? 'noopener noreferrer' : ''} aria-label={`Read more about ${post.title}`}>
                      <div className="aspect-video md:aspect-square overflow-hidden h-full">
                        <Image
                          src={post.imageUrl}
                          alt={`Thumbnail for ${post.title}`}
                          width={300} // Adjusted size for highlight view
                          height={300}
                          className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    </Link>
                  </CardHeader>

                  {/* Content on the right */}
                  <CardContent className="flex-grow p-5 flex flex-col justify-center">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2 font-mono">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" /> {formatDate(post.date)}
                      </span>
                      {post.readTimeMinutes && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> {post.readTimeMinutes} min read
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-lg font-semibold mb-2 font-mono line-clamp-2 group-hover:text-primary transition-colors"> {/* Adjusted size */}
                      <Link href={post.externalUrl || `/blog/${post.slug}`} target={post.externalUrl ? '_blank' : '_self'} rel={post.externalUrl ? 'noopener noreferrer' : ''}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-foreground mb-4 text-sm line-clamp-2 font-mono"> {/* Changed color, adjusted clamp */}
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mt-auto pt-2"> {/* Added mt-auto to push tags down */}
                      {post.tags?.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="font-mono text-xs">{tag}</Badge>
                      ))}
                      {post.tags && post.tags.length > 3 && <Badge variant="outline" className="font-mono text-xs">...</Badge>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* View All Button */}
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
