/**
 * @module @kb-labs/sdk/platform
 * Platform services and plugin context
 */

// Plugin context
export {
  createPluginContext,
  createPluginContextWithPlatform,
} from '@kb-labs/plugin-runtime';

export type {
  PlatformServices,
  PluginContext,
  PluginContextOptions,
  PluginContextMetadata,
  CreatePluginContextWithPlatformOptions,
  ExecutionContext,
  RuntimeAPI,
  PluginHandlerContext,
  UIFacade,
  PresenterFacade,
} from '@kb-labs/plugin-runtime';

// Core platform service interfaces (re-export for convenience)
export type {
  IVectorStore,
  VectorRecord,
  VectorSearchResult,
  VectorFilter,
  IEmbeddings,
  ICache,
  IStorage,
  ILogger,
  IAnalytics,
  ILLM,
  LLMOptions,
  LLMResponse,
} from '@kb-labs/core-platform';
