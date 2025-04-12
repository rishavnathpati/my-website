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

export async function generateMetadata(props: Props): Promise<Metadata> {
  const post = await getPostData(props.params.slug);

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
  theme: 'github-dark',
  keepBackground: true,
  defaultLang: 'plaintext',
  onVisitLine(node: any) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className.push('highlighted');
  },
  onVisitHighlightedWord(node: any) {
    node.properties.className = ['word'];
  },
};

export default async function BlogPostPage(props: Props) {
  const post = await getPostData(props.params.slug);

  if (!post) {
    notFound();
  }

  const components = {
    pre: ({ children, ...props }: React.ComponentProps<'pre'>) => (
      <div className="relative">
        <pre className="overflow-x-auto rounded-lg border bg-neutral-900 py-4 px-2" {...props}>
          {children}
        </pre>
      </div>
    ),
    code: ({ children, ...props }: React.ComponentProps<'code'>) => (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm" {...props}>
        {children}
      </code>
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
          {/* Changed font to font-mono */}
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-mono text-foreground leading-tight">
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

        <div className="prose prose-invert max-w-none prose-neutral prose-lg
          prose-headings:font-semibold /* Using prose-invert by default since we're in forced dark mode */
          prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
          prose-p:mb-4 prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80
          /* Adjusted code and pre backgrounds/borders for theme consistency */
          prose-code:before:content-none prose-code:after:content-none prose-code:bg-black/30 prose-code:px-2 prose-code:py-0.5 prose-code:rounded 
          prose-pre:my-8 prose-pre:bg-black/20 prose-pre:border prose-pre:border-border 
          prose-pre:rounded-lg prose-pre:shadow-lg
          prose-img:rounded-lg prose-img:shadow-md
          prose-blockquote:border-l-4 prose-blockquote:border-primary/50
          prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
          prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6
          prose-li:mb-2 prose-li:pl-2
          prose-strong:font-semibold prose-strong:text-foreground
          prose-em:italic prose-em:text-foreground">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                rehypePlugins: [[rehypePrettyCode, {
                  theme: 'one-dark-pro',
                  keepBackground: true,
                  defaultLang: 'plaintext',
                  grid: true,
                }] as any],
              },
            }}
            components={components}
          />
        </div>
      </article>
    </div>
  );
}
