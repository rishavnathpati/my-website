import { useState, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { highlightedPortfolioItems } from "@/lib/data/portfolio";
import { ArrowRight, Github, ExternalLink, FolderGit2, GitBranch, Star, GitFork, ChevronDown, ChevronUp, Terminal } from 'lucide-react';

// Memoized portfolio card component
const PortfolioCard = memo(function PortfolioCard({ 
  item, 
  isExpanded, 
  onToggle 
}: { 
  item: typeof highlightedPortfolioItems[0];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <Card
      className={`overflow-hidden transition-all duration-300 ${
        isExpanded ? 'md:col-span-2' : ''
      } hover:border-primary/50 bg-black/20 border-border/50`}
    >
      <div
        className="border-b border-border/50 cursor-pointer transition-colors hover:bg-black/30"
        onClick={onToggle}
      >
        <CardHeader className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="w-4 h-4 text-primary" />
                <CardTitle className="font-mono text-lg text-foreground hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
              </div>
              <CardDescription className={`text-sm text-foreground font-mono transition-all duration-300 ${
                isExpanded ? 'line-clamp-none' : 'line-clamp-2'
              }`}>
                {item.description}
              </CardDescription>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-3 text-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-mono">24</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4" />
                  <span className="text-sm font-mono">8</span>
                </div>
              </div>
              <div className="transition-transform duration-300">
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-primary" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </div>

      {/* Expandable content with smooth height transition */}
      <div
        className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="aspect-video overflow-hidden border-b border-border/50">
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={800}
            height={450}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            quality={75}
          />
        </div>
        <CardContent className="p-4 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed font-mono">
            {item.description}
          </p>

          {item.highlights && (
            <ul className="space-y-2 text-sm text-foreground font-mono list-disc pl-5">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="marker:text-primary/80">
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            {item.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="font-mono text-xs transition-colors hover:bg-primary/10"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="font-mono text-xs hover:bg-primary/10"
          >
            <Link href={item.detailsUrl || '#'}>
              view_details.md <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            {item.githubUrl && (
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 transition-colors hover:border-primary"
                asChild
              >
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
            {item.liveUrl && (
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 transition-colors hover:border-primary"
                asChild
              >
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live Demo"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
});

function PortfolioHighlightsComponent() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  // Use data directly - these are static imports that don't change

  return (
    <section id="portfolio-highlights" className="py-20 lg:py-28 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-3 mb-6">
            <FolderGit2 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold font-mono text-foreground">
              portfolio
            </h2>
          </div>

          <div className="bg-black/30 rounded-lg border border-border p-6">
            {/* Terminal-like header */}
            <div className="flex items-center gap-2 mb-6 text-muted-foreground group">
              <Terminal size={18} className="group-hover:text-primary transition-colors" />
              <span className="font-mono text-sm group-hover:text-primary transition-colors">$ ls featured_repos</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {highlightedPortfolioItems.map((item) => (
                <PortfolioCard
                  key={item.slug}
                  item={item}
                  isExpanded={expandedItem === item.slug}
                  onToggle={() => setExpandedItem(expandedItem === item.slug ? null : item.slug)}
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button 
                size="lg" 
                className="font-mono transition-transform hover:translate-x-1" 
                asChild
              >
                <Link href="/portfolio">
                  $ cd ./all_projects <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Keep the PortfolioCard memoized as it's used in a list and has complex rendering
// But the parent component doesn't need memoization since it has its own state management
export const PortfolioHighlights = PortfolioHighlightsComponent;
