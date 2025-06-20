import { getPostData, getAllPostSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, ArrowLeft } from 'lucide-react';
import rehypePrettyCode from 'rehype-pretty-code';
import { ProseTerminal } from '@/components/ui/prose-terminal';

// Import individual MDX components directly
import { Card as MdxCard } from '@/components/ui/card'; // Alias to avoid naming conflict
import { Note } from '@/components/ui/mdx/Note';
import { Steps, Step } from '@/components/ui/mdx/Steps';
// Import Lucide icons used within MDX (Corrected: Wrench, Plug)
import { Terminal, Package, Shell, Wrench, Plug } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

// Enable ISR with 1 hour revalidation
export const revalidate = 3600; // Revalidate every hour

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  // Pre-generate only the first 5 most recent posts for faster builds
  // Other posts will be generated on-demand with ISR
  return paths.slice(0, 5).map(path => ({ slug: path.params.slug }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  // Use NEXT_PUBLIC_SITE_URL for base URL if available
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const ogImageUrl = post.imageUrl.startsWith('/') ? `${siteUrl}${post.imageUrl}` : post.imageUrl;


  return {
    metadataBase: new URL(siteUrl), // Set metadataBase
    title: `${post.title} | Rishav Nath Pati Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}`, // Add URL
      images: [{ url: ogImageUrl, alt: post.title }],
      type: 'article',
      publishedTime: post.date,
      authors: ['Rishav Nath Pati'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    },
  };
}

// Helper function
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Type for rehype-pretty-code options
interface PrettyCodeOptions {
  theme: string;
  keepBackground: boolean;
}

// Options for rehype-pretty-code
const prettyCodeOptions: PrettyCodeOptions = {
  theme: 'one-dark-pro', // Or your preferred theme
  keepBackground: true,
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
     notFound();
   }
 
    // Define the components mapping for MDXRemote
    const components = {
      Card: MdxCard, // Use the aliased import
      Note,
      Steps,
      Step,
      // Add Lucide icons used in MDX
      Terminal,
      Package,
      Shell,
      Wrench,
      Plug,
      // Add any other default HTML elements you want to override or style here
      // e.g., img: (props) => <Image {...props} />,
    };
  
    return (
     <div className="container mx-auto px-4 py-16 lg:py-24 max-w-4xl">
      {/* Back Button */}
      <div className="mb-8">
        <Button variant="outline" size="sm" asChild className="font-mono">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
      </div>

      <article>
        {/* Header Section */}
        <header className="mb-10 border-b border-border pb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-mono text-foreground leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4 font-mono">
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
              <Badge key={tag} variant="outline" className="font-mono text-xs">{tag}</Badge>
            ))}
          </div>
        </header>

        {/* MDX Content Area */}
        <ProseTerminal className="
           prose-code:before:content-none prose-code:after:content-none
           prose-pre:my-8 prose-pre:rounded-lg prose-pre:shadow-lg
           prose-img:rounded-lg prose-img:shadow-md">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [], // Add remark plugins if needed
                rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
              },
             }}
             // Pass the correctly defined components object
             components={components}
           />
         </ProseTerminal>
      </article>
    </div>
  );
}
