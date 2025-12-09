# KB Labs SDK (@kb-labs/sdk)

> **The official facade for KB Labs plugin development.** A single self-contained package that bundles all internal APIs (CLI, REST, Jobs, Lifecycle) into one stable entry point. No need for deep imports into internal packages.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20.0.0+-green.svg)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.11.0+-orange.svg)](https://pnpm.io/)

## Vision

KB Labs SDK provides a **stable, versioned API** for plugin developers. Instead of importing from multiple internal packages (`@kb-labs/shared-command-kit`, `@kb-labs/plugin-manifest`, `@kb-labs/core-platform`, etc.), you import everything from `@kb-labs/sdk`.

**Benefits:**
- **Single dependency** - Add only `@kb-labs/sdk` to your plugin
- **Self-contained** - All internal packages are bundled (no transitive dependencies)
- **Stable API** - Protected by snapshot tests, semantic versioning
- **Type-safe** - Full TypeScript support with exported types
- **Tree-shakeable** - ESM format with multiple entry points

## Quick Start

### Installation

```bash
pnpm add @kb-labs/sdk
# or
npm install @kb-labs/sdk
```

### Basic Plugin Example

```typescript
import {
  defineCommand,
  defineManifest,
  useLogger,
  type CommandResult,
} from '@kb-labs/sdk';

// Define a command
export const hello = defineCommand({
  name: 'hello',
  flags: {
    name: { type: 'string', description: 'Name to greet' },
  },
  async handler(ctx, _argv, flags): Promise<CommandResult> {
    const logger = useLogger();
    logger.info('Running hello command');

    ctx.output?.write(`Hello, ${flags.name ?? 'world'}!`);
    return { ok: true };
  },
});

// Define plugin manifest
export const manifest = defineManifest({
  schema: 'kb.plugin/2',
  id: '@kb-labs/my-plugin',
  version: '0.1.0',
  display: {
    name: 'My Plugin',
    description: 'Example plugin using KB Labs SDK',
    tags: ['example'],
  },
  cli: {
    commands: [{
      id: 'hello',
      group: 'my-plugin',
      describe: 'Say hello',
      handler: './commands/hello.js#hello',
    }],
  },
});
```

## Entry Points

SDK provides multiple entry points for tree-shaking and targeted imports:

| Entry Point | Description | Key Exports |
|-------------|-------------|-------------|
| `@kb-labs/sdk` | Main entry (re-exports all) | Everything below |
| `@kb-labs/sdk/cli` | CLI commands | `defineCommand`, `defineFlags`, `validateFlags` |
| `@kb-labs/sdk/manifest` | Plugin manifests | `defineManifest`, `defineCommandFlags`, `validateManifestV2` |
| `@kb-labs/sdk/helpers` | Platform helpers | `usePlatform`, `useLLM`, `useLogger`, `useStorage` |
| `@kb-labs/sdk/config` | Configuration | `findNearestConfig`, `resolveConfig`, `resolveWorkspaceRoot` |
| `@kb-labs/sdk/platform` | Platform services | `PlatformServices`, `PluginContext`, `createPluginContext` |
| `@kb-labs/sdk/knowledge` | Knowledge layer | `KnowledgeService`, `KnowledgeQuery`, `KnowledgeChunk` |
| `@kb-labs/sdk/rest` | REST handlers | `defineRestHandler` |
| `@kb-labs/sdk/lifecycle` | Setup/destroy handlers | `defineSetupHandler`, `defineDestroyHandler` |
| `@kb-labs/sdk/jobs` | Background jobs | `defineJob` |
| `@kb-labs/sdk/schema` | Zod schema builders | `schema.*`, `cwd`, `text`, `positiveInt` |
| `@kb-labs/sdk/ui` | CLI UI helpers | `keyValue`, `formatTiming`, `TimingTracker` |
| `@kb-labs/sdk/experimental` | Unstable APIs | `pluginRuntime` namespace |

## API Reference

### CLI (`@kb-labs/sdk/cli`)

```typescript
import {
  defineCommand,
  defineFlags,
  validateFlags,
  FlagValidationError,
  withAnalytics,
  trackEvent,
  type CommandResult,
  type CommandHandler,
  type CommandConfig,
} from '@kb-labs/sdk/cli';
```

**`defineCommand(config)`** - Define a CLI command with typed flags:

```typescript
const myCommand = defineCommand({
  name: 'my-command',
  flags: {
    verbose: { type: 'boolean', alias: 'v', default: false },
    output: { type: 'string', description: 'Output file' },
    count: { type: 'number', default: 1 },
  },
  async handler(ctx, argv, flags) {
    // flags.verbose is boolean
    // flags.output is string | undefined
    // flags.count is number
    return { ok: true, data: { processed: flags.count } };
  },
});
```

**`withAnalytics(handler)`** - Wrap handler with automatic analytics tracking:

```typescript
const trackedCommand = defineCommand({
  name: 'tracked',
  handler: withAnalytics(async (ctx, argv, flags) => {
    return { ok: true };
  }),
});
```

### Manifest (`@kb-labs/sdk/manifest`)

```typescript
import {
  defineManifest,
  defineCommandFlags,
  permissions,
  validateManifestV2,
  type ManifestV2,
  type CliCommandDecl,
  type PermissionSpec,
} from '@kb-labs/sdk/manifest';
```

**`defineManifest(config)`** - Create a type-safe plugin manifest:

```typescript
export const manifest = defineManifest({
  schema: 'kb.plugin/2',
  id: '@kb-labs/my-plugin',
  version: '1.0.0',
  display: {
    name: 'My Plugin',
    description: 'Does amazing things',
    tags: ['productivity', 'automation'],
  },
  platform: {
    llm: { required: false },
    analytics: { required: false },
  },
  permissions: [
    permissions.filesystem.read(['./src/**']),
    permissions.network.https(['api.example.com']),
  ],
  cli: {
    commands: [
      {
        id: 'run',
        group: 'my-plugin',
        describe: 'Run the plugin',
        flags: defineCommandFlags({
          dry: { type: 'boolean', description: 'Dry run mode' },
        }),
        handler: './commands/run.js#run',
      },
    ],
  },
  rest: {
    routes: [
      { method: 'GET', path: '/status', handler: './rest/status.js#handler' },
    ],
  },
});
```

**`permissions`** - Pre-built permission helpers:

```typescript
permissions.filesystem.read(['./src/**'])
permissions.filesystem.write(['./output/**'])
permissions.network.https(['api.openai.com'])
permissions.shell.exec(['git', 'npm'])
```

### Helpers (`@kb-labs/sdk/helpers`)

```typescript
import {
  usePlatform,
  isPlatformConfigured,
  useLLM,
  isLLMAvailable,
  useAnalytics,
  trackAnalyticsEvent,
  useLogger,
  useLoggerWithContext,
  useStorage,
  findRepoRoot,
  // Monitoring (beta)
  getMonitoringSnapshot,
  getDegradedStatus,
} from '@kb-labs/sdk/helpers';
```

**`usePlatform()`** - Access platform services:

```typescript
const platform = usePlatform();
const response = await platform.llm?.chat([
  { role: 'user', content: 'Hello!' }
]);
```

**`useLLM()`** - Direct LLM access:

```typescript
if (isLLMAvailable()) {
  const llm = useLLM();
  const response = await llm.chat([{ role: 'user', content: 'Summarize this' }]);
}
```

**`useLogger()`** - Structured logging:

```typescript
const logger = useLogger();
logger.info('Processing started', { count: 10 });
logger.warn('Missing config', { file: '.env' });
logger.error('Failed to connect', { error: err });
```

**`findRepoRoot(cwd)`** - Find repository root:

```typescript
const root = await findRepoRoot(process.cwd());
// Returns path to nearest directory with .git
```

**Monitoring (beta)**:

```typescript
const snapshot = await getMonitoringSnapshot({ resources: ['llm', 'storage'] });
// { llm: { available: true, latency: 120 }, storage: { available: true } }

const status = await getDegradedStatus();
// { level: 'healthy' | 'degraded' | 'critical', details: [...] }
```

### Config (`@kb-labs/sdk/config`)

```typescript
import {
  findNearestConfig,
  resolveConfig,
  resolveWorkspaceRoot,
  type FindNearestConfigOpts,
  type WorkspaceRootResolution,
} from '@kb-labs/sdk/config';
```

**`findNearestConfig(filename, opts)`** - Find nearest config file walking up directories:

```typescript
const result = await findNearestConfig('kb.config.json', {
  startDir: process.cwd(),
  stopAt: '/home/user',
});
// { path: '/project/.kb/kb.config.json', content: {...} }
```

**`resolveWorkspaceRoot(options)`** - Resolve workspace root directory:

```typescript
const resolution = await resolveWorkspaceRoot({
  startDir: process.cwd(),
  markers: ['.git', 'pnpm-workspace.yaml'],
});
// { root: '/project', marker: '.git' }
```

### Platform (`@kb-labs/sdk/platform`)

```typescript
import {
  createPluginContext,
  type PlatformServices,
  type PluginContext,
  type IVectorStore,
  type ILLM,
} from '@kb-labs/sdk/platform';
```

**`createPluginContext(options)`** - Create plugin execution context:

```typescript
const ctx = createPluginContext({
  pluginId: '@kb-labs/my-plugin',
  pluginVersion: '1.0.0',
  requestId: crypto.randomUUID(),
});

// Access platform services
const llm = ctx.platform.llm;
const vectorStore = ctx.platform.vectorStore;
```

**Platform service interfaces:**

```typescript
// LLM service
interface ILLM {
  chat(messages: ChatMessage[], options?: LLMOptions): Promise<LLMResponse>;
  embed(text: string): Promise<number[]>;
}

// Vector store service
interface IVectorStore {
  upsert(records: VectorRecord[]): Promise<void>;
  search(query: number[], options?: SearchOptions): Promise<VectorSearchResult[]>;
  delete(ids: string[]): Promise<void>;
}
```

### Knowledge (`@kb-labs/sdk/knowledge`)

```typescript
import {
  createKnowledgeService,
  KnowledgeEngineRegistry,
  isAgentSuccess,
  isAgentError,
  type KnowledgeQuery,
  type KnowledgeChunk,
  type AgentResponse,
} from '@kb-labs/sdk/knowledge';
```

**`createKnowledgeService(options)`** - Create knowledge service instance:

```typescript
const service = createKnowledgeService({
  config: knowledgeConfig,
  platform: platformServices,
});

// Query knowledge base
const result = await service.query({
  text: 'How does authentication work?',
  scope: 'default',
  maxChunks: 10,
});

if (isAgentSuccess(result)) {
  console.log(result.answer);
  console.log(result.sources); // Source chunks with citations
}
```

**Knowledge query types:**

```typescript
interface KnowledgeQuery {
  text: string;                    // Natural language query
  scope?: string;                  // Knowledge scope ID
  maxChunks?: number;              // Max results to return
  filters?: KnowledgeQueryFilters; // Optional filters
}

interface KnowledgeChunk {
  id: string;
  content: string;
  source: string;                  // File path or URL
  score: number;                   // Relevance score 0-1
  metadata?: Record<string, any>;
}
```

### REST (`@kb-labs/sdk/rest`)

```typescript
import {
  defineRestHandler,
  type RestHandlerContext,
  type RestSuccessResponse,
  type RestErrorResponse,
} from '@kb-labs/sdk/rest';
```

**`defineRestHandler(config)`** - Define REST endpoint handler:

```typescript
export const handler = defineRestHandler({
  method: 'GET',
  path: '/status',
  async handler(ctx) {
    return {
      status: 200,
      data: { healthy: true, version: '1.0.0' },
    };
  },
});

// POST with body validation
export const createHandler = defineRestHandler({
  method: 'POST',
  path: '/items',
  async handler(ctx) {
    const body = ctx.body as { name: string };
    const item = await createItem(body.name);
    return { status: 201, data: item };
  },
});
```

### Lifecycle (`@kb-labs/sdk/lifecycle`)

```typescript
import {
  defineSetupHandler,
  defineDestroyHandler,
  type SetupResult,
  type LifecycleContext,
} from '@kb-labs/sdk/lifecycle';
```

**`defineSetupHandler(config)`** - Run on plugin installation:

```typescript
export const setup = defineSetupHandler({
  name: 'my-plugin-setup',
  async handler(ctx): Promise<SetupResult> {
    // Create directories, initialize config, etc.
    await fs.mkdir('.my-plugin', { recursive: true });
    return { success: true };
  },
});
```

**`defineDestroyHandler(config)`** - Run on plugin uninstallation:

```typescript
export const destroy = defineDestroyHandler({
  name: 'my-plugin-destroy',
  async handler(ctx) {
    // Cleanup resources
    await fs.rm('.my-plugin', { recursive: true });
  },
});
```

### Jobs (`@kb-labs/sdk/jobs`)

```typescript
import {
  defineJob,
  type JobDefinition,
  type JobHandler,
} from '@kb-labs/sdk/jobs';
```

**`defineJob(config)`** - Define background job:

```typescript
export const syncJob = defineJob({
  name: 'sync-data',
  schedule: '0 * * * *', // Every hour
  async handler(ctx, input) {
    const { source, target } = input as { source: string; target: string };
    await syncData(source, target);
    return { synced: true };
  },
});
```

### Schema (`@kb-labs/sdk/schema`)

Zod-based schema builders for flag validation:

```typescript
import {
  cwd,
  text,
  positiveInt,
  nonNegativeInt,
  enumSchema,
  pluginId,
  commandId,
  filePath,
  url,
  schema,
} from '@kb-labs/sdk/schema';

// Use in command flags validation
const flags = {
  path: cwd(),           // Validates as directory path
  name: text(),          // Non-empty string
  count: positiveInt(),  // Integer > 0
  mode: enumSchema(['fast', 'slow']),
};
```

### UI (`@kb-labs/sdk/ui`)

```typescript
import {
  keyValue,
  safeKeyValue,
  formatTiming,
  formatTimingBreakdown,
  displayArtifactsCompact,
  TimingTracker,
} from '@kb-labs/sdk/ui';
```

**`keyValue(key, value)`** - Format key-value for CLI output:

```typescript
console.log(keyValue('Status', 'Running'));
// Status: Running

console.log(keyValue('Count', 42));
// Count: 42
```

**`TimingTracker`** - Track operation timings:

```typescript
const tracker = new TimingTracker();

tracker.start('parse');
// ... parsing logic
tracker.end('parse');

tracker.start('transform');
// ... transform logic
tracker.end('transform');

console.log(formatTimingBreakdown(tracker.getBreakdown()));
// parse:     120ms (40%)
// transform: 180ms (60%)
// total:     300ms
```

## Types

SDK exports all necessary types:

```typescript
import type {
  // Command types
  CommandResult,
  CommandHandler,
  CommandConfig,
  SuccessResult,
  ErrorResult,

  // Manifest types
  ManifestV2,
  CliCommandDecl,
  RestRouteDecl,
  PermissionSpec,
  PlatformRequirements,

  // Platform types
  ILLM,
  LLMOptions,
  LLMResponse,
  IAnalytics,
  ILogger,
  IStorage,

  // Context types
  CliContext,
  RestHandlerContext,
  LifecycleContext,

  // Monitoring types (beta)
  MonitoringSnapshot,
  DegradedStatus,
} from '@kb-labs/sdk';
```

## Stability Tiers

| Tier | Description | Entry Points |
|------|-------------|--------------|
| **Stable** | Production-ready, semantic versioning | `cli`, `manifest`, `helpers`, `rest`, `lifecycle`, `jobs`, `schema`, `ui` |
| **Beta** | API may change in minor versions | `getMonitoringSnapshot`, `getDegradedStatus` |
| **Experimental** | No stability guarantees | `@kb-labs/sdk/experimental` |

## Build Configuration

SDK uses the `@kb-labs/devkit/tsup/sdk.js` preset for bundling:

```typescript
// tsup.config.ts
import { defineConfig } from 'tsup';
import sdkPreset from '@kb-labs/devkit/tsup/sdk.js';

export default defineConfig({
  ...sdkPreset,
  tsconfig: 'tsconfig.build.json',
  entry: [
    'src/index.ts',
    'src/cli.ts',
    'src/manifest.ts',
    // ... other entry points
  ],
});
```

**SDK preset features:**
- Bundles all `@kb-labs/*` workspace packages into dist
- ESM format with TypeScript declarations
- Node.js built-ins kept external
- Problematic CJS packages (execa, glob, etc.) kept external

## Migrating from Internal Packages

### Before (multiple dependencies)

```json
{
  "dependencies": {
    "@kb-labs/shared-command-kit": "workspace:*",
    "@kb-labs/plugin-manifest": "workspace:*",
    "@kb-labs/shared-cli-ui": "workspace:*",
    "@kb-labs/core-sys": "workspace:*"
  }
}
```

```typescript
import { defineCommand } from '@kb-labs/shared-command-kit';
import { defineManifest } from '@kb-labs/plugin-manifest';
import { keyValue } from '@kb-labs/shared-cli-ui';
import { findRepoRoot } from '@kb-labs/core-sys';
```

### After (single dependency)

```json
{
  "dependencies": {
    "@kb-labs/sdk": "workspace:*"
  }
}
```

```typescript
import {
  defineCommand,
  defineManifest,
  keyValue,
  findRepoRoot,
} from '@kb-labs/sdk';
```

## Scripts

```bash
# Build SDK
pnpm --filter @kb-labs/sdk build

# Run tests
pnpm --filter @kb-labs/sdk test

# Type check
pnpm --filter @kb-labs/sdk type-check

# Lint
pnpm --filter @kb-labs/sdk lint
```

## API Surface Testing

SDK uses snapshot tests to prevent accidental API changes:

```typescript
// src/api-surface.test.ts
it('exports should match snapshot', () => {
  const exports = Object.keys(sdk).sort();
  expect(exports).toMatchInlineSnapshot([
    'FlagValidationError',
    'defineCommand',
    'defineManifest',
    // ... all exports
  ]);
});
```

Any new export must be intentionally added to the snapshot.

## Requirements

- **Node.js**: >= 20.0.0
- **pnpm**: >= 9.11.0

## Related Packages

### Bundled Internally

These packages are bundled into SDK's dist (no need to install separately):

- `@kb-labs/shared-command-kit` - Command and manifest helpers
- `@kb-labs/shared-cli-ui` - CLI UI components
- `@kb-labs/plugin-manifest` - Manifest types and validation
- `@kb-labs/plugin-runtime` - Plugin runtime (experimental)
- `@kb-labs/core-platform` - Platform abstractions
- `@kb-labs/core-runtime` - Runtime monitoring
- `@kb-labs/core-sys` - System utilities
- `@kb-labs/cli-contracts` - CLI context types

### External Dependencies

These must be installed by consumers (peer dependencies):

- `execa` - Process execution
- `glob` - File globbing
- `minimatch` - Pattern matching
- `zod` - Schema validation

## License

MIT
