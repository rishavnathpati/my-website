import { LogMessage } from '@/components/ui/console-provider';

// Custom error classes for command execution
export class CommandError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CommandError';
  }
}

export class ArgumentError extends CommandError {
  constructor(message: string) {
    super(message);
    this.name = 'ArgumentError';
  }
}

export class ExecutionError extends CommandError {
  constructor(message: string) {
    super(message);
    this.name = 'ExecutionError';
  }
}

// Extended ConsoleContextType that will be available to command handlers
export interface CommandConsoleContext {
  log: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
  success: (message: string) => void;
  clear?: () => void; // Optional clear method that will be implemented
  commandHistory?: string[]; // Add command history
  toggleTerminal?: (show: boolean) => void; // Toggle full-screen terminal
}

// Command definition interface
export interface Command {
  name: string;
  description: string;
  usage: string;
  category: 'navigation' | 'information' | 'utility' | 'easteregg';
  aliases?: string[];
  execute: (args: string[], console: CommandConsoleContext) => void;
}

// Registry to store all commands
const commandRegistry: Command[] = [];
// Map for fast command lookup
const commandMap = new Map<string, Command>();

// Helper to register commands
export function registerCommand(command: Command): void {
  commandRegistry.push(command);
  
  // Add to the lookup map for O(1) access
  commandMap.set(command.name, command);
  if (command.aliases) {
    command.aliases.forEach(alias => commandMap.set(alias, command));
  }
}

// Helper to find a command by name or alias
export function findCommand(name: string): Command | undefined {
  return commandMap.get(name);
}

// Get all commands
export function getAllCommands(): Command[] {
  return [...commandRegistry];
}

// Get commands by category
export function getCommandsByCategory(category: Command['category']): Command[] {
  return commandRegistry.filter((cmd) => cmd.category === category);
} 