import { Command, registerCommand, getAllCommands, getCommandsByCategory } from './index';

// Help command
const helpCommand: Command = {
  name: 'help',
  description: 'Display available commands',
  usage: 'help [command]',
  category: 'utility',
  aliases: ['?'],
  execute: (args, console) => {
    if (args.length > 0) {
      // Show help for specific command
      const commandName = args[0];
      const command = getAllCommands().find(
        (cmd) => cmd.name === commandName || (cmd.aliases && cmd.aliases.includes(commandName))
      );
      
      if (command) {
        console.log(`Command: ${command.name}`);
        console.log(`Description: ${command.description}`);
        console.log(`Usage: ${command.usage}`);
        if (command.aliases && command.aliases.length > 0) {
          console.log(`Aliases: ${command.aliases.join(', ')}`);
        }
      } else {
        console.error(`Unknown command: ${commandName}`);
      }
    } else {
      // Show all commands grouped by category with modern styling
      console.success('╭──────────────────────────────────────────────╮');
      console.success('│              AVAILABLE COMMANDS              │');
      console.success('╰──────────────────────────────────────────────╯');
      console.log('');

      // Navigation commands
      const navCommands = getCommandsByCategory('navigation');
      if (navCommands.length > 0) {
        console.success('● Navigation:');
        navCommands.forEach(cmd => {
          console.log(`  ${cmd.name.padEnd(10)} │ ${cmd.description}`);
        });
        console.log('');
      }

      // Information commands
      const infoCommands = getCommandsByCategory('information');
      if (infoCommands.length > 0) {
        console.success('● Information:');
        infoCommands.forEach(cmd => {
          console.log(`  ${cmd.name.padEnd(10)} │ ${cmd.description}`);
        });
        console.log('');
      }

      // Utility commands
      const utilityCommands = getCommandsByCategory('utility');
      if (utilityCommands.length > 0) {
        console.success('● Utility:');
        utilityCommands.forEach(cmd => {
          console.log(`  ${cmd.name.padEnd(10)} │ ${cmd.description}`);
        });
        console.log('');
      }
      
      // Easter egg commands (don't show these unless we want to)
      const easterEggCommands = getCommandsByCategory('easteregg');
      if (easterEggCommands.length > 0 && args.includes('--all')) {
        console.success('● Fun:');
        easterEggCommands.forEach(cmd => {
          console.log(`  ${cmd.name.padEnd(10)} │ ${cmd.description}`);
        });
        console.log('');
      }

      console.success('╭──────────────────────────────────────────────╮');
      console.log('  Type "help [command]" for more information');
      console.log('  Use arrow keys to navigate command history');
      console.log('  Press ESC to exit full-screen terminal');
      console.success('╰──────────────────────────────────────────────╯');
    }
  }
};

// Clear command
const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the console',
  usage: 'clear',
  category: 'utility',
  aliases: ['cls'],
  execute: (args, console) => {
    if (console.clear) {
      console.clear();
    } else {
      console.log('Clear function not available');
    }
  }
};

// Echo command
const echoCommand: Command = {
  name: 'echo',
  description: 'Display a line of text',
  usage: 'echo [text]',
  category: 'utility',
  execute: (args, console) => {
    if (args.length > 0) {
      console.log(args.join(' '));
    } else {
      console.log('');
    }
  }
};

// Open command
const openCommand: Command = {
  name: 'open',
  description: 'Open a URL in a new tab',
  usage: 'open [url]',
  category: 'utility',
  execute: (args, console) => {
    if (args.length === 0) {
      console.error('Usage: open [url]');
      return;
    }

    let url = args[0];
    // Add https:// if no protocol is specified
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    try {
      window.open(url, '_blank');
      console.success(`Opening ${url} in a new tab`);
    } catch (error) {
      console.error(`Failed to open ${url}`);
    }
  }
};

// History command
const historyCommand: Command = {
  name: 'history',
  description: 'Display command history',
  usage: 'history',
  category: 'utility',
  execute: (args, console) => {
    // Access command history through the ConsoleContext
    const history = console.commandHistory;
    
    if (!history || history.length === 0) {
      console.log('No command history available');
      return;
    }
    
    console.success('╭──────────────────────────────────────────────╮');
    console.success('│             COMMAND HISTORY                  │');
    console.success('╰──────────────────────────────────────────────╯');
    console.log('');
    
    history.forEach((cmd, index) => {
      // Get the index number with at least 2 digits (padded with spaces)
      const indexStr = `${index + 1}`.padStart(2, ' ');
      console.log(`  ${indexStr}  ${cmd}`);
    });
    
    console.log('');
    console.log('Use ↑/↓ arrow keys to navigate history');
  }
};

// Terminal command
const terminalCommand: Command = {
  name: 'terminal',
  description: 'Toggle full-screen terminal mode',
  usage: 'terminal',
  category: 'utility',
  aliases: ['term', 't'],
  execute: (args, console) => {
    if (args.length > 0 && args[0] === 'help') {
      console.log('Terminal command help:');
      console.log('');
      console.log('The terminal command opens a full-screen terminal interface.');
      console.log('');
      console.log('Usage:');
      console.log('  terminal - Toggle full-screen terminal mode');
      console.log('  t - Shorthand for terminal command');
      console.log('');
      console.log('Keyboard shortcuts:');
      console.log('  Ctrl+` or Cmd+` - Toggle terminal');
      console.log('  Esc - Close full-screen terminal');
      console.log('');
      console.log('You can also click the expand button in the top-right of the inline terminal.');
      return;
    }
    
    // This will be handled by the ConsoleProvider
    // We'll set up a way to communicate this command to the UI
    console.log('Opening full-screen terminal...');
    
    // Access our custom toggleTerminal function through the CommandConsoleContext
    if ((console as any).toggleTerminal) {
      (console as any).toggleTerminal(true);
    } else {
      console.error('Full-screen terminal functionality not available');
    }
  }
};

// Register utility commands
registerCommand(helpCommand);
registerCommand(clearCommand);
registerCommand(echoCommand);
registerCommand(openCommand);
registerCommand(historyCommand);
registerCommand(terminalCommand);

// Export for importing in main file
export { helpCommand, clearCommand, echoCommand, openCommand, historyCommand, terminalCommand }; 