import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Mail, MapPin, Calendar, UserCheck, Briefcase } from 'lucide-react';

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

  return (
    <section id="about" className="py-20 lg:py-28 bg-secondary/30 dark:bg-neutral-900/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1 flex justify-center lg:justify-start" data-aos="fade-right">
            <Image
              src="/profile-img.jpg"
              alt="Rishav Nath Pati"
              width={350}
              height={350}
              className="rounded-full shadow-lg object-cover border-4 border-primary/20"
              loading="lazy"
            />
          </div>

          <div className="lg:col-span-2" data-aos="fade-left">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-raleway text-foreground">
              About Me
            </h2>
            <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-primary font-poppins">
              Game & Interactive Media Developer
            </h3>
            <p className="text-lg mb-6 text-muted-foreground leading-relaxed">
              Interactive Media Developer at Convai with 3+ years specializing in Unity (2D/3D/AR/VR) & C#. Passionate about crafting immersive experiences and exploring AI in interactive media. Proven ability in full development cycles, clean code, and rapid prototyping.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8 text-foreground">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span><strong>Age:</strong> {age}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span><strong>City:</strong> Kolkata, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-primary" />
                <span><strong>Degree:</strong> MCA</span>
              </div>
              <div className="flex items-center space-x-3">
                <UserCheck className="w-5 h-5 text-primary" />
                <span><strong>Freelance:</strong> Available</span>
              </div>
            </div>

            <p className="mb-8 text-muted-foreground leading-relaxed">
              Dedicated to pushing the boundaries of interactive entertainment and leveraging technology to create memorable user journeys. Always eager to connect and collaborate on innovative projects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <a href="/Rishav_Nath_Pati_Resume.pdf" download>
                  <Download className="mr-2 h-5 w-5" /> Download Resume
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="mailto:patirishavnath@gmail.com">
                  <Mail className="mr-2 h-5 w-5" /> Email Me
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 