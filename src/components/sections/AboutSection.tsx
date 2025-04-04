import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Mail, MapPin, Calendar, UserCheck, Briefcase, Code2, GitBranch, Terminal, Coffee } from 'lucide-react';

const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

export function AboutSection() {
  const dob = '2001-05-03';
  const age = calculateAge(dob);

  const techStack = [
    'Unity', 'C#', 'TypeScript', 'React', 'Node.js', 'Python',
    'Git', 'Docker', 'AWS', 'TensorFlow', 'OpenCV'
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1" data-aos="fade-right">
            <div className="bg-black/30 rounded-lg border border-border p-6">
              <div className="flex justify-center mb-6">
                <Image
                  src="/profile-img.jpg"
                  alt="Rishav Nath Pati"
                  width={250}
                  height={250}
                  className="rounded-lg shadow-lg object-cover border-2 border-primary/20"
                  loading="lazy"
                />
              </div>
              
              <div className="space-y-4 font-mono">
                <div className="flex items-center space-x-3 text-sm">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">status: <span className="text-green-500">active</span></span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Coffee className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">age: <span className="text-foreground">{age}</span></span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">location: <span className="text-foreground">Kolkata, India</span></span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">role: <span className="text-foreground">Interactive Media Dev</span></span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <GitBranch className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">available: <span className="text-green-500">true</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2" data-aos="fade-left">
            <div className="bg-black/30 rounded-lg border border-border p-6">
              <div className="flex items-center gap-2 mb-6">
                <Terminal className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold font-mono text-foreground">
                  cat about.md
                </h2>
              </div>

              <div className="space-y-6 text-muted-foreground">
                <p className="leading-relaxed">
                  Interactive Media Developer at Convai with 3+ years of experience in Unity (2D/3D/AR/VR) & C#.
                  Focused on building immersive experiences and exploring AI integration in interactive media.
                </p>

                <div>
                  <h3 className="text-foreground font-mono mb-3">$ tech_stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="font-mono">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="leading-relaxed">
                  Committed to clean code, rapid prototyping, and pushing the boundaries of interactive technology.
                  Always exploring new tools and frameworks to create innovative solutions.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg" className="font-mono">
                    <a href="/Rishav_Nath_Pati_Resume.pdf" download>
                      <Download className="mr-2 h-5 w-5" /> download_cv.pdf
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="font-mono">
                    <a href="mailto:patirishavnath@gmail.com">
                      <Mail className="mr-2 h-5 w-5" /> send_email.sh
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