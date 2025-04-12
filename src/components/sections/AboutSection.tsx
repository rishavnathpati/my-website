import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, Mail, MapPin, Calendar, UserCheck, Briefcase, Code2, Terminal, Phone, Globe2, Cake } from 'lucide-react';

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
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">birthday: <span className="text-foreground">3 May 2001</span></span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Cake className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">age: <span className="text-foreground">{age}</span></span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">location: <span className="text-foreground">Kolkata, West Bengal, India</span></span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">phone: <span className="text-foreground">+91 9123877594</span></span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <UserCheck className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">degree: <span className="text-foreground">Masters in Computer Application</span></span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">role: <span className="text-foreground">Game & Interactive Media Developer</span></span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">email: <span className="text-foreground">patirishavnath@gmail.com</span></span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Globe2 className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">website: <span className="text-foreground">patirishavnath.github.io</span></span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">freelance: <span className="text-green-500">available</span></span>
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

              {/* Added font-mono */}
             <div className="space-y-6 text-muted-foreground font-mono">
               <div>
                 <p className="leading-relaxed mb-4">
                   🎮 As a seasoned Game Developer, I possess extensive expertise in C# and Unity3D. My portfolio boasts over 10 published titles across mobile platforms (Android and iOS) and PC, encompassing a diverse range of genres including casual, hyper-casual, free-to-play, and educational games. My experience spans the entire development lifecycle, from initial concept to final product delivery.
                  </p>
  
                  <p className="leading-relaxed mb-4">
                    ⚙️ Proficient in Git and other version control systems, I excel in fostering seamless collaboration and efficient project management. As a self-motivated professional, I have consistently demonstrated success in my endeavors. I take great pride in adhering to clean coding practices, consistently striving to create games that are both efficient and high-performing.
                  </p>
  
                  <p className="leading-relaxed mb-4">
                    🧪 My ability to rapidly prototype and willingness to explore uncharted territories are key strengths. This approach enables me to contribute innovative ideas, resulting in captivating and enjoyable gaming experiences that push the boundaries of interactive entertainment.
                  </p>

                  <p className="leading-relaxed mb-4">
                    If you're in search of a passionate and dedicated Game Developer to elevate your team, I'd be delighted to connect. After all, in the game of talent acquisition, I might just be the power-up your project needs! 🎮🚀
                  </p>

                  <p className="leading-relaxed">
                  </p>
                </div>

                <div>
                  <h3 className="text-foreground font-mono mb-4 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-primary" />
                    <span>$ key_competencies</span>
                  </h3>
                   {/* Added font-mono (inherited from parent div now, but explicitly adding here is fine too) */}
                  <ul className="space-y-4 text-muted-foreground font-mono">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Exceptional multitasking abilities, allowing me to efficiently manage complex development processes, troubleshoot issues, and maintain productivity even under high-pressure situations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Keen attention to detail, particularly in visual elements, ensuring pixel-perfect designs and seamless user experiences across all projects</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Strong character development skills, balancing creative design with practical gameplay mechanics to create compelling and challenging game experiences</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Advanced debugging proficiency, with the ability to quickly identify, analyze, and resolve complex issues in code and game systems</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Extraordinary perseverance in quality assurance, demonstrating the ability to conduct thorough and repeated playtesting to ensure optimal game balance and user satisfaction</span>
                    </li>
                  </ul>
                </div>
                

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
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
