/**
 * @module @kb-labs/sdk/knowledge
 * Knowledge layer contracts and services
 */

// === CONTRACTS (from knowledge-contracts) ===

// Core types
export type {
  KnowledgeSource,
  KnowledgeSourceKind,
  KnowledgeScope,
  KnowledgeEngineType,
  KnowledgeEngineConfig,
  KnowledgeEngineOptions,
  // Query types
  KnowledgeIntent,
  KnowledgeQuery,
  KnowledgeQueryFilters,
  KnowledgeChunk,
  KnowledgeResult,
  SpanRange,
  // Config types
  KnowledgeConfig,
  KnowledgeConfigInput,
  KnowledgeDefaults,
  KnowledgeCapability,
  KnowledgeCapabilityRegistry,
  KnowledgeProfile,
  KnowledgeProfileSettings,
  // Embedding types
  EmbeddingVector,
  IndexedChunk,
} from '@kb-labs/knowledge-contracts';

// Agent response types
export type {
  AgentQueryMode,
  AgentSourceKind,
  AgentSource,
  AgentMeta,
  AgentSuggestion,
  AgentWarning,
  AgentWarningCode,
  AgentDebugInfo,
  AgentSourcesSummary,
  AgentResponse,
  AgentErrorCode,
  AgentErrorResponse,
} from '@kb-labs/knowledge-contracts';

// Constants
export {
  knowledgeSourceKinds,
  knowledgeEngineTypes,
  knowledgeIntents,
  AGENT_RESPONSE_SCHEMA_VERSION,
  CONFIDENCE_THRESHOLDS,
} from '@kb-labs/knowledge-contracts';

// Type guards
export {
  isAgentError,
  isAgentSuccess,
} from '@kb-labs/knowledge-contracts';

// === CORE (from knowledge-core) ===

// Service
export {
  createKnowledgeService,
  KnowledgeOrchestrator,
} from '@kb-labs/knowledge-core';

export type {
  KnowledgeService,
  KnowledgeServiceOptions,
} from '@kb-labs/knowledge-core';

// Engine
export type {
  KnowledgeEngine,
  KnowledgeEngineFactory,
  KnowledgeEngineFactoryContext,
  KnowledgeExecutionContext,
  KnowledgeIndexOptions,
} from '@kb-labs/knowledge-core';

// Registry
export {
  KnowledgeEngineRegistry,
  createKnowledgeEngineRegistry,
} from '@kb-labs/knowledge-core';

// Errors
export {
  KnowledgeError,
  createKnowledgeError,
} from '@kb-labs/knowledge-core';

export type {
  KnowledgeErrorCode,
  KnowledgeErrorDetail,
} from '@kb-labs/knowledge-core';

// Logger
export type { KnowledgeLogger } from '@kb-labs/knowledge-core';
