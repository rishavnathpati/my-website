import { Command, registerCommand } from '@/lib/commands/index';
import { 
  getFileAtPath, 
  listDirectory, 
  currentDirectory, 
  setCurrentDirectory,
  resolvePath 
} from '@/lib/filesystem';

// Helper function to scroll to a section
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    return true;
  }
  return false;
};

// CD command for navigating between directories AND sections
const cdCommand: Command = {
  name: 'cd',
  description: 'Change directory or navigate to a section',
  usage: 'cd [directory]',
  category: 'navigation',
  execute: (args, console) => {
    // If no args, show current location and available directories
    if (args.length === 0) {
      const dirs = listDirectory(currentDirectory);
      const dirNames = dirs.filter(d => d.type === 'directory').map(d => d.name);
      
      console.log(`Current directory: ~/${currentDirectory}`);
      console.log('');
      console.log('Available directories:');
      dirNames.forEach(name => console.log(`  ${name}/`));
      
      if (currentDirectory === '') {
        console.log('');
        console.log('💡 Tip: Use "cd about" to explore my background');
      }
      return;
    }

    let targetPath = args[0];
    
    // Handle going to home
    if (targetPath === '~' || targetPath === '/') {
      setCurrentDirectory('');
      console.success('Changed directory to ~/');
      return;
    }
    
    // Remove trailing slash
    if (targetPath.endsWith('/')) {
      targetPath = targetPath.slice(0, -1);
    }
    
    // Try to resolve as a file system path first
    const resolvedPath = resolvePath(targetPath, currentDirectory);
    const targetDir = getFileAtPath(resolvedPath);
    
    if (targetDir && targetDir.type === 'directory') {
      setCurrentDirectory(resolvedPath);
      console.success(`Changed directory to ~/${resolvedPath || ''}`);
      
      // Show what's in the directory
      const contents = listDirectory(resolvedPath);
      if (contents.length > 0) {
        console.log('');
        console.log('Contents:');
        contents.forEach(item => {
          const icon = item.type === 'directory' ? '📁' : '📄';
          const name = item.type === 'directory' ? `${item.name}/` : item.name;
          console.log(`  ${icon} ${name}`);
        });
      }
      return;
    }
    
    // If not a directory, check if it's a page section for backward compatibility
    const sectionMap: Record<string, string> = {
      'home': 'hero',
      'about': 'about',
      'experience': 'experience',
      'skills': 'skills',
      'portfolio': 'portfolio-highlights',
      'blogs': 'blogs',
      'contact': 'contact-cta'
    };
    
    const sectionId = sectionMap[targetPath.toLowerCase()];
    if (sectionId && scrollToSection(sectionId)) {
      console.success(`Navigated to ${targetPath} section`);
      return;
    }
    
    // Not found
    console.error(`cd: ${targetPath}: No such directory`);
    console.log('Use "ls" to see available directories');
  }
};

// LS command for listing directory contents
const lsCommand: Command = {
  name: 'ls',
  description: 'List directory contents',
  usage: 'ls [-l] [path]',
  category: 'navigation',
  aliases: ['dir'],
  execute: (args, console) => {
    // Check for flags
    const hasLongFormat = args.includes('-l') || args.includes('-la') || args.includes('-al');
    const hasAll = args.includes('-a') || args.includes('-la') || args.includes('-al');
    
    // Get path (filter out flags)
    const pathArgs = args.filter(arg => !arg.startsWith('-'));
    const path = pathArgs.length > 0 ? pathArgs[0] : currentDirectory;
    
    const resolvedPath = resolvePath(path, currentDirectory);
    const targetDir = getFileAtPath(resolvedPath);
    
    if (!targetDir) {
      console.error(`ls: cannot access '${path}': No such file or directory`);
      return;
    }
    
    if (targetDir.type !== 'directory') {
      // If it's a file, just show the file name
      console.log(targetDir.name);
      return;
    }
    
    const contents = listDirectory(resolvedPath);
    
    if (contents.length === 0) {
      console.log('(empty directory)');
      return;
    }
    
    // Long format
    if (hasLongFormat) {
      console.log(`total ${contents.length}`);
      contents.forEach(item => {
        const permissions = item.permissions || (item.type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--');
        const size = item.size ? item.size.toString().padStart(6) : '   N/A';
        const modified = item.modified || 'Jan 15';
        const name = item.type === 'directory' ? `${item.name}/` : item.name;
        const color = item.type === 'directory' ? '📁' : '📄';
        
        console.log(`${permissions}  ${size}  ${modified}  ${color} ${name}`);
      });
    } else {
      // Simple format - show in columns
      const dirs = contents.filter(c => c.type === 'directory').sort((a, b) => a.name.localeCompare(b.name));
      const files = contents.filter(c => c.type === 'file').sort((a, b) => a.name.localeCompare(b.name));
      
      // Show directories first
      dirs.forEach(dir => {
        console.log(`📁 ${dir.name}/`);
      });
      
      // Then files
      files.forEach(file => {
        const ext = file.name.split('.').pop() || '';
        let icon = '📄';
        if (ext === 'md') icon = '📝';
        else if (ext === 'json') icon = '📋';
        else if (ext === 'txt') icon = '📄';
        
        console.log(`${icon} ${file.name}`);
      });
    }
    
    // Show helpful hint for root directory
    if (resolvedPath === '' || resolvedPath === '~') {
      console.log('');
      console.log('💡 Tip: Use "cd [directory]" to explore or "cat [file]" to read files');
    }
  }
};

// PWD command - print working directory
const pwdCommand: Command = {
  name: 'pwd',
  description: 'Print current working directory',
  usage: 'pwd',
  category: 'navigation',
  execute: (args, console) => {
    const path = currentDirectory === '' ? '~' : `~/${currentDirectory}`;
    console.log(path);
  }
};

// Register navigation commands
registerCommand(cdCommand);
registerCommand(lsCommand);
registerCommand(pwdCommand);

// Export for importing in main file
export { cdCommand, lsCommand, pwdCommand }; 
