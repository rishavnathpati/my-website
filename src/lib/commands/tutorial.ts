import { Command, registerCommand, CommandConsoleContext } from '@/lib/commands/index';

// Tutorial command to guide users through the portfolio
const tutorialCommand: Command = {
  name: 'tutorial',
  description: 'Start an interactive tutorial',
  usage: 'tutorial [section]',
  category: 'information',
  execute: (args, console) => {
    if (args.length > 0) {
      const section = args[0].toLowerCase();
      
      switch(section) {
        case 'navigation':
          navigationTutorial(console);
          break;
        case 'commands':
          commandsTutorial(console);
          break;
        case 'easter-eggs':
          easterEggsTutorial(console);
          break;
        default:
          console.error(`Unknown tutorial section: ${section}`);
          console.log('Available tutorial sections: navigation, commands, easter-eggs');
      }
      
      return;
    }
    
    // Main tutorial
    console.log('Welcome to the interactive portfolio tutorial!');
    console.log('This console allows you to navigate and explore the portfolio using commands.');
    console.log('');
    console.log('Here are some basic commands to get you started:');
    console.log('  help - Display available commands');
    console.log('  cd [section] - Navigate to a section (e.g., cd about)');
    console.log('  cat [file] - Display information (e.g., cat about.md)');
    console.log('  ls - List available sections');
    console.log('');
    console.log('For more specific tutorials, try:');
    console.log('  tutorial navigation - Learn how to navigate the portfolio');
    console.log('  tutorial commands - Learn about available commands');
    console.log('  tutorial easter-eggs - Discover fun easter eggs');
    console.log('');
    console.success('Happy exploring!');
  }
};

// Navigation tutorial
const navigationTutorial = (console: CommandConsoleContext) => {
  console.log('=== Navigation Tutorial ===');
  console.log('');
  console.log('The portfolio is organized into sections that you can navigate to:');
  console.log('  home - Main landing section');
  console.log('  about - About me section');
  console.log('  skills - Skills and technologies section');
  console.log('  portfolio - Projects and work section');
  console.log('  contact - Contact information section');
  console.log('');
  console.log('To navigate to a section, use the cd command:');
  console.log('  cd about - Navigates to the about section');
  console.log('');
  console.log('You can also use ls to see available sections:');
  console.log('  ls - Lists all sections');
  console.log('');
  console.success('Try it now! Type "cd about" to navigate to the about section.');
};

// Commands tutorial
const commandsTutorial = (console: CommandConsoleContext) => {
  console.log('=== Commands Tutorial ===');
  console.log('');
  console.log('Here are the main categories of commands:');
  console.log('');
  console.log('Navigation commands:');
  console.log('  cd [section] - Navigate to a section');
  console.log('  ls - List available sections');
  console.log('');
  console.log('Information commands:');
  console.log('  cat [file] - Display information from a file');
  console.log('  whoami - Display a brief introduction');
  console.log('');
  console.log('Utility commands:');
  console.log('  help - Display available commands');
  console.log('  clear - Clear the console');
  console.log('  echo [text] - Display text');
  console.log('  open [url] - Open a URL in a new tab');
  console.log('  history - Show command history');
  console.log('');
  console.log('Use the up and down arrow keys to navigate through command history.');
  console.log('Type "terminal" to open full-screen mode for better experience.');
  console.log('');
  console.success('Try using "help" to see all available commands!');
};

// Easter eggs tutorial
const easterEggsTutorial = (console: CommandConsoleContext) => {
  console.log('=== Easter Eggs Tutorial ===');
  console.log('');
  console.log('This portfolio contains several fun easter eggs:');
  console.log('');
  console.log('Try these commands:');
  console.log('  sudo make me a sandwich - Classic joke');
  console.log('  matrix - Display a matrix-like effect');
  console.log('  coffee - Take a coffee break');
  console.log('  konami - Enter the Konami code');
  console.log('  rickroll - You know what this does...');
  console.log('');
  console.success('Have fun discovering easter eggs!');
};

// Register the tutorial command
registerCommand(tutorialCommand);

// Export for importing in main file
export { tutorialCommand }; 