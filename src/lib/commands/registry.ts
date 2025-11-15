// Import all command categories to register them with the registry
import '@/lib/commands/utility';
import '@/lib/commands/navigation';
import '@/lib/commands/information';
import '@/lib/commands/search';
import '@/lib/commands/hints';
import '@/lib/commands/easter-eggs';
import '@/lib/commands/tutorial';

// This file doesn't export anything itself, it just ensures
// all the command files are imported, which registers the commands 