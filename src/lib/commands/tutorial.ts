import { Command, registerCommand, CommandConsoleContext } from '@/lib/commands/index';

// Welcome message that can be shown on first load
export function showWelcomeMessage(console: CommandConsoleContext) {
  console.log('');
  console.log('     ____  _     __                   _   __      __  __    ____        __  _ ');
  console.log('    / __ \\(_)___/ /_  ____ __   __   / | / /___ _/ /_/ /_  / __ \\____ _/ /_(_)');
  console.log('   / /_/ / / ___/ __ \\/ __ `/ | / /  /  |/ / __ `/ __/ __ \\/ /_/ / __ `/ __/ / ');
  console.log('  / _, _/ (__  ) / / / /_/ /| |/ /  / /|  / /_/ / /_/ / / / ____/ /_/ / /_/ /  ');
  console.log(' /_/ |_/_/____/_/ /_/\\__,_/ |___/  /_/ |_/\\__,_/\\__/_/ /_/_/    \\__,_/\\__/_/   ');
  console.log('');
  console.success('╔═══════════════════════════════════════════════════════════════════════╗');
  console.success('║             Welcome to My Interactive Portfolio!                      ║');
  console.success('╚═══════════════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('🎮 Game & Interactive Media Dev @ Convai');
  console.log('Building AI NPCs, speech systems, and VR experiences in Unity');
  console.log('');
  console.log('This portfolio works like a Unix terminal - explore using commands!');
  console.log('');
  console.log('⭐ Start Here (the good stuff):');
  console.log('  cat featured/START_HERE.txt     # Quick intro to my best work');
  console.log('  cat featured/current-work.md    # What I\'m building now');
  console.log('  cat featured/best-projects.json # Top 4 projects');
  console.log('');
  console.log('📚 Full Exploration:');
  console.log('  🌳 tree             - See everything');
  console.log('  🔍 grep "AI"        - Find AI-related work');
  console.log('  ❓ help             - All commands');
  console.log('  🎯 tour             - Guided walkthrough');
  console.log('');
  console.log('💡 Pro Tips:');
  console.log('  • Use ↑/↓ arrow keys to navigate command history');
  console.log('  • Try "terminal" for full-screen mode');
  console.log('  • Hidden easter eggs await discovery... 🎮');
  console.log('');
  console.success('Type "tour" to begin your journey! 🚀');
  console.log('');
}

// Tour command - guided interactive experience
const tourCommand: Command = {
  name: 'tour',
  description: 'Take an interactive guided tour of the portfolio',
  usage: 'tour',
  category: 'information',
  aliases: ['guide', 'start'],
  execute: (args, console) => {
    console.success('╔═══════════════════════════════════════════════════════════════════════╗');
    console.success('║                    🚀 PORTFOLIO TOUR - START                          ║');
    console.success('╚═══════════════════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('Welcome! Let me guide you through exploring this portfolio.');
    console.log('');
    console.log('STEP 1: Start with the Good Stuff');
    console.log('───────────────────────────────────────');
    console.log('First, check out the featured work:');
    console.log('');
    console.log('  ⭐ ~/featured/         - Best projects and current work');
    console.log('');
    console.log('Try: cat featured/START_HERE.txt');
    console.log('');
    console.log('This file gives you the quick version - what I\'m building now,');
    console.log('my best projects, and where to go next.');
    console.log('');
    console.log('');
    console.log('STEP 2: Understanding the File System');
    console.log('───────────────────────────────────────');
    console.log('The full structure:');
    console.log('');
    console.log('  📁 ~/featured/     - ⭐ START HERE');
    console.log('  📁 ~/portfolio/    - All projects');
    console.log('  📁 ~/about/        - Background and experience');
    console.log('  📁 ~/skills/       - Technical skills');
    console.log('  📁 ~/experience/   - Work history');
    console.log('  📁 ~/education/    - Academic background');
    console.log('  📁 ~/contact/      - How to reach me');
    console.log('');
    console.log('Try: tree');
    console.log('');
    console.log('');
    console.log('STEP 3: Navigation Commands');
    console.log('───────────────────────────────────────');
    console.log('  cd [directory]  - Change directory');
    console.log('  ls [-l]         - List contents (use -l for details)');
    console.log('  pwd             - Show current location');
    console.log('  cd ~            - Return to home directory');
    console.log('');
    console.log('Try: cd about');
    console.log('');
    console.log('');
    console.log('STEP 3: Viewing Content');
    console.log('───────────────────────────────────────');
    console.log('  cat [file]      - Display file contents');
    console.log('  tree            - Show directory structure');
    console.log('');
    console.log('Try: cat about/profile.md');
    console.log('');
    console.log('');
    console.log('STEP 4: Search & Discovery');
    console.log('───────────────────────────────────────');
    console.log('  grep [pattern]  - Search through all files');
    console.log('  find [name]     - Find files by name');
    console.log('');
    console.log('Try: grep "Unity"');
    console.log('');
    console.log('');
    console.log('STEP 5: Explore Projects');
    console.log('───────────────────────────────────────');
    console.log('My work is categorized in the portfolio directory:');
    console.log('');
    console.log('Try: cat portfolio/projects.md');
    console.log('');
    console.log('');
    console.success('═══════════════════════════════════════════════════════════════════════');
    console.log('');
    console.log('🎯 Suggested Commands to Try Next:');
    console.log('  1. cat featured/START_HERE.txt    - Jump to the good stuff');
    console.log('  2. cat featured/best-projects.json - See top 4 projects');
    console.log('  3. grep "AI"                      - Find AI-related content');
    console.log('  4. tree                           - See the full structure');
    console.log('  5. cat contact/info.md            - Get my contact info');
    console.log('');
    console.log('🎮 Easter Eggs:');
    console.log('  • Try the Konami code (↑↑↓↓←→←→BA)');
    console.log('  • Type "help --all" to discover hidden commands');
    console.log('');
    console.success('Happy exploring! Type "help" anytime for assistance. 🚀');
    console.log('');
  }
};

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
        case 'filesystem':
          filesystemTutorial(console);
          break;
        case 'easter-eggs':
          easterEggsTutorial(console);
          break;
        default:
          console.error(`Unknown tutorial section: ${section}`);
          console.log('Available tutorial sections: navigation, commands, filesystem, easter-eggs');
      }
      
      return;
    }
    
    // Main tutorial
    console.log('╭───────────────────────────────────────────────────────╮');
    console.success('│          INTERACTIVE PORTFOLIO TUTORIAL              │');
    console.log('╰───────────────────────────────────────────────────────╯');
    console.log('');
    console.log('This portfolio is a fully functional terminal interface!');
    console.log('');
    console.log('Available Tutorials:');
    console.log('  tutorial navigation   - Learn navigation commands');
    console.log('  tutorial commands     - Learn about all commands');
    console.log('  tutorial filesystem   - Understand the file structure');
    console.log('  tutorial easter-eggs  - Discover fun easter eggs');
    console.log('');
    console.log('Or take the full guided tour:');
    console.log('  tour                  - Complete guided experience');
    console.log('');
    console.success('Tip: Use "help" to see all available commands anytime!');
  }
};

// Filesystem tutorial
const filesystemTutorial = (console: CommandConsoleContext) => {
  console.log('╭───────────────────────────────────────────────────────╮');
  console.success('│          FILESYSTEM STRUCTURE TUTORIAL               │');
  console.log('╰───────────────────────────────────────────────────────╯');
  console.log('');
  console.log('This portfolio uses a virtual Unix-like filesystem:');
  console.log('');
  console.log('Directory Structure:');
  console.log('  ~/                    - Root directory');
  console.log('  ├── featured/        - ⭐ START HERE - Best work');
  console.log('  ├── portfolio/       - All projects & work');
  console.log('  ├── about/           - Personal background');
  console.log('  ├── skills/          - Technical skills');
  console.log('  ├── experience/      - Work history');
  console.log('  ├── education/       - Academic background');
  console.log('  ├── contact/         - Contact information');
  console.log('  └── README.md        - Portfolio guide');
  console.log('');
  console.log('Navigation:');
  console.log('  cd about        - Enter about directory');
  console.log('  cd ~            - Return to root');
  console.log('  cd ..           - Go up one level');
  console.log('  pwd             - Show current location');
  console.log('');
  console.log('Viewing Files:');
  console.log('  cat README.md              - Read a file');
  console.log('  cat about/profile.md       - Read file in subdirectory');
  console.log('  ls -l                      - Detailed file listing');
  console.log('');
  console.success('Try: tree (to see the complete structure)');
};

// Navigation tutorial
const navigationTutorial = (console: CommandConsoleContext) => {
  console.log('╭───────────────────────────────────────────────────────╮');
  console.success('│             NAVIGATION COMMANDS TUTORIAL             │');
  console.log('╰───────────────────────────────────────────────────────╯');
  console.log('');
  console.log('Essential Navigation Commands:');
  console.log('');
  console.log('📂 cd [directory]    - Change directory');
  console.log('   Examples:');
  console.log('   • cd about        - Go to about directory');
  console.log('   • cd ~            - Go to home directory');
  console.log('   • cd ..           - Go up one level');
  console.log('');
  console.log('📋 ls [options]      - List directory contents');
  console.log('   Examples:');
  console.log('   • ls              - Simple listing');
  console.log('   • ls -l           - Detailed listing with permissions');
  console.log('   • ls portfolio    - List specific directory');
  console.log('');
  console.log('📍 pwd               - Print working directory');
  console.log('');
  console.log('🌳 tree              - View directory structure');
  console.log('');
  console.success('Try it: cd about && ls -l');
};

// Commands tutorial
const commandsTutorial = (console: CommandConsoleContext) => {
  console.log('╭───────────────────────────────────────────────────────╮');
  console.success('│              ALL AVAILABLE COMMANDS                   │');
  console.log('╰───────────────────────────────────────────────────────╯');
  console.log('');
  console.log('📂 Navigation & Browsing:');
  console.log('  cd, ls, pwd, tree');
  console.log('');
  console.log('📄 Viewing Content:');
  console.log('  cat [file]          - Display file contents');
  console.log('  whoami              - Show quick intro');
  console.log('');
  console.log('🔍 Search & Discovery:');
  console.log('  grep [pattern]      - Search file contents');
  console.log('  find [name]         - Find files by name');
  console.log('');
  console.log('🛠️ Utility:');
  console.log('  help                - Show all commands');
  console.log('  clear               - Clear console');
  console.log('  history             - View command history');
  console.log('  echo [text]         - Display text');
  console.log('  open [url]          - Open URL in new tab');
  console.log('  terminal            - Toggle fullscreen');
  console.log('');
  console.log('📚 Learning:');
  console.log('  tour                - Guided portfolio tour');
  console.log('  tutorial            - Interactive tutorials');
  console.log('');
  console.log('🎮 Pro Tips:');
  console.log('  • ↑/↓ keys navigate command history');
  console.log('  • Combine commands: cd portfolio && cat projects.md');
  console.log('  • Use Tab for autocomplete (coming soon!)');
  console.log('');
  console.success('Type "help" to see this list anytime!');
};

// Easter eggs tutorial
const easterEggsTutorial = (console: CommandConsoleContext) => {
  console.log('╭───────────────────────────────────────────────────────╮');
  console.success('│               🎮 EASTER EGGS GUIDE                    │');
  console.log('╰───────────────────────────────────────────────────────╯');
  console.log('');
  console.warn('⚠️  Spoiler Alert! Hidden surprises ahead...');
  console.log('');
  console.log('This portfolio contains several hidden easter eggs:');
  console.log('');
  console.log('🎮 Konami Code:');
  console.log('   Press: ↑ ↑ ↓ ↓ ← → ← → B A');
  console.log('   (Use arrow keys, then type "b" and "a")');
  console.log('');
  console.log('💻 Classic Unix Jokes:');
  console.log('   • sudo [anything]');
  console.log('   • rm -rf /');
  console.log('   • make me a sandwich');
  console.log('');
  console.log('☕ Fun Commands:');
  console.log('   • coffee');
  console.log('   • matrix');
  console.log('   • rickroll');
  console.log('');
  console.log('🔍 Hidden Features:');
  console.log('   • Try "help --all" to see hidden commands');
  console.log('   • Look for special file names');
  console.log('   • Experiment with command combinations');
  console.log('');
  console.success('Happy hunting! There may be more than listed here... 🕵️');
};

// Register the commands
registerCommand(tourCommand);
registerCommand(tutorialCommand);

// Export for importing in main file
// Note: showWelcomeMessage is already exported inline at the top
export { tourCommand, tutorialCommand }; 