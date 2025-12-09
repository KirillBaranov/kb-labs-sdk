import { describe, it, expect } from 'vitest';
import * as sdk from './index';

describe('@kb-labs/sdk API surface snapshot', () => {
  it('exports should match snapshot', () => {
    const exports = Object.keys(sdk).sort();

    // Snapshot test - will fail if any export is added/removed
    expect(exports).toMatchInlineSnapshot(`
      [
        "FlagValidationError",
        "TimingTracker",
        "artifactId",
        "commandId",
        "cwd",
        "defineCommand",
        "defineCommandFlags",
        "defineDestroyHandler",
        "defineFlags",
        "defineJob",
        "defineManifest",
        "defineRestHandler",
        "defineSetupHandler",
        "displayArtifactsCompact",
        "enumSchema",
        "experimental",
        "filePath",
        "findRepoRoot",
        "formatTiming",
        "formatTimingBreakdown",
        "getDegradedStatus",
        "getMonitoringSnapshot",
        "isLLMAvailable",
        "isPlatformConfigured",
        "keyValue",
        "manifestV2Schema",
        "nonNegativeInt",
        "permissions",
        "pluginId",
        "positiveInt",
        "safeKeyValue",
        "schema",
        "scopeId",
        "text",
        "trackAnalyticsEvent",
        "trackEvent",
        "url",
        "useAnalytics",
        "useLLM",
        "useLogger",
        "useLoggerWithContext",
        "usePlatform",
        "useStorage",
        "validateFlags",
        "validateManifestV2",
        "withAnalytics",
      ]
    `);
  });

  it('stable exports should be functions or objects', () => {
    // Core command helpers
    expect(typeof sdk.defineCommand).toBe('function');
    expect(typeof sdk.defineFlags).toBe('function');
    expect(typeof sdk.validateFlags).toBe('function');

    // Manifest helpers
    expect(typeof sdk.defineManifest).toBe('function');
    expect(typeof sdk.defineCommandFlags).toBe('function');
    expect(typeof sdk.validateManifestV2).toBe('function');

    // Platform helpers
    expect(typeof sdk.usePlatform).toBe('function');
    expect(typeof sdk.useLLM).toBe('function');
    expect(typeof sdk.useAnalytics).toBe('function');
    expect(typeof sdk.useLogger).toBe('function');
    expect(typeof sdk.useStorage).toBe('function');
    expect(typeof sdk.findRepoRoot).toBe('function');

    // Monitoring helpers (beta)
    expect(typeof sdk.getMonitoringSnapshot).toBe('function');
    expect(typeof sdk.getDegradedStatus).toBe('function');

    // REST helpers
    expect(typeof sdk.defineRestHandler).toBe('function');

    // Lifecycle helpers
    expect(typeof sdk.defineSetupHandler).toBe('function');
    expect(typeof sdk.defineDestroyHandler).toBe('function');

    // Jobs helpers
    expect(typeof sdk.defineJob).toBe('function');

    // Schema builders
    expect(typeof sdk.schema).toBe('object');
    expect(typeof sdk.cwd).toBe('function');
    expect(typeof sdk.text).toBe('function');

    // UI helpers
    expect(typeof sdk.keyValue).toBe('function');
    expect(typeof sdk.formatTiming).toBe('function');
    expect(sdk.TimingTracker).toBeDefined();

    // Permissions
    expect(sdk.permissions).toBeDefined();

    // Experimental namespace
    expect(sdk.experimental).toBeDefined();
  });
});
