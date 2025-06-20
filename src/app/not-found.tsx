import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Rishav Nath Pati',
  description: "Oops! The page you're looking for doesn't seem to exist.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4 lg:ml-[300px]">
      <div className="max-w-md">
        <h1 className="text-6xl md:text-9xl font-bold text-primary mb-4 font-raleway">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground font-poppins">
          Page Not Found
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Sorry, we couldn&apos;t find the page you were looking for. It might have been moved, deleted, or maybe it never existed.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" /> Go Back Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/portfolio">
              <Search className="mr-2 h-5 w-5" /> Explore Portfolio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 