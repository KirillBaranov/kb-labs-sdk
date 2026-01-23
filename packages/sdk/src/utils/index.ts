/**
 * Shared utilities
 */

/**
 * Type-safe helper to extract host context type
 */
export type ExtractHostContext<T extends string> = Extract<
  import('@kb-labs/plugin-contracts').HostContext,
  { host: T }
>;

/**
 * Type-safe helper to narrow plugin context by host type
 */
export type ContextForHost<T extends string, TConfig = unknown> = Omit<
  import('@kb-labs/plugin-contracts').PluginContextV3<TConfig>,
  'hostContext'
> & {
  hostContext: ExtractHostContext<T>;
};
