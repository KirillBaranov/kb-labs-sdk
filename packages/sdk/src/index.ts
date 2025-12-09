export * from './cli';
export * from './manifest';
export * from './helpers';
export * from './config';
export * from './platform';
export * from './knowledge';
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
  ICache,
  IEmbeddings,
  IVectorStore,
  IHistoryStore,
  IFeedbackStore,
  HistoryRecord,
  FeedbackRecord,
  IResourceManager,
  ResourceAvailability,
  ResourceType,
  TenantQuotas,
} from '@kb-labs/core-platform';

// Learning stores (platform-level)
export { MemoryHistoryStore, MemoryFeedbackStore } from '@kb-labs/core-platform';

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
