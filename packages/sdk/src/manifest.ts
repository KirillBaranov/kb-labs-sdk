export {
  defineManifest,
  defineCommandFlags,
  permissions,
} from '@kb-labs/shared-command-kit';

export {
  validateManifestV2,
  manifestV2Schema,
} from '@kb-labs/plugin-manifest';

export type {
  ManifestV2,
  ManifestV1,
  CliCommandDecl,
  RestRouteDecl,
  PermissionSpec,
  PlatformRequirements,
  DisplayMetadata,
  // Studio widget types
  CardData,
  CardListData,
  InfoPanelSection,
  InfoPanelData,
  KeyValueItem,
  KeyValueData,
  // Handler type
  Handler,
  // Note: PluginContext is exported from platform.ts to avoid conflicts
} from '@kb-labs/plugin-manifest';
