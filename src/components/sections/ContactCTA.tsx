import { Button } from '@/components/ui/button';
import { Mail, Terminal, MessageSquare, Send, Laptop, Phone, MapPin } from 'lucide-react';

export function ContactCTA() {
  return (
    <section
      id="contact-cta"
      className="py-20 lg:py-28 bg-black/20 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/30 rounded-lg border border-border p-6">
            <div className="flex items-center gap-2 mb-6">
              <Terminal className="w-5 h-5 text-primary" />
              <span className="font-mono text-sm text-muted-foreground">contact.sh</span>
            </div>

            <div className="space-y-6" data-aos="fade-up">
              <div className="font-mono">
                <p className="text-muted-foreground mb-2">$ echo "status"</p>
                <p className="text-foreground mb-4 pl-4">
                  <span className="text-green-500">●</span> Available for freelance projects and collaborations
                </p>

                <p className="text-muted-foreground mb-2">$ cat contact_info.txt</p>
                <div className="bg-black/20 rounded border border-border/50 p-4 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span className="text-foreground">Let's create something amazing together!</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Laptop className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Open for: Game Dev, XR, AR/VR, AI Integration, Interactive Media</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Phone: +91 9123877594</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Kalyani, West Bengal, India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Response Time: &lt; 24 hours</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-2">$ ./send_message.sh</p>
                <div className="pl-4">
                  <Button size="lg" asChild className="font-mono">
                    <a href="mailto:patirishavnath@gmail.com">
                      <Mail className="mr-2 h-5 w-5" /> initialize_conversation.js
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}