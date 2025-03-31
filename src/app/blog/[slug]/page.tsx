import { getPostData, getAllPostSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, ArrowLeft } from 'lucide-react';
import rehypePrettyCode from 'rehype-pretty-code';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostData(params.slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Rishav Nath Pati Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.imageUrl, alt: post.title }],
      type: 'article',
      publishedTime: post.date,
      authors: ['Rishav Nath Pati'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const options = {
  theme: 'one-dark-pro',
  keepBackground: true,
};

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  const components = {
    pre: (props: React.ComponentProps<'pre'>) => (
      <pre className="!bg-neutral-900 dark:!bg-neutral-900" {...props} />
    ),
  };

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24 max-w-4xl">
      <div className="mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
      </div>

      <article>
        <header className="mb-10 border-b border-border pb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-raleway text-foreground leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" /> {formatDate(post.date)}
            </span>
            {post.readTimeMinutes && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {post.readTimeMinutes} min read
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </header>

        <div className="prose dark:prose-invert max-w-none prose-neutral prose-lg
                      prose-headings:font-raleway prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-primary/80
                      prose-code:before:content-none prose-code:after:content-none prose-code:font-mono prose-code:bg-muted prose-code:text-foreground prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm
                      prose-pre:bg-muted prose-pre:text-foreground prose-pre:p-4 prose-pre:rounded-lg prose-pre:border
                      dark:prose-pre:bg-neutral-800/50 dark:prose-pre:border-neutral-700">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                rehypePlugins: [[rehypePrettyCode, options] as any],
              },
            }}
            components={components}
          />
        </div>
      </article>
    </div>
  );
} 