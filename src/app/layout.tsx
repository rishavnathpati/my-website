import { Suspense } from "react";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { KonamiCode } from "@/components/easter-eggs/KonamiCode";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SkipLink } from "@/components/SkipLink";
import { ConsoleProvider } from "@/components/ui/console-provider";
import { siteMetadata } from "@/lib/config/metadata";

// Configure fonts
const fontSans = GeistSans;
const fontMono = GeistMono;

// Export metadata
export const metadata = siteMetadata;

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${fontSans.variable} ${fontMono.variable}`} 
      suppressHydrationWarning
    >
      <head />
      <body className="font-sans bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <Suspense fallback={<LoadingFallback />}>
              <ConsoleProvider>
                {/* Accessibility */}
                <SkipLink />

                {/* Navigation */}
                <Header />

                {/* Utility components */}
                <Suspense fallback={null}>
                  <ScrollToTop />
                </Suspense>

                {/* Main content */}
                <main 
                  id="main" 
                  className="lg:ml-[300px] relative z-[2]" 
                  tabIndex={-1}
                >
                  {children}
                  <Footer />
                </main>

                {/* Analytics and utilities */}
                <Suspense fallback={null}>
                  <Analytics />
                </Suspense>
                <Toaster />
                
                {/* Development utilities */}
                {process.env.NODE_ENV === 'development' && (
                  <TailwindIndicator />
                )}

                {/* Easter eggs */}
                <Suspense fallback={null}>
                  <KonamiCode />
                </Suspense>
              </ConsoleProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}