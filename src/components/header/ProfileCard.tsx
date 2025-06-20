'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Terminal } from 'lucide-react';
import { useConsole } from '@/components/ui/console-provider';
import { useNavigationSound } from '@/hooks/useNavigationSound';

interface SocialLink {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  command: string;
}

interface ProfileCardProps {
  socialLinks: SocialLink[];
}

export function ProfileCard({ socialLinks }: ProfileCardProps) {
  const { success } = useConsole();
  const { playNavigationSound } = useNavigationSound();

  const handleSocialLinkClick = (command: string) => {
    success(`Executing: ${command}`);
    playNavigationSound();
  };

  return (
    <div className="profile mb-8 pt-10 lg:pt-0">
      <div className="bg-black/40 rounded-lg border border-border p-6 relative group">
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
        <div className="flex items-center gap-3 mb-4">
          <Terminal size={16} className="text-primary" />
          <span className="font-mono text-sm text-muted-foreground">user_profile.json</span>
        </div>
        
        <div className="flex flex-col items-center relative z-10">
          <div className="relative group">
            <Image
              src="/profile-img.jpg"
              alt="Rishav Nath Pati"
              width={100}
              height={100}
              className="rounded-lg border-2 border-primary/20 transition-transform duration-300 group-hover:scale-105"
              priority
              sizes="128px"
            />
            <div className="absolute inset-0 border-2 border-primary/0 rounded-lg transition-all duration-300 group-hover:border-primary/40 group-hover:scale-105"></div>
          </div>
          <h1 className="text-xl font-mono mt-4 mb-1">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              <span className="text-primary">./</span>rishav_nath_pati
            </Link>
          </h1>
          <div className="social-links mt-4 flex justify-center space-x-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-11 h-11 bg-black/30 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-200 border border-border hover:scale-110 social-link"
                onClick={() => handleSocialLinkClick(link.command)}
              >
                <link.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}