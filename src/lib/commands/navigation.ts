import { Command, registerCommand } from '@/lib/commands/index';

// Helper function to scroll to a section
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    return true;
  }
  return false;
};

// CD command for navigating between sections
const cdCommand: Command = {
  name: 'cd',
  description: 'Change to a different section',
  usage: 'cd [section]',
  category: 'navigation',
  execute: (args, console) => {
    if (args.length === 0) {
      console.log('Current sections available:');
      console.log('  home - Home section');
      console.log('  about - About section');
      console.log('  skills - Skills section');
      console.log('  portfolio - Portfolio section');
      console.log('  contact - Contact section');
      return;
    }

    // Remove trailing slashes for section names
    let section = args[0].toLowerCase();
    if (section.endsWith('/')) {
      section = section.slice(0, -1);
    }
    
    switch(section) {
      case 'home':
        if (scrollToSection('hero')) {
          console.success('Navigated to home section');
        } else {
          console.error('Could not find home section');
        }
        break;
      case 'about':
        if (scrollToSection('about')) {
          console.success('Navigated to about section');
        } else {
          console.error('Could not find about section');
        }
        break;
      case 'skills':
        if (scrollToSection('skills')) {
          console.success('Navigated to skills section');
        } else {
          console.error('Could not find skills section');
        }
        break;
      case 'portfolio':
        if (scrollToSection('portfolio')) {
          console.success('Navigated to portfolio section');
        } else {
          console.error('Could not find portfolio section');
        }
        break;
      case 'contact':
        if (scrollToSection('contact')) {
          console.success('Navigated to contact section');
        } else {
          console.error('Could not find contact section');
        }
        break;
      default:
        console.error(`Unknown section: ${args[0]}`);
        console.log('Available sections: home, about, skills, portfolio, contact');
    }
  }
};

// LS command for listing sections
const lsCommand: Command = {
  name: 'ls',
  description: 'List available sections',
  usage: 'ls',
  category: 'navigation',
  aliases: ['dir'],
  execute: (args, console) => {
    console.log('Available sections:');
    console.log('  home/');
    console.log('  about/');
    console.log('  skills/');
    console.log('  portfolio/');
    console.log('  contact/');
  }
};

// Register navigation commands
registerCommand(cdCommand);
registerCommand(lsCommand);

// Export for importing in main file
export { cdCommand, lsCommand }; 