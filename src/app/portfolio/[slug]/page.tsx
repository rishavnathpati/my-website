import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, GitBranch, ExternalLink } from 'lucide-react';
import { portfolioItems } from '@/lib/data/portfolio';
import { ProseTerminal } from '@/components/ui/prose-terminal';

type Props = {
  params: Promise<{ slug: string }>;
};

// Enable ISR with 1 hour revalidation for portfolio items
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  // Pre-generate all portfolio items since there are fewer of them
  return portfolioItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const project = portfolioItems.find(item => item.slug === slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} | Rishav Nath Pati Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.imageUrl, alt: project.title }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.imageUrl],
    },
  };
}

export default async function PortfolioDetailPage(props: Props) {
  const { slug } = await props.params;
  const project = portfolioItems.find(item => item.slug === slug);

  if (!project) {
    notFound();
  }

  // Get related projects (same category, excluding current project)
  const relatedProjects = portfolioItems
    .filter(item => item.category === project.category && item.slug !== project.slug)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
          </Link>
        </Button>
      </div>

       <article className="max-w-4xl mx-auto">
         <header className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-mono text-foreground">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="font-mono text-xs">
                  {tag}
                </Badge>
             ))}
           </div>
         </header>

         <div className="aspect-video relative mb-8 rounded-lg overflow-hidden border border-border">
           <Image
             src={project.imageUrl}
             alt={project.title}
             fill
             className="object-cover"
             priority
             placeholder="blur"
             blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>

          <ProseTerminal className="mb-8">
            <p>{project.description}</p>
          </ProseTerminal>

         <div className="flex flex-wrap gap-4 mb-12">
           {project.githubUrl && (
             <Button asChild className="font-mono">
               <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                 <GitBranch className="mr-2 h-5 w-5" /> View on GitHub
               </a>
             </Button>
           )}
           {project.liveUrl && (
             <Button variant="outline" asChild className="font-mono">
               <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                 <ExternalLink className="mr-2 h-5 w-5" /> Live Demo
               </a>
            </Button>
          )}
        </div>

         {relatedProjects.length > 0 && (
           <section className="border-t border-border pt-12">
             <h2 className="text-2xl font-bold mb-6 font-mono">Related Projects</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {relatedProjects.map((item) => (
                <Link
                  key={item.slug}
                  href={`/portfolio/${item.slug}`}
                  className="group block"
                >
                  <div className="aspect-video relative rounded-lg overflow-hidden border border-border mb-3">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     />
                   </div>
                   <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors font-mono">
                     {item.title}
                   </h3>
                   <p className="text-sm text-foreground line-clamp-2 font-mono">
                     {item.description}
                   </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
