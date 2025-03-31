import type { Metadata } from "next";
import { Inter, Open_Sans, Raleway, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AOSInitializer } from "@/components/AOSInitializer";
import { ThemeProvider } from "@/components/ThemeProvider";

// Configure fonts
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rishav Nath Pati | Game & Interactive Media Developer",
  description: "Portfolio of Rishav Nath Pati, specializing in Unity 3D/2D/AR/VR, C#, and Machine Learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} ${raleway.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="font-open-sans bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AOSInitializer />
          <Header />
          <ThemeToggle />

          <div id="main" className="lg:ml-[300px] transition-all duration-500 ease-in-out">
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
