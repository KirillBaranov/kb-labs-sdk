import {
  usePlatform as baseUsePlatform,
  isPlatformConfigured,
  useLLM,
  isLLMAvailable,
  useAnalytics,
  trackAnalyticsEvent,
  useLogger,
  useLoggerWithContext,
  useStorage,
} from '@kb-labs/shared-command-kit';
import type {
  ResourceAvailability,
  ResourceType,
  TenantQuotas,
} from '@kb-labs/core-platform';
import {
  getMonitoringSnapshot,
  getDegradedStatus,
  type MonitoringSnapshot,
  type MonitoringOptions,
  type DegradedStatus,
  type DegradedOptions,
} from '@kb-labs/core-runtime';
import { findRepoRoot } from '@kb-labs/core-sys';

export const usePlatform = baseUsePlatform;
export {
  isPlatformConfigured,
  useLLM,
  isLLMAvailable,
  useAnalytics,
  trackAnalyticsEvent,
  useLogger,
  useLoggerWithContext,
  useStorage,
  findRepoRoot,
};

export type { ResourceAvailability, ResourceType, TenantQuotas } from '@kb-labs/core-platform';

// Monitoring surface (beta): re-export platform-level helpers directly
export {
  getMonitoringSnapshot,
  getDegradedStatus,
  type MonitoringSnapshot,
  type MonitoringOptions,
  type DegradedStatus,
  type DegradedOptions,
  type DegradedLevel,
} from '@kb-labs/core-runtime';
