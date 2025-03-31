import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSortedPostsData } from "@/lib/blog";
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export function BlogHighlights() {
  const recentPosts = getSortedPostsData().slice(0, 3);

  return (
    <section id="blogs" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-raleway text-foreground">
            From the Blog
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Sharing insights and experiences from my journey in game development, interactive media, and technology exploration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <Card
              key={post.slug}
              className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg dark:bg-neutral-800/50 group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
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
                      loading="lazy"
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

        <div className="text-center mt-12 lg:mt-16">
          <Button size="lg" asChild>
            <Link href="/blog">
              Visit Blog <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 