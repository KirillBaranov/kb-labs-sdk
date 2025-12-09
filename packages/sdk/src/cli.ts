import {
  defineCommand,
  defineFlags,
  validateFlags,
  FlagValidationError,
  withAnalytics,
  trackEvent,
  type CommandResult,
  type CommandHandler,
  type CommandFormatter,
  type CommandConfig,
  type SuccessResult,
  type ErrorResult,
  type ResultWith,
} from '@kb-labs/shared-command-kit';

export {
  defineCommand,
  defineFlags,
  validateFlags,
  FlagValidationError,
  withAnalytics,
  trackEvent,
};

export type {
  CommandResult,
  CommandHandler,
  CommandFormatter,
  CommandConfig,
  SuccessResult,
  ErrorResult,
  ResultWith,
};

export type { CliContext } from '@kb-labs/cli-contracts';
