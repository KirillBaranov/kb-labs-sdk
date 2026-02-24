# KB Labs SDK

> **The official facade for KB Labs plugin development.** A single stable entry point for building KB Labs plugins — commands, REST handlers, actions, webhooks, and more.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20.0.0+-green.svg)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.11.0+-orange.svg)](https://pnpm.io/)

## 🎯 Vision

KB Labs SDK provides a **stable, versioned API** for plugin developers. Instead of importing from multiple internal packages (`@kb-labs/shared-command-kit`, `@kb-labs/plugin-manifest`, `@kb-labs/core-platform`, etc.), you import everything from `@kb-labs/sdk`.

**Benefits:**
- **Single dependency** - Add only `@kb-labs/sdk` to your plugin
- **Self-contained** - All internal packages are bundled (no transitive dependencies)
- **Stable API** - Protected by snapshot tests, semantic versioning
- **Type-safe** - Full TypeScript support with exported types

## 🚀 Quick Start

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

## 📁 Repository Structure

```
kb-labs-sdk/
├── packages/
│   └── sdk/                    # Main SDK package (@kb-labs/sdk)
│       ├── src/
│       │   ├── index.ts        # Main entry point (re-exports all)
│       │   ├── command/        # Command/route/action/webhook definitions
│       │   ├── manifest/       # Plugin manifest utilities
│       │   ├── test/           # Legacy test utilities (createTestContext)
│       │   ├── testing/        # Full mock builders (./testing entry point)
│       │   └── utils/          # Type utilities (ExtractHostContext, etc.)
│       └── README.md           # Package API reference
├── docs/
│   ├── adr/                    # Architecture Decision Records
│   └── DOCUMENTATION.md        # Documentation standards
├── CONTRIBUTING.md             # Contribution guide
└── README.md                   # This file
```

## 📦 Entry Points

| Entry Point | Description |
|-------------|-------------|
| `@kb-labs/sdk` | Main entry — commands, manifest, platform helpers, types |
| `@kb-labs/sdk/testing` | Full mock builders for unit testing plugins |

## 🧩 Bundled Packages

These internal packages are bundled into SDK's dist (plugin developers don't need to install them separately):

- `@kb-labs/shared-command-kit` - Platform helpers (useLogger, useLLM, useCache, etc.)
- `@kb-labs/shared-cli-ui` - CLI UI components (loaders, artifacts, env system)
- `@kb-labs/shared-tool-kit` - Tool factory (createTool)
- `@kb-labs/perm-presets` - Permission presets
- `@kb-labs/plugin-contracts` - Plugin context types (V3)
- `@kb-labs/core-platform` - Platform adapter types (ILLM, ICache, ILogger, etc.)
- `@kb-labs/core-runtime` - Runtime monitoring (getMonitoringSnapshot)
- `@kb-labs/core-sys` - System utilities (findRepoRoot)
- `@kb-labs/studio-contracts` - Studio widget data types (for REST handlers)

## 🛠️ Development

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

## 📊 Stability Tiers

| Tier | Description | Entry Points |
|------|-------------|--------------|
| **Stable** | Production-ready, semantic versioning | `@kb-labs/sdk` (main entry) |
| **Beta** | API may change in minor versions | `getMonitoringSnapshot`, `getDegradedStatus` |
| **Experimental** | No stability guarantees | `@kb-labs/sdk/testing` |

## 📚 Documentation

- [Package README](./packages/sdk/README.md) - API reference with examples
- [Documentation Standards](./docs/DOCUMENTATION.md) - Documentation guidelines
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute

### Architecture Decision Records

- [ADR-0001: Architecture and Repository Layout](./docs/adr/0001-architecture-and-repository-layout.md)
- [ADR-0002: Plugins and Extensibility](./docs/adr/0002-plugins-and-extensibility.md)
- [ADR-0003: Package and Module Boundaries](./docs/adr/0003-package-and-module-boundaries.md)
- [ADR-0004: Versioning and Release Policy](./docs/adr/0004-versioning-and-release-policy.md)
- [ADR-0005: Use DevKit for Shared Tooling](./docs/adr/0005-use-devkit-for-shared-tooling.md)

## 🔗 Related Packages

### Used By

- All KB Labs plugins (the SDK is the primary plugin dependency)

### Ecosystem

- [KB Labs](https://github.com/KirillBaranov/kb-labs) - Main ecosystem repository
- [KB Labs DevKit](https://github.com/KirillBaranov/kb-labs-devkit) - Build tooling

## 📋 Requirements

- **Node.js:** >= 20.0.0
- **pnpm:** >= 9.11.0

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



## 📄 License

MIT © KB Labs — see [LICENSE](LICENSE) for details.

---

**See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines and contribution process.**
