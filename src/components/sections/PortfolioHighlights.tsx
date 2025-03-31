import Link from 'next/link';
import Image from 'next/image';
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
import { highlightedPortfolioItems } from "@/lib/data/portfolio";
import { ArrowRight, Github, ExternalLink } from 'lucide-react';

export function PortfolioHighlights() {
  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-secondary/30 dark:bg-neutral-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-raleway text-foreground">
            Featured Projects
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            A glimpse into some of the projects I've worked on, showcasing skills in game development, machine learning, and interactive experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlightedPortfolioItems.map((item, index) => (
            <Card
              key={item.slug}
              className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg dark:bg-neutral-800/50"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CardHeader className="p-0">
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
              </CardHeader>
              <CardContent className="flex-grow p-5">
                <CardTitle className="text-xl font-semibold mb-2 font-poppins">{item.title}</CardTitle>
                <CardDescription className="text-muted-foreground mb-4 text-sm line-clamp-3">
                  {item.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {item.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-5 bg-muted/30 dark:bg-neutral-800/30 border-t border-border flex justify-between items-center">
                {item.detailsUrl ? (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={item.detailsUrl} className="text-sm">
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
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

        <div className="text-center mt-12 lg:mt-16">
          <Button size="lg" asChild>
            <Link href="/portfolio">
              View All Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 