import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { portfolioItems } from '@/lib/data/portfolio';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return portfolioItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const project = portfolioItems.find(item => item.slug === props.params.slug);

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
  const project = portfolioItems.find(item => item.slug === props.params.slug);

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
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-raleway text-foreground">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
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
          />
        </div>

        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          {project.githubUrl && (
            <Button asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" /> View on GitHub
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button variant="outline" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-5 w-5" /> Live Demo
              </a>
            </Button>
          )}
        </div>

        {relatedProjects.length > 0 && (
          <section className="border-t border-border pt-12">
            <h2 className="text-2xl font-bold mb-6 font-raleway">Related Projects</h2>
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
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
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