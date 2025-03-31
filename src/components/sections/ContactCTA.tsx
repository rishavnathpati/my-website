import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export function ContactCTA() {
  return (
    <section
      id="contact-cta"
      className="py-20 lg:py-28 bg-primary/10 dark:bg-primary/5"
    >
      <div className="container mx-auto px-4">
        <div
          className="max-w-3xl mx-auto text-center"
          data-aos="fade-up"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-raleway text-foreground">
            Let's Connect
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8">
            Have a project in mind, a question, or just want to chat about games and tech? I'd love to hear from you. Reach out and let's create something amazing together!
          </p>
          <Button size="lg" asChild className="text-lg px-8 py-6">
            <a href="mailto:patirishavnath@gmail.com">
              Get In Touch <Mail className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
} 