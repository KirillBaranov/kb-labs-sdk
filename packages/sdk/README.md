# @kb-labs/sdk

Facade for KB Labs plugins (CLI/REST/Jobs/Lifecycle). Import only `@kb-labs/sdk`—no direct deep imports into internal packages.

## Surface
- **CLI**: `defineCommand`, `defineFlags`, `validateFlags`, `withAnalytics`, `trackEvent`, types `CommandResult`, `CommandHandler`, `CommandConfig`.
- **Manifest**: `defineManifest`, `defineCommandFlags`, `permissions`, `validateManifestV2`, `ManifestV2` types.
- **Helpers**: `usePlatform`, `isPlatformConfigured`, `useLLM`, `useAnalytics`, `useLogger`, `useStorage`, `findRepoRoot`, beta monitoring via `getMonitoringSnapshot`, `getDegradedStatus`.
- **REST**: `defineRestHandler`.
- **Lifecycle**: `defineSetupHandler`, `defineDestroyHandler`.
- **Jobs**: `defineJob`.
- **UI**: `keyValue`, `safeKeyValue`, `formatTiming`, `formatTimingBreakdown`, `displayArtifactsCompact`, `TimingTracker` (via `@kb-labs/sdk/ui` or main entry).
- **Schema**: `schema.*` (Zod builders).
- **Experimental**: re-export of `@kb-labs/plugin-runtime` (no stability guarantees).

## Example
```ts
import { defineCommand, defineManifest, useLogger } from '@kb-labs/sdk';

export const hello = defineCommand({
  name: 'hello',
  flags: { name: { type: 'string' } },
  async handler(ctx, _argv, flags) {
    useLogger().info('hello command');
    ctx.output?.write(`Hello, ${flags.name ?? 'world'}!`);
    return { ok: true };
  },
});

export const manifest = defineManifest({
  schema: 'kb.plugin/2',
  id: '@kb-labs/example',
  version: '0.1.0',
  cli: { commands: [{ id: 'hello', handler: './commands/hello.js#hello' }] },
});
```

### Monitoring (beta)
```ts
import { getMonitoringSnapshot, getDegradedStatus } from '@kb-labs/sdk';

const snapshot = await getMonitoringSnapshot({ resources: ['llm'] });
const status = await getDegradedStatus();
```

## Scripts
- `pnpm --filter @kb-labs/sdk build`
- `pnpm --filter @kb-labs/sdk test`
- `pnpm --filter @kb-labs/sdk lint`

## Stability
- Stable: CLI, Manifest, Helpers (except monitoring hooks), REST, Lifecycle, Jobs, Schema.
- Beta: monitoring helpers (`getMonitoringSnapshot`, `getDegradedStatus`).
- Experimental: `@kb-labs/sdk/experimental`.
