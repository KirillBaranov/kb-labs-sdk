import { defineConfig } from 'tsup';
import sdkPreset from '@kb-labs/devkit/tsup/sdk.js';

export default defineConfig({
  ...sdkPreset,
  tsconfig: 'tsconfig.build.json',
  entry: [
    'src/index.ts',
    'src/cli.ts',
    'src/manifest.ts',
    'src/helpers.ts',
    'src/config.ts',
    'src/platform.ts',
    'src/knowledge.ts',
    'src/rest.ts',
    'src/lifecycle.ts',
    'src/jobs.ts',
    'src/schema.ts',
    'src/ui.ts',
    'src/experimental.ts',
  ],
});
