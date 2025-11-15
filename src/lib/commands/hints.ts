import { Command, registerCommand, getAllCommands } from '@/lib/commands/index';
import { currentDirectory } from '@/lib/filesystem';

// Hint command - suggest commands based on context
const hintCommand: Command = {
  name: 'hint',
  description: 'Get smart command suggestions based on your current context',
  usage: 'hint',
  category: 'utility',
  aliases: ['suggest', 'tip'],
  execute: (args, console) => {
    console.log('💡 Smart Suggestions');
    console.log('');
    
    // Context-aware hints
    if (currentDirectory === '') {
      // At root directory
      console.log('You\'re at the root directory. Here are some suggestions:');
      console.log('');
      console.log('⭐ Best Stuff First:');
      console.log('  • cat featured/START_HERE.txt    - Quick intro to my best work');
      console.log('  • cat featured/current-work.md   - What I\'m building now');
      console.log('  • cat featured/best-projects.json - Top 4 projects');
      console.log('');
      console.log('🔍 Discovery:');
      console.log('  • grep "AI"                      - Find AI-related work');
      console.log('  • tree                           - See full structure');
      console.log('  • tour                           - Guided walkthrough');
      console.log('');
      console.log('📂 Full Details:');
      console.log('  • cat about/profile.md           - Complete background');
      console.log('  • cat portfolio/projects.md      - All projects');
    } else {
      // In a subdirectory
      console.log(`You're in ~/${currentDirectory}. Here are some suggestions:`);
      console.log('');
      console.log('📂 Navigation:');
      console.log('  • ls                - See what\'s here');
      console.log('  • cd ~              - Go back to root');
      console.log('  • pwd               - Confirm your location');
      console.log('');
      console.log('👀 Explore:');
      console.log('  • cat [filename]    - Read a file');
      console.log('  • grep [pattern]    - Search in this directory');
    }
    
    console.log('');
    console.log('🔍 Discovery commands:');
    console.log('  • find [pattern]    - Find files by name');
    console.log('  • grep [text]       - Search through content');
    console.log('  • history           - See your command history');
    console.log('');
    console.success('Tip: Use "help" to see all available commands!');
  }
};

// Alias command - show command aliases
const aliasCommand: Command = {
  name: 'alias',
  description: 'Show command aliases and shortcuts',
  usage: 'alias',
  category: 'utility',
  execute: (args, console) => {
    console.log('📝 Command Aliases & Shortcuts');
    console.log('');
    console.log('These commands have shorter aliases:');
    console.log('');
    
    const commands = getAllCommands();
    const commandsWithAliases = commands.filter(cmd => cmd.aliases && cmd.aliases.length > 0);
    
    if (commandsWithAliases.length === 0) {
      console.log('No aliases configured');
      return;
    }
    
    commandsWithAliases.forEach(cmd => {
      const aliasStr = cmd.aliases!.join(', ');
      console.log(`${cmd.name.padEnd(15)} → ${aliasStr}`);
    });
    
    console.log('');
    console.log('💡 Pro tips:');
    console.log('  • Use ↑/↓ arrows to navigate command history');
    console.log('  • Combine commands: cd about && cat profile.md');
    console.log('  • Use flags: ls -l for detailed listings');
  }
};

// Cheat sheet command
const cheatCommand: Command = {
  name: 'cheat',
  description: 'Show a quick reference cheat sheet',
  usage: 'cheat [category]',
  category: 'utility',
  aliases: ['quickref', 'reference'],
  execute: (args, console) => {
    if (args.length > 0) {
      const category = args[0].toLowerCase();
      
      switch(category) {
        case 'navigation':
        case 'nav':
          showNavigationCheat(console);
          break;
        case 'search':
          showSearchCheat(console);
          break;
        case 'files':
          showFilesCheat(console);
          break;
        default:
          console.error(`Unknown category: ${category}`);
          console.log('Available categories: navigation, search, files');
      }
      return;
    }
    
    // Show all cheats
    console.success('╔═══════════════════════════════════════════════════════════════════════╗');
    console.success('║                    COMMAND CHEAT SHEET                                ║');
    console.success('╚═══════════════════════════════════════════════════════════════════════╝');
    console.log('');
    
    console.log('📂 Navigation (cheat navigation)');
    console.log('  cd [dir]         Change directory');
    console.log('  ls [-l]          List files');
    console.log('  pwd              Show location');
    console.log('  tree             View structure');
    console.log('');
    
    console.log('🔍 Search (cheat search)');
    console.log('  grep [pattern]   Search content');
    console.log('  find [name]      Find files');
    console.log('');
    
    console.log('📄 Files (cheat files)');
    console.log('  cat [file]       Display file');
    console.log('  whoami           Quick intro');
    console.log('');
    
    console.log('🛠️  Utility');
    console.log('  help             All commands');
    console.log('  clear            Clear screen');
    console.log('  history          Command history');
    console.log('  hint             Smart suggestions');
    console.log('');
    
    console.log('📚 Learning');
    console.log('  tour             Guided tour');
    console.log('  tutorial         Tutorials');
    console.log('');
    
    console.success('Type "cheat [category]" for detailed help on a specific category');
  }
};

function showNavigationCheat(console: any) {
  console.log('📂 Navigation Commands - Detailed Reference');
  console.log('');
  console.log('cd [directory]       Change to directory');
  console.log('  cd about           Go to about directory');
  console.log('  cd ~               Go to home directory');
  console.log('  cd ..              Go up one level');
  console.log('');
  console.log('ls [options] [path]  List directory contents');
  console.log('  ls                 Simple listing');
  console.log('  ls -l              Detailed listing');
  console.log('  ls portfolio       List specific directory');
  console.log('');
  console.log('pwd                  Print working directory');
  console.log('tree [path]          Display directory tree');
  console.log('');
  console.success('Examples:');
  console.log('  cd portfolio && ls -l');
  console.log('  tree portfolio');
}

function showSearchCheat(console: any) {
  console.log('🔍 Search Commands - Detailed Reference');
  console.log('');
  console.log('grep [pattern] [path]     Search through file contents');
  console.log('  grep "Unity"            Search all files for "Unity"');
  console.log('  grep "AI" portfolio     Search in portfolio directory');
  console.log('');
  console.log('find [pattern] [path]     Find files by name');
  console.log('  find "profile"          Find files with "profile" in name');
  console.log('  find ".json" skills     Find JSON files in skills directory');
  console.log('');
  console.success('Examples:');
  console.log('  grep "game development"');
  console.log('  find "summary"');
}

function showFilesCheat(console: any) {
  console.log('📄 File Commands - Detailed Reference');
  console.log('');
  console.log('cat [file]               Display file contents');
  console.log('  cat README.md          Read README file');
  console.log('  cat about/profile.md   Read file in subdirectory');
  console.log('');
  console.log('whoami                   Display quick introduction');
  console.log('');
  console.success('Key Files:');
  console.log('  README.md                - Portfolio guide');
  console.log('  user_profile.json        - Quick profile');
  console.log('  about/profile.md         - Full about me');
  console.log('  skills/summary.txt       - Skills overview');
  console.log('  portfolio/projects.md    - All projects');
  console.log('  contact/info.md          - Contact information');
}

// Register hint commands
registerCommand(hintCommand);
registerCommand(aliasCommand);
registerCommand(cheatCommand);

// Export for importing in main file
export { hintCommand, aliasCommand, cheatCommand };

