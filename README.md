# KB Labs SDK

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

```bash
pnpm add @kb-labs/sdk
# or
npm install @kb-labs/sdk
```

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
```

For detailed API documentation, see [packages/sdk/README.md](./packages/sdk/README.md).

## Repository Structure

```
kb-labs-sdk/
├── packages/
│   └── sdk/                    # Main SDK package (@kb-labs/sdk)
│       ├── src/
│       │   ├── index.ts        # Main entry (re-exports all)
│       │   ├── cli.ts          # CLI commands
│       │   ├── manifest.ts     # Plugin manifests
│       │   ├── helpers.ts      # Platform helpers
│       │   ├── config.ts       # Configuration discovery
│       │   ├── platform.ts     # Platform services
│       │   ├── knowledge.ts    # Knowledge layer
│       │   ├── rest.ts         # REST handlers
│       │   ├── lifecycle.ts    # Setup/destroy handlers
│       │   ├── jobs.ts         # Background jobs
│       │   ├── schema.ts       # Zod schema builders
│       │   ├── ui.ts           # CLI UI helpers
│       │   └── experimental.ts # Unstable APIs
│       └── README.md           # Full API Reference
├── docs/
│   ├── adr/                    # Architecture Decision Records
│   ├── DOCUMENTATION.md        # Documentation standards
│   └── naming-convention.md    # Naming guidelines
├── CONTRIBUTING.md             # Contribution guide
└── README.md                   # This file
```

## Entry Points

SDK provides multiple entry points for tree-shaking and targeted imports:

| Entry Point | Description |
|-------------|-------------|
| `@kb-labs/sdk` | Main entry (re-exports all) |
| `@kb-labs/sdk/cli` | CLI command definition |
| `@kb-labs/sdk/manifest` | Plugin manifest definition |
| `@kb-labs/sdk/helpers` | Platform helpers (useLLM, useLogger, etc.) |
| `@kb-labs/sdk/config` | Configuration discovery |
| `@kb-labs/sdk/platform` | Platform services & PluginContext |
| `@kb-labs/sdk/knowledge` | Knowledge layer & RAG |
| `@kb-labs/sdk/rest` | REST endpoint handlers |
| `@kb-labs/sdk/lifecycle` | Setup/destroy handlers |
| `@kb-labs/sdk/jobs` | Background jobs |
| `@kb-labs/sdk/schema` | Zod schema builders |
| `@kb-labs/sdk/ui` | CLI UI helpers |
| `@kb-labs/sdk/experimental` | Unstable APIs |

## Bundled Packages

These internal packages are bundled into SDK's dist (plugin developers don't need to install them):

- `@kb-labs/shared-command-kit` - Command and manifest helpers
- `@kb-labs/shared-cli-ui` - CLI UI components
- `@kb-labs/plugin-manifest` - Manifest types and validation
- `@kb-labs/plugin-runtime` - Plugin runtime
- `@kb-labs/core-platform` - Platform abstractions
- `@kb-labs/core-runtime` - Runtime monitoring
- `@kb-labs/core-sys` - System utilities
- `@kb-labs/cli-contracts` - CLI context types
- `@kb-labs/knowledge-contracts` - Knowledge types
- `@kb-labs/knowledge-core` - Knowledge services

## Development

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.11.0

### Setup

```bash
# Install dependencies
pnpm install

# Build SDK
pnpm --filter @kb-labs/sdk build

# Run tests
pnpm --filter @kb-labs/sdk test

# Type check
pnpm --filter @kb-labs/sdk type-check
```

### Build Configuration

SDK uses the `@kb-labs/devkit/tsup/sdk.js` preset for bundling:

- Bundles all `@kb-labs/*` workspace packages into dist
- ESM format with TypeScript declarations
- Node.js built-ins kept external
- Problematic CJS packages (execa, glob, yaml, etc.) kept external

## Stability Tiers

| Tier | Description | Entry Points |
|------|-------------|--------------|
| **Stable** | Production-ready, semantic versioning | `cli`, `manifest`, `helpers`, `rest`, `lifecycle`, `jobs`, `schema`, `ui` |
| **Beta** | API may change in minor versions | `getMonitoringSnapshot`, `getDegradedStatus` |
| **Experimental** | No stability guarantees | `@kb-labs/sdk/experimental` |

## Documentation

- [Full API Reference](./packages/sdk/README.md) - Detailed API documentation with examples
- [Documentation Standards](./docs/DOCUMENTATION.md) - How to write docs
- [Naming Convention](./docs/naming-convention.md) - Package naming guidelines
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute

### Architecture Decision Records

- [ADR-0001: Architecture and Repository Layout](./docs/adr/0001-architecture-and-repository-layout.md)
- [ADR-0002: Plugins and Extensibility](./docs/adr/0002-plugins-and-extensibility.md)
- [ADR-0003: Package and Module Boundaries](./docs/adr/0003-package-and-module-boundaries.md)
- [ADR-0004: Versioning and Release Policy](./docs/adr/0004-versioning-and-release-policy.md)
- [ADR-0005: Use DevKit for Shared Tooling](./docs/adr/0005-use-devkit-for-shared-tooling.md)

## Related Packages

### Used By

- [@kb-labs/plugin-template](https://github.com/KirillBaranov/kb-labs-plugin-template) - Plugin starter template
- All KB Labs plugins

### Dependencies (peer)

- `execa` - Process execution
- `glob` - File globbing
- `minimatch` - Pattern matching
- `zod` - Schema validation
- `yaml` - YAML parsing

### Ecosystem

- [KB Labs](https://github.com/KirillBaranov/kb-labs) - Main ecosystem repository
- [KB Labs DevKit](https://github.com/KirillBaranov/kb-labs-devkit) - Build tooling
- [KB Labs Mind](https://github.com/KirillBaranov/kb-labs-mind) - RAG engine

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



## License

MIT License - see [LICENSE](LICENSE) for details.
