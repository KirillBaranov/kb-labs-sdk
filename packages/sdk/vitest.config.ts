import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: false,
  },
  resolve: {
    alias: {
      '@kb-labs/shared-command-kit': path.resolve(__dirname, '../../../kb-labs-shared/packages/shared-command-kit/src'),
      '@kb-labs/shared-cli-ui': path.resolve(__dirname, '../../../kb-labs-shared/packages/shared-cli-ui/src'),
      '@kb-labs/plugin-runtime': path.resolve(__dirname, '../../../kb-labs-plugin/packages/plugin-runtime/src'),
      '@kb-labs/plugin-manifest': path.resolve(__dirname, '../../../kb-labs-plugin/packages/plugin-manifest/src'),
      '@kb-labs/cli-contracts': path.resolve(__dirname, '../../../kb-labs-cli/packages/cli-contracts/src'),
      '@kb-labs/core-platform': path.resolve(__dirname, '../../../kb-labs-core/packages/core-platform/src'),
      '@kb-labs/core-runtime': path.resolve(__dirname, '../../../kb-labs-core/packages/core-runtime/src'),
      '@kb-labs/core-sys': path.resolve(__dirname, '../../../kb-labs-core/packages/core-sys/src'),
    },
  },
});
