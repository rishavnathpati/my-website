import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Suspense } from 'react'; // Import Suspense
 import { PortfolioCardSkeleton } from '@/components/PortfolioCardSkeleton'; // Import Skeleton
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
import { ArrowRight, GitBranch, ExternalLink } from 'lucide-react';

// Define the PortfolioGrid component containing the mapping logic
 function PortfolioGrid() {
   return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       {portfolioItems.map((item, index) => (
         <Card
           key={item.slug}
           className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg bg-black/30 border border-border group"
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
                  priority={index < 3} // Priority loading for first 3 images (above the fold)
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  sizes="(max-width:768px) 100vw,
                         (max-width:1200px) 50vw,
                         33vw"
                />
              </div>
             </Link>
           </CardHeader>
           <CardContent className="flex-grow p-5">
             {/* Changed font */}
             <CardTitle className="text-xl font-semibold mb-2 font-mono group-hover:text-primary transition-colors">
               <Link href={item.detailsUrl ?? '#'}>
                 {item.title}
              </Link>
            </CardTitle>
            {/* Changed font and text color */}
            <CardDescription className="text-foreground mb-4 text-sm line-clamp-3 font-mono">
              {item.description}
             </CardDescription>
             <div className="flex flex-wrap gap-2">
               {item.tags.slice(0, 4).map((tag) => (
                 /* Changed variant and added font */
                 <Badge key={tag} variant="outline" className="font-mono text-xs">
                   {tag}
                 </Badge>
               ))}
               {/* Changed variant and added font */}
               {item.tags.length > 4 && <Badge variant="outline" className="font-mono text-xs">...</Badge>}
             </div>
           </CardContent>
           <CardFooter className="p-5 bg-black/30 border-t border-border flex justify-between items-center">
             {item.detailsUrl ? (
               <Button variant="ghost" size="sm" asChild>
                 {/* Added font-mono */}
                 <Link href={item.detailsUrl} className="text-sm font-mono">
                   Details <ArrowRight className="ml-1 h-4 w-4" />
                 </Link>
              </Button>
            ) : <div></div>}
            <div className="flex items-center space-x-2">
              {item.githubUrl && (
                <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                  <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                    <GitBranch className="h-4 w-4" />
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
  );
}

export const metadata: Metadata = {
  title: 'Portfolio | Rishav Nath Pati',
  description: 'Explore the full portfolio of games, machine learning projects, and publications by Rishav Nath Pati.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

 export default function PortfolioPage() {
   return (
     <div className="container mx-auto px-4 py-16 lg:py-24">
       <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
         {/* Changed font */}
         <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-mono text-foreground">
           My Portfolio
         </h1>
         {/* Changed font and text color */}
         <p className="text-lg lg:text-xl text-foreground leading-relaxed font-mono">
           A collection of projects demonstrating my skills across game development, machine learning, interactive media, and research.
         </p>
      </div>

      {/* Wrap the grid in Suspense */}
      <Suspense fallback={<PortfolioSkeletonFallback />}>
        <PortfolioGrid />
      </Suspense>
    </div>
  );
}

// Fallback component displaying multiple skeletons
function PortfolioSkeletonFallback() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <PortfolioCardSkeleton key={index} />
      ))}
    </div>
  );
}
