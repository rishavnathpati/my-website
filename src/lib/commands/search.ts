import { Command, registerCommand } from '@/lib/commands/index';
import { findFiles, grepFiles, generateTree } from '@/lib/filesystem';

// GREP command - search for patterns in files
const grepCommand: Command = {
  name: 'grep',
  description: 'Search for patterns in file contents',
  usage: 'grep [pattern] [path]',
  category: 'utility',
  execute: (args, console) => {
    if (args.length === 0) {
      console.error('Usage: grep [pattern] [path]');
      console.log('Example: grep "Unity" - Search for "Unity" in all files');
      console.log('Example: grep "React" portfolio - Search in portfolio directory');
      return;
    }

    const pattern = args[0];
    const searchPath = args[1] || '';
    
    console.log(`Searching for "${pattern}"...`);
    console.log('');
    
    const results = grepFiles(pattern, searchPath);
    
    if (results.length === 0) {
      console.warn(`No matches found for "${pattern}"`);
      console.log('Try using a different search term or check your spelling');
      return;
    }
    
    console.success(`Found ${results.length} file(s) with matches:`);
    console.log('');
    
    results.forEach(result => {
      console.success(`📄 ${result.path}`);
      result.matches.slice(0, 5).forEach(match => {
        console.log(`   ${match}`);
      });
      if (result.matches.length > 5) {
        console.log(`   ... and ${result.matches.length - 5} more matches`);
      }
      console.log('');
    });
    
    console.log(`💡 Tip: Use "cat ${results[0].path}" to view the full file`);
  }
};

// FIND command - search for files by name
const findCommand: Command = {
  name: 'find',
  description: 'Search for files by name',
  usage: 'find [pattern] [path]',
  category: 'utility',
  execute: (args, console) => {
    if (args.length === 0) {
      console.error('Usage: find [pattern] [path]');
      console.log('Example: find "profile" - Find files with "profile" in the name');
      console.log('Example: find ".json" skills - Find JSON files in skills directory');
      return;
    }

    const pattern = args[0];
    const searchPath = args[1] || '';
    
    console.log(`Searching for files matching "${pattern}"...`);
    console.log('');
    
    const results = findFiles(pattern, searchPath);
    
    if (results.length === 0) {
      console.warn(`No files found matching "${pattern}"`);
      console.log('Try using a wildcard pattern or check your spelling');
      return;
    }
    
    console.success(`Found ${results.length} file(s):`);
    console.log('');
    
    results.forEach(result => {
      const icon = result.file.type === 'directory' ? '📁' : '📄';
      const displayPath = result.path;
      console.log(`${icon} ${displayPath}`);
    });
    
    console.log('');
    if (results.length > 0) {
      const firstResult = results[0];
      if (firstResult.file.type === 'directory') {
        console.log(`💡 Tip: Use "cd ${firstResult.path}" to navigate to this directory`);
      } else {
        console.log(`💡 Tip: Use "cat ${firstResult.path}" to view this file`);
      }
    }
  }
};

// TREE command - display directory structure
const treeCommand: Command = {
  name: 'tree',
  description: 'Display directory structure as a tree',
  usage: 'tree [path]',
  category: 'navigation',
  execute: (args, console) => {
    const path = args[0] || '';
    
    console.log('Generating directory tree...');
    console.log('');
    
    const treeLines = generateTree(path);
    
    if (treeLines.length === 0) {
      console.error(`tree: ${path}: No such directory`);
      return;
    }
    
    treeLines.forEach(line => console.log(line));
    
    console.log('');
    console.log('💡 Tip: Use "cd [directory]" to navigate or "cat [file]" to read files');
  }
};

// Register search commands
registerCommand(grepCommand);
registerCommand(findCommand);
registerCommand(treeCommand);

// Export for importing in main file
export { grepCommand, findCommand, treeCommand };

