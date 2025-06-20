// This file serves as the main entry point for registering all commands
// It's imported by the ConsoleProvider to ensure all commands are registered

// Import command registry
import '@/lib/commands/registry';

// Export public interfaces and functions from the commands system
export { 
  findCommand, 
  getAllCommands, 
  getCommandsByCategory,
  type Command,
  type CommandConsoleContext
} from '@/lib/commands/index';