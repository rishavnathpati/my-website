'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { highlightedPortfolioItems } from "@/lib/data/portfolio";
import { ArrowRight, Github, ExternalLink, FolderGit2, GitBranch, Star, GitFork, ChevronDown, ChevronUp } from 'lucide-react';

export function PortfolioHighlights() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-3 mb-6">
            <FolderGit2 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold font-mono text-foreground">
              featured_repos
            </h2>
          </div>

          <div className="bg-black/30 rounded-lg border border-border p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {highlightedPortfolioItems.map((item, index) => {
                const isExpanded = expandedItem === item.slug;
                
                return (
                  <div
                    key={item.slug}
                    className={`bg-black/20 rounded-lg border border-border/50 overflow-hidden ${
                      isExpanded ? 'md:col-span-2' : ''
                    } hover:border-primary/50`}
                  >
                    <div 
                      className="border-b border-border/50 p-4 cursor-pointer"
                      onClick={() => setExpandedItem(isExpanded ? null : item.slug)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            <GitBranch className="w-4 h-4 text-primary" />
                            <h3 className="font-mono text-lg text-foreground hover:text-primary">
                              {item.title}
                            </h3>
                          </div>
                          {/* Changed text color */}
                          <p className={`text-sm text-foreground font-mono ${isExpanded ? '' : 'line-clamp-2'}`}>
                            {item.description}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                           {/* Changed text color */}
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
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-primary" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={isExpanded ? 'block' : 'hidden'}>
                      {isExpanded && (
                        <div className="aspect-video overflow-hidden border-b border-border/50">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            width={400}
                            height={225}
                            className="object-cover w-full h-full"
                            loading="lazy"
                          />
                        </div>
                      )}

                      <div className="p-4">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="font-mono text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <Button variant="ghost" size="sm" asChild className="font-mono text-xs">
                            <Link href={item.detailsUrl || '#'}>
                              view_details.md <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>

                          <div className="flex items-center gap-2">
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
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <Button size="lg" className="font-mono" asChild>
                <Link href="/portfolio">
                  ls -la ./all_projects <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
