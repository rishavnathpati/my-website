import { Command, registerCommand } from '@/lib/commands/index';
import { getFileAtPath, getFileContent, currentDirectory } from '@/lib/filesystem';

// Cat command for displaying information
const catCommand: Command = {
  name: 'cat',
  description: 'Display content of a file',
  usage: 'cat [filename]',
  category: 'information',
  execute: (args, console) => {
    if (args.length === 0) {
      console.error('Usage: cat [filename]');
      console.log('Try: ls to see available files');
      console.log('Example: cat README.md');
      return;
    }

    const filename = args[0];
    const file = getFileAtPath(filename);
    
    if (!file) {
      console.error(`cat: ${filename}: No such file or directory`);
      console.log('Use "ls" to see available files or "find" to search');
      return;
    }
    
    if (file.type === 'directory') {
      console.error(`cat: ${filename}: Is a directory`);
      console.log('Use "cd" to navigate into directories or "ls" to list contents');
      return;
    }
    
    // Display file content
    const content = getFileContent(file);
    const lines = content.split('\n');
    
    // Display with line numbers for longer files (optional formatting)
    if (lines.length > 50) {
      lines.forEach((line, idx) => {
        console.log(`${(idx + 1).toString().padStart(4)} │ ${line}`);
      });
    } else {
      lines.forEach(line => console.log(line));
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
    console.log('$ whoami');
    console.log('');
    console.log('I\'m Rishav – I build interactive worlds, AI-driven NPCs,');
    console.log('and VR experiences in Unity.');
    console.log('');
    console.log('💼 Currently: Interactive Media Developer @ Convai');
    console.log('🎮 Focus: AI NPCs, speech systems, VR');
    console.log('📍 Based in Kalyani, West Bengal, India');
    console.log('');
    console.log('Type "cat about/profile.md" to learn more');
    console.log('Type "help" to see all available commands');
  }
};

// Register information commands
registerCommand(catCommand);
registerCommand(whoamiCommand);

// Export for importing in main file
export { catCommand, whoamiCommand }; 