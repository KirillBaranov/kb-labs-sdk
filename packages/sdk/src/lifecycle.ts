export {
  defineSetupHandler,
  defineDestroyHandler,
  type SetupHandlerDefinition,
  type DestroyHandlerDefinition,
  type LifecycleContext,
  type SetupResult,
} from '@kb-labs/shared-command-kit';

import { SetupBuilder as SetupBuilderClass } from '@kb-labs/setup-engine-operations';
import type { OperationWithMetadata } from '@kb-labs/setup-engine-operations';

export { SetupBuilderClass as SetupBuilder };
export type { OperationWithMetadata };

// ============================================================================
// High-Level Setup API (defineSetup)
// ============================================================================

/**
 * File to create during setup
 *
 * @template TContent - Content type (for typed JSON files)
 */
export interface SetupFile<TContent = string> {
  /** File path relative to project root */
  path: string;
  /** File content (string or function returning string) */
  content: TContent extends string ? string | (() => string) : TContent | (() => TContent);
  /** Optional description for logging */
  description?: string;
}

/**
 * Config section to merge during setup
 *
 * @template TValue - Config value type (optional, defaults to unknown)
 */
export interface SetupConfigSection<TValue = unknown> {
  /** JSON pointer path (e.g., 'plugins.myPlugin') */
  pointer: string;
  /** Value to merge */
  value: TValue;
  /** Config file path (default: .kb/kb-labs.config.json) */
  path?: string;
  /** Merge strategy */
  strategy?: 'shallow' | 'deep' | 'replace';
}

/**
 * Script to add to package.json
 */
export interface SetupScript {
  /** Script name */
  name: string;
  /** Script command */
  command: string;
  /** Script description (for comments) */
  description?: string;
}

/**
 * Declarative setup configuration
 *
 * All fields are optional - use what you need.
 * Type parameters are also optional - use them for stricter typing when helpful.
 *
 * @template TConfigValue - Type for config section values (optional)
 */
export interface SetupConfig<TConfigValue = unknown> {
  /** Files to create */
  files?: SetupFile[];
  /** Config sections to merge */
  config?: SetupConfigSection<TConfigValue>[];
  /** Scripts to suggest in package.json */
  scripts?: SetupScript[];
  /** Gitignore patterns to suggest */
  gitignore?: string[];
  /** Notes/hints for the user */
  notes?: string[];
}

/**
 * Setup result with operations and suggestions
 */
export interface SetupOutput {
  /** Operations to execute */
  operations: OperationWithMetadata[];
  /** Suggested gitignore patterns */
  gitignore?: string[];
  /** Notes for the user */
  notes?: string[];
}

/**
 * Define plugin setup declaratively
 *
 * Type parameters are optional - use them when you want stricter typing,
 * skip them for simplicity. The API works the same either way.
 *
 * @template TConfigValue - Type for config section values (optional)
 *
 * @example
 * ```typescript
 * // Simple usage (no generics needed)
 * import { defineSetup } from '@kb-labs/sdk/lifecycle';
 *
 * export const setup = defineSetup({
 *   files: [
 *     { path: '.kb/my-plugin/config.json', content: '{}' },
 *   ],
 *   config: [
 *     { pointer: 'plugins.myPlugin', value: { enabled: true } },
 *   ],
 *   scripts: [
 *     { name: 'my-plugin:run', command: 'kb my-plugin run' },
 *   ],
 *   gitignore: ['.kb/my-plugin/cache/'],
 *   notes: ['Run `kb my-plugin init` to get started'],
 * });
 * ```
 *
 * @example
 * ```typescript
 * // With typed config (optional - for stricter validation)
 * interface MyPluginConfig {
 *   enabled: boolean;
 *   apiKey?: string;
 *   options: { maxRetries: number };
 * }
 *
 * export const setup = defineSetup<MyPluginConfig>({
 *   config: [
 *     {
 *       pointer: 'plugins.myPlugin',
 *       value: {
 *         enabled: true,
 *         options: { maxRetries: 3 }, // TypeScript validates this!
 *       },
 *     },
 *   ],
 * });
 * ```
 */
export function defineSetup<TConfigValue = unknown>(
  config: SetupConfig<TConfigValue>
): SetupOutput {
  const builder = new SetupBuilderClass();

  // Add files
  for (const file of config.files ?? []) {
    const content = typeof file.content === 'function' ? file.content() : file.content;
    builder.ensureFile(file.path, content, {
      metadata: file.description ? { description: file.description } : undefined,
    });
  }

  // Add config sections
  for (const section of config.config ?? []) {
    builder.ensureConfigSection(section.pointer, section.value, {
      path: section.path,
      strategy: section.strategy,
    });
  }

  // Add scripts
  for (const script of config.scripts ?? []) {
    builder.suggestScript(script.name, {
      command: script.command,
      description: script.description,
    });
  }

  return {
    operations: builder.build().operations,
    gitignore: config.gitignore,
    notes: config.notes,
  };
}
