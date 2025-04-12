import { getPostData, getAllPostSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image'; // Import Image
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
 import { CalendarDays, Clock, ArrowLeft } from 'lucide-react';
 import rehypePrettyCode from 'rehype-pretty-code';
 
 // Import individual MDX components directly
  import { Card as MdxCard } from '@/components/ui/mdx/Card'; // Alias to avoid naming conflict
  import { Note } from '@/components/ui/mdx/Note';
  import { Steps, Step } from '@/components/ui/mdx/Steps';
  // Import Lucide icons used within MDX (Corrected: Wrench, Plug)
  import { Terminal, Package, Shell, Wrench, Plug } from 'lucide-react';
  
  type Props = {
  params: { slug: string };
};

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  // Ensure the returned format matches { slug: string }[]
  return paths.map(path => ({ slug: path.params.slug }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostData(params.slug);

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
      url: `/blog/${params.slug}`, // Add URL
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

// Options for rehype-pretty-code
const prettyCodeOptions = {
  theme: 'one-dark-pro', // Or your preferred theme
  keepBackground: true,
};

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostData(params.slug);

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
        <div className="prose prose-invert max-w-none prose-neutral prose-lg
           prose-headings:font-mono /* Apply mono to headings */
           prose-p:font-mono /* Apply mono to paragraphs */
           prose-li:font-mono /* Apply mono to list items */
           prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80
           prose-code:before:content-none prose-code:after:content-none /* Rely on global styles for code */
           prose-pre:my-8 prose-pre:rounded-lg prose-pre:shadow-lg /* Rely on global styles for pre */
           prose-img:rounded-lg prose-img:shadow-md
           prose-blockquote:border-l-4 prose-blockquote:border-primary/50
           prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:font-mono /* Apply mono */
           prose-strong:font-semibold prose-strong:text-foreground
           prose-em:italic prose-em:text-foreground">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [], // Add remark plugins if needed
                rehypePlugins: [[rehypePrettyCode, prettyCodeOptions] as any],
              },
             }}
             // Pass the correctly defined components object
             components={components}
           />
         </div>
      </article>
    </div>
  );
}
