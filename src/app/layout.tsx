import type { Metadata } from "next";
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
import { CursorEffect } from "@/components/easter-eggs/CursorEffect";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AOSInitializer } from "@/components/AOSInitializer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SkipLink } from "@/components/SkipLink";
import { ConsoleProvider } from "@/components/ui/console-provider";
import { FloatingParticles } from "@/components/effects/FloatingParticles";

// Geist fonts are configured via Tailwind variables

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rishav Nath Pati | Game & Interactive Media Developer",
  description: "Portfolio of Rishav Nath Pati, specializing in Unity 3D/2D/AR/VR, C#, and Machine Learning.",
  openGraph: {
    title: 'Rishav Nath Pati | Game & Interactive Media Developer',
    description: 'Portfolio of Rishav Nath Pati, specializing in Unity 3D/2D/AR/VR, C#, and Machine Learning.',
    url: '/',
    siteName: 'Rishav Nath Pati Portfolio',
    images: [
      {
        url: '/profile-img.jpg',
        width: 800,
        height: 800,
        alt: 'Rishav Nath Pati',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rishav Nath Pati | Game & Interactive Media Developer',
    description: 'Portfolio of Rishav Nath Pati, specializing in Unity 3D/2D/AR/VR, C#, and Machine Learning.',
    images: ['/profile-img.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head />
      <body className="font-sans bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConsoleProvider>
            {/* Background Effect */}
            <FloatingParticles />
            
            <SkipLink />
            <AOSInitializer />
            <Header />
            <ThemeToggle />
            <ScrollToTop />

            <main id="main" className="lg:ml-[300px] relative z-[2]" tabIndex={-1}>
              {children}
              <Footer />
            </main>
            <Analytics />
            <Toaster />
            <TailwindIndicator />
            <KonamiCode />
            <CursorEffect />
          </ConsoleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
