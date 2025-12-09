import {
  defineCommand,
  defineFlags,
  validateFlags,
  FlagValidationError,
  withAnalytics,
  trackEvent,
  defineError,
  PluginError,
  commonErrors,
  type CommandResult,
  type CommandHandler,
  type CommandFormatter,
  type CommandConfig,
  type SuccessResult,
  type ErrorResult,
  type ResultWith,
  type FlagSchemaDefinition,
  type InferFlags,
} from '@kb-labs/shared-command-kit';

export {
  defineCommand,
  defineFlags,
  validateFlags,
  FlagValidationError,
  withAnalytics,
  trackEvent,
  defineError,
  PluginError,
  commonErrors,
};

export type {
  CommandResult,
  CommandHandler,
  CommandFormatter,
  CommandConfig,
  SuccessResult,
  ErrorResult,
  ResultWith,
  FlagSchemaDefinition,
  InferFlags,
};

export type { CliContext } from '@kb-labs/cli-contracts';
