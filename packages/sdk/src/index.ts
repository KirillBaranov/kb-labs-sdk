export * from './cli';
export * from './manifest';
export * from './helpers';
export * from './rest';
export * from './lifecycle';
export * from './jobs';
export * from './schema';
export * from './ui';
export * as experimental from './experimental';

// Surface core platform types for convenience
export type {
  ILLM,
  LLMOptions,
  LLMResponse,
  IAnalytics,
  ILogger,
  IStorage,
  IResourceManager,
  ResourceAvailability,
  ResourceType,
  TenantQuotas,
} from '@kb-labs/core-platform';

// Plugin manifest types
export type {
  ManifestV2,
  ManifestV1,
  CliCommandDecl,
  RestRouteDecl,
  PermissionSpec,
  PlatformRequirements,
} from '@kb-labs/plugin-manifest';

// CLI context type
export type { CliContext } from '@kb-labs/cli-contracts';
