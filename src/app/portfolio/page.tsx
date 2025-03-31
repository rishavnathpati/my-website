import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { portfolioItems } from "@/lib/data/portfolio";
import { ArrowRight, Github, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portfolio | Rishav Nath Pati',
  description: 'Explore the full portfolio of games, machine learning projects, and publications by Rishav Nath Pati.',
};

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-raleway text-foreground">
          My Portfolio
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
          A collection of projects demonstrating my skills across game development, machine learning, interactive media, and research.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item, index) => (
          <Card
            key={item.slug}
            className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg dark:bg-neutral-800/50 group"
          >
            <CardHeader className="p-0">
              <Link href={item.detailsUrl ?? '#'} aria-label={`View details for ${item.title}`}>
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={600}
                    height={338}
                    className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </Link>
            </CardHeader>
            <CardContent className="flex-grow p-5">
              <CardTitle className="text-xl font-semibold mb-2 font-poppins group-hover:text-primary transition-colors">
                <Link href={item.detailsUrl ?? '#'}>
                  {item.title}
                </Link>
              </CardTitle>
              <CardDescription className="text-muted-foreground mb-4 text-sm line-clamp-3">
                {item.description}
              </CardDescription>
              <div className="flex flex-wrap gap-2">
                {item.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 4 && <Badge variant="outline">...</Badge>}
              </div>
            </CardContent>
            <CardFooter className="p-5 bg-muted/30 dark:bg-neutral-800/30 border-t border-border flex justify-between items-center">
              {item.detailsUrl ? (
                <Button variant="ghost" size="sm" asChild>
                  <Link href={item.detailsUrl} className="text-sm">
                    Details <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              ) : <div></div>}
              <div className="flex items-center space-x-2">
                {item.githubUrl && (
                  <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                    <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {item.liveUrl && (
                  <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                    <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 