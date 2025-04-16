import { Command, registerCommand } from './index';

// Sudo command - classic joke
const sudoCommand: Command = {
  name: 'sudo',
  description: 'Run command with superuser privileges',
  usage: 'sudo [command]',
  category: 'easteregg',
  execute: (args, console) => {
    if (args.length === 0) {
      console.error('Usage: sudo [command]');
      return;
    }

    const fullCommand = args.join(' ');
    
    if (fullCommand.toLowerCase() === 'make me a sandwich') {
      console.log('Okay.');
    } else {
      console.error('Permission denied');
      console.log('Nice try though! 😉');
    }
  }
};

// Matrix effect command
const matrixCommand: Command = {
  name: 'matrix',
  description: 'Display a matrix-like effect',
  usage: 'matrix',
  category: 'easteregg',
  execute: (args, console) => {
    // We'll just simulate the effect with some logs
    console.log('Initializing the Matrix...');
    
    // ASCII art for Matrix effect
    console.log('');
    console.log('█▓▒░▒▓██▓▒░▒▓░▒▓░▒▓██▓▒░▒▓█');
    console.log('▓█▒▓░█▒▓█▒▓░█▒▓░█▒▓█▒▓░█▒▓█');
    console.log('▒▓█▓▒▓█▓▒▓█▓▒▓█▓▒▓█▓▒▓█▓▒▓█');
    console.log('░▒▓█▓▒░█▓▒░█▓▒░█▓▒░█▓▒░█▓▒░');
    console.log('');
    
    console.log('Wake up, Neo...');
    console.log('The Matrix has you...');
    console.log('Follow the white rabbit...');
    console.log('');
    console.success('Knock, knock, Neo.');
  }
};

// Coffee command - ASCII art
const coffeeCommand: Command = {
  name: 'coffee',
  description: 'Take a coffee break',
  usage: 'coffee',
  category: 'easteregg',
  execute: (args, console) => {
    console.log('Brewing some coffee for you...');
    console.log('');
    console.log('       (');
    console.log('        )     (');
    console.log('   ___..(..__(..__');
    console.log('  \\_________________/');
    console.log('    \\_____________/');
    console.log('      \\_________/');
    console.log('        \\_____/');
    console.log('');
    console.success('Coffee ready! ☕ Enjoy!');
  }
};

// Konami command
const konamiCommand: Command = {
  name: 'konami',
  description: 'Enter the Konami code',
  usage: 'konami',
  category: 'easteregg',
  execute: (args, console) => {
    console.log('↑ ↑ ↓ ↓ ← → ← → B A');
    console.log('');
    console.log('30 LIVES ADDED!');
    console.success('Cheat code activated!');
  }
};

// Rickroll command
const rickrollCommand: Command = {
  name: 'rickroll',
  description: 'Just try it and see',
  usage: 'rickroll',
  category: 'easteregg',
  execute: (args, console) => {
    console.log('Never gonna give you up');
    console.log('Never gonna let you down');
    console.log('Never gonna run around and desert you');
    console.log('Never gonna make you cry');
    console.log('Never gonna say goodbye');
    console.log('Never gonna tell a lie and hurt you');
    
    // If in a browser environment, try to open the video
    if (typeof window !== 'undefined') {
      console.log('');
      console.log('Opening YouTube...');
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    }
  }
};

// Register easter egg commands
registerCommand(sudoCommand);
registerCommand(matrixCommand);
registerCommand(coffeeCommand);
registerCommand(konamiCommand);
registerCommand(rickrollCommand);

// Export for importing in main file
export { sudoCommand, matrixCommand, coffeeCommand, konamiCommand, rickrollCommand }; 