'use client';

import { Terminal, Heart, Coffee } from 'lucide-react';

export function Footer() {
  return (
    <footer id="footer" className="bg-black/30 backdrop-blur-sm py-6 text-center">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-mono">
          <Terminal size={14} className="text-primary" />
          <span>echo &quot;Made with</span>
          <Heart size={14} className="text-red-500 animate-pulse" />
          <span>and</span>
          <Coffee size={14} className="text-amber-500" />
          <span>in India&quot;</span>
        </div>
        <div className="mt-2 text-xs text-muted-foreground/60 font-mono">
          <span className="text-primary">&gt; </span>
          <span className="typing-animation">Feel free to fork, star, or contribute!</span>
        </div>
        <div className="mt-4 text-sm text-muted-foreground font-mono">
          © Copyright Rishav Nath Pati
        </div>
      </div>

      <style jsx>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        .typing-animation {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          animation: typing 3s steps(40, end);
        }
      `}</style>
    </footer>
  );
}