/**
 * @module @kb-labs/sdk/config
 * Configuration discovery and workspace utilities
 */

// Config discovery and resolution
export {
  findNearestConfig,
  readJsonWithDiagnostics,
  resolveConfig,
  mergeDefined,
  pickDefined,
} from '@kb-labs/core-config';

export type {
  FindNearestConfigOpts,
  JsonReadResult,
  Diagnostic,
  ResolveConfigArgs,
} from '@kb-labs/core-config';

// Workspace root resolution
export {
  resolveWorkspaceRoot,
} from '@kb-labs/core-workspace';

export type {
  WorkspaceRootResolution,
  ResolveWorkspaceRootOptions,
} from '@kb-labs/core-workspace';
