import { Command, registerCommand } from '@/lib/commands/index';

// Cat command for displaying information
const catCommand: Command = {
  name: 'cat',
  description: 'Display content of a file',
  usage: 'cat [filename]',
  category: 'information',
  execute: (args, console) => {
    if (args.length === 0) {
      console.error('Usage: cat [filename]');
      console.log('Available files: about.md, skills.json, experience.json, contact.json');
      return;
    }

    const filename = args[0].toLowerCase();
    
    switch(filename) {
      case 'about.md':
        console.log('# About Me');
        console.log('');
        console.log('I am a passionate developer with experience in web development,');
        console.log('mobile applications, and software engineering. I love creating');
        console.log('intuitive and efficient solutions to complex problems.');
        console.log('');
        console.log('My journey in tech started with a deep curiosity about how things work,');
        console.log('which eventually led me to pursue a career in software development.');
        console.log('');
        console.log('When I\'m not coding, you can find me exploring new technologies,');
        console.log('contributing to open-source projects, or enjoying outdoor activities.');
        break;
        
      case 'skills.json':
        console.log(JSON.stringify({
          frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'],
          backend: ['Node.js', 'Express', 'Python', 'Django', 'RESTful APIs'],
          database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase'],
          tools: ['Git', 'Docker', 'VS Code', 'Figma', 'Webpack']
        }, null, 2));
        break;
        
      case 'experience.json':
        console.log(JSON.stringify([
          {
            company: 'Tech Innovations Inc.',
            position: 'Senior Frontend Developer',
            period: '2020 - Present',
            responsibilities: [
              'Developing responsive web applications with React and TypeScript',
              'Implementing CI/CD pipelines for automated testing and deployment',
              'Mentoring junior developers and leading code reviews'
            ]
          },
          {
            company: 'Digital Solutions LLC',
            position: 'Full Stack Developer',
            period: '2018 - 2020',
            responsibilities: [
              'Built RESTful APIs using Node.js and Express',
              'Developed frontend interfaces with React and Redux',
              'Optimized database queries for improved performance'
            ]
          }
        ], null, 2));
        break;
        
      case 'contact.json':
        console.log(JSON.stringify({
          email: 'contact@example.com',
          linkedIn: 'linkedin.com/in/example',
          github: 'github.com/example',
          twitter: 'twitter.com/example'
        }, null, 2));
        break;
        
      default:
        console.error(`File not found: ${filename}`);
        console.log('Available files: about.md, skills.json, experience.json, contact.json');
    }
  }
};

// Whoami command for displaying a brief intro
const whoamiCommand: Command = {
  name: 'whoami',
  description: 'Display a brief introduction',
  usage: 'whoami',
  category: 'information',
  execute: (args, console) => {
    console.log('Frontend Developer & UI/UX Enthusiast');
    console.log('');
    console.log('Specializing in creating beautiful, responsive, and user-friendly web applications');
    console.log('with modern technologies like React, TypeScript, and Next.js.');
    console.log('');
    console.log('Type "help" to see available commands and explore more about me.');
  }
};

// Register information commands
registerCommand(catCommand);
registerCommand(whoamiCommand);

// Export for importing in main file
export { catCommand, whoamiCommand }; 