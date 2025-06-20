import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Terminal } from 'lucide-react';
import { contactInfo, type ContactInfo } from '@/lib/data/contact';

// Contact item component
function ContactItem({ info }: { info: ContactInfo }) {
  const Icon = info.icon;
  
  return (
    <div className="flex items-center gap-2 mb-3 group">
      <Icon className={`w-4 h-4 text-primary transition-transform group-hover:scale-110 ${
        info.isPrimary ? 'animate-pulse' : ''
      }`} />
      <span className={`${
        info.isPrimary ? 'text-foreground' : 'text-muted-foreground'
      } transition-colors group-hover:text-primary`}>
        {info.text}
      </span>
    </div>
  );
}

function ContactCTAComponent() {
  // Use data directly - these are static imports that don't change

  return (
    <section
      id="contact-cta"
      className="py-20 lg:py-28 bg-black/20 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6 group">
            <Terminal className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold font-mono text-foreground group-hover:text-primary transition-colors">
              contact
            </h2>
          </div>

          <div className="bg-black/30 rounded-lg border border-border p-6 hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-2 mb-6 group">
              <Terminal className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-mono text-sm group-hover:text-primary transition-colors">contact.sh</span>
            </div>

            <div className="space-y-6">
              <div className="font-mono">
                <div className="text-muted-foreground mb-2 group">
                  <span className="group-hover:text-primary transition-colors">$ echo &quot;status&quot;</span>
                </div>
                <p className="text-foreground mb-4 pl-4 group hover:bg-primary/5 rounded transition-colors">
                  <span className="text-green-500 animate-pulse">●</span>
                  <span className="ml-2 group-hover:text-primary transition-colors">
                    Available for freelance projects and collaborations
                  </span>
                </p>

                <div className="text-muted-foreground mb-2 group">
                  <span className="group-hover:text-primary transition-colors">$ cat contact_info.txt</span>
                </div>
                <div className="bg-black/20 rounded border border-border/50 p-4 mb-6 hover:border-primary/50 transition-colors">
                  {contactInfo.map((info, index) => (
                    <ContactItem key={index} info={info} />
                  ))}
                </div>

                <div className="text-muted-foreground mb-2 group">
                  <span className="group-hover:text-primary transition-colors">$ ./send_message.sh</span>
                </div>
                <div className="pl-4">
                  <Button 
                    size="lg" 
                    asChild 
                    className="font-mono transition-transform hover:scale-105 hover:shadow-lg"
                  >
                    <a 
                      href="mailto:patirishavnath@gmail.com"
                      className="flex items-center"
                    >
                      <Mail className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                      <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">
                        initialize_conversation.js
                      </span>
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

// Export component directly
export const ContactCTA = ContactCTAComponent;
