/**
 * @kb-labs/sdk
 *
 * V3 Plugin System SDK - Helpers for command/route/action/webhook definitions and testing.
 */

// Command definitions
export {
  defineCommand,
  defineRoute,
  defineAction,
  defineWebhook,
  defineWebSocket,
  isCLIHost,
  isRESTHost,
  isWorkflowHost,
  isWebhookHost,
  isWSHost,
  type CommandHandler,
  type CommandDefinition,
  type CLIInput,
  type RouteHandler,
  type RouteDefinition,
  type ActionHandler,
  type ActionDefinition,
  type WebhookHandler,
  type WebhookDefinition,
  type WebSocketHandler,
  type WebSocketDefinition,
  type TypedSender,
  // Message system
  defineMessage,
  MessageBuilder,
  MessageRouter,
} from './command/index.js';

// Test utilities
export {
  createTestContext,
  type CreateTestContextOptions,
} from './test/index.js';

// Utilities
export {
  type ExtractHostContext,
  type ContextForHost,
} from './utils/index.js';

// Re-export UI utilities from shared
export {
  TimingTracker,
  useLoader,
  displayArtifacts,
  displayArtifactsCompact,
  displaySingleArtifact,
  type Loader,
  type ArtifactInfo,
  // Flags system
  defineFlags,
  mergeFlags,
  parseFlagsFromInput,
  type FlagsDefinition,
  type FlagsSchema,
  type FlagSpec,
  type StringFlagSpec,
  type BooleanFlagSpec,
  type NumberFlagSpec,
  type InferFlagsType,
  // Env system
  defineEnv,
  parseEnvFromRuntime,
  type EnvSchema,
  type EnvDefinition,
} from '@kb-labs/shared-cli-ui';

// Re-export helpers from shared-command-kit (for convenience)
export {
  usePlatform,
  isPlatformConfigured,
  useConfig,
  useLLM,
  isLLMAvailable,
  getLLMTier,
  useEmbeddings,
  isEmbeddingsAvailable,
  useVectorStore,
  isVectorStoreAvailable,
  useAnalytics,
  trackAnalyticsEvent,
  useLogger,
  useLoggerWithContext,
  useStorage,
  useCache,
  isCacheAvailable,
  // REST handler definition
  defineHandler,
  type Handler,
  type HandlerDefinition,
  type RestInput,
  // Error utilities
  defineError,
  PluginError,
  commonErrors,
  type ErrorDefinition,
  type ErrorDefinitions,
  // LLM types (for tier-based selection)
  type LLMTier,
  type UseLLMOptions,
} from '@kb-labs/shared-command-kit';

// Re-export platform adapter types from core-platform
export type {
  ILLM,
  LLMOptions,
  LLMResponse,
  IAnalytics,
  IStorage,
  ICache,
  IEmbeddings,
  ILogger,
  IVectorStore,
} from '@kb-labs/core-platform';

// Re-export sys utilities
export { findRepoRoot } from '@kb-labs/core-sys';

// TODO: Remove after migrating all Mind commands to V3
// Re-export config utilities (for legacy code - V3 commands should use useConfig())
// Used in: mind-cli/src/application/sync.ts, mind-cli/src/shared/knowledge.ts
export { findNearestConfig, readJsonWithDiagnostics, type FindNearestConfigOpts } from '@kb-labs/core-config';

// Re-export monitoring from runtime
export {
  getMonitoringSnapshot,
  getDegradedStatus,
  type MonitoringSnapshot,
  type MonitoringOptions,
  type DegradedStatus,
  type DegradedOptions,
  type DegradedLevel,
} from '@kb-labs/core-runtime';

// Re-export learning stores from platform
export { MemoryHistoryStore, MemoryFeedbackStore } from '@kb-labs/core-platform';

// Re-export knowledge utilities from knowledge-core
export type {
  KnowledgeService,
  KnowledgeServiceOptions,
  KnowledgeEngine,
  KnowledgeEngineFactory,
  KnowledgeEngineFactoryContext,
  KnowledgeExecutionContext,
  KnowledgeIndexOptions,
  KnowledgeLogger,
  KnowledgeErrorCode,
  KnowledgeErrorDetail,
} from '@kb-labs/knowledge-core';

export {
  createKnowledgeService,
  KnowledgeOrchestrator,
  KnowledgeEngineRegistry,
  createKnowledgeEngineRegistry,
  KnowledgeError,
  createKnowledgeError,
} from '@kb-labs/knowledge-core';

// Re-export knowledge types and constants from knowledge-contracts
export type {
  KnowledgeChunk,
  KnowledgeIntent,
  EmbeddingVector,
  KnowledgeEngineConfig,
  KnowledgeQuery,
  KnowledgeResult,
  KnowledgeScope,
  KnowledgeSource,
  KnowledgeSourceKind,
  KnowledgeConfigInput,
  SpanRange,
  IndexingStats,
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

export {
  AGENT_RESPONSE_SCHEMA_VERSION,
  CONFIDENCE_THRESHOLDS,
  isAgentError,
  isAgentSuccess,
} from '@kb-labs/knowledge-contracts';

// Manifest utilities
export {
  defineManifest,
  defineCommandFlags,
  // TODO: V3 migration - permissions helpers need to be rewritten for V3 PermissionSpec structure
  // permissions,
  generateExamples,
  type ExampleCase,
} from './manifest/index.js';

// Re-export contracts for convenience
export type {
  PluginContextV3,
  PluginContextDescriptor,
  HostContext,
  HostType,
  PermissionSpec,
  UIFacade,
  Colors,
  ColorFunction,
  SideBoxOptions,
  OutputSection,
  PlatformServices,
  RuntimeAPI,
  PluginAPI,
  CommandResult,
  CleanupFn,
  // Shell API types
  ShellAPI,
  ExecResult,
  ExecOptions,
  // Manifest types
  ManifestV3,
  // WebSocket types
  WebSocketHostContext,
  WSMessage,
  WSSender,
  WSLifecycleEvent,
  WSInput,
} from '@kb-labs/plugin-contracts';

// Re-export permission presets
export {
  // Presets
  minimal as minimalPreset,
  gitWorkflow as gitWorkflowPreset,
  npmPublish as npmPublishPreset,
  fullEnv as fullEnvPreset,
  kbPlatform as kbPlatformPreset,
  llmAccess as llmAccessPreset,
  vectorStore as vectorStorePreset,
  ciEnvironment as ciEnvironmentPreset,
  presets,
  // Builder
  combine as combinePermissions,
  combinePresets,
  // Types
  type PermissionPreset,
  type PresetBuilder,
} from '@kb-labs/perm-presets';

// Re-export Studio widget data types (for REST handlers)
export type {
  // Form widgets
  SelectData,
  SelectOptionItem,
  InputData,
  FormData,
  FormFieldError,
  CheckboxGroupData,
  CheckboxItem,
  SwitchData,
  DatePickerData,
  // Display widgets
  MetricData,
  MetricGroupData,
  TableData,
  TableRow,
  CardData,
  CardListData,
  TimelineData,
  TimelineItem,
  TreeData,
  TreeNode,
  JsonData,
  DiffData,
  LogsData,
  LogEntry,
  // Chart widgets
  ChartLineData,
  ChartBarData,
  ChartPieData,
  ChartAreaData,
  ChartSeries,
  ChartDataPoint,
  PieSlice,
  // Navigation widgets
  BreadcrumbData,
  BreadcrumbItemDef,
  StepperData,
  StepDef,
  MenuData,
  MenuItemDef,
  // Feedback widgets
  AlertData,
  ModalData,
  ConfirmData,
} from '@kb-labs/studio-contracts';
