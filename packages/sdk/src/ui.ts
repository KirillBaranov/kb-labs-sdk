export {
  keyValue,
  safeKeyValue,
  formatTiming,
  formatTimingBreakdown,
  useLoader,
  discoverArtifacts,
} from '@kb-labs/shared-cli-ui';

export { displayArtifacts, displayArtifactsCompact } from '@kb-labs/shared-cli-ui';
export type { ArtifactInfo, ArtifactDisplayOptions } from '@kb-labs/shared-cli-ui';
export { TimingTracker } from '@kb-labs/shared-cli-ui';

// Output interface from core-sys
export type {
  Output,
  Spinner,
  ProgressDetails,
  ErrorOptions,
  UIUtilities,
  VerbosityLevel,
  OutputMode,
} from '@kb-labs/core-sys';

export { createOutput } from '@kb-labs/core-sys';
export type { OutputConfig } from '@kb-labs/core-sys';
