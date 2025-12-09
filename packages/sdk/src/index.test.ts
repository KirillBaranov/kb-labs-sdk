import { describe, it, expect } from 'vitest';
import {
  defineCommand,
  defineManifest,
  getMonitoringSnapshot,
  getDegradedStatus,
  experimental,
} from './index';

describe('@kb-labs/sdk surface', () => {
  it('exposes CLI helpers', () => {
    expect(typeof defineCommand).toBe('function');
  });

  it('exposes manifest helpers', () => {
    expect(typeof defineManifest).toBe('function');
  });

  it('exposes monitoring hooks', () => {
    expect(typeof getMonitoringSnapshot).toBe('function');
    expect(typeof getDegradedStatus).toBe('function');
  });

  it('keeps experimental namespace', () => {
    expect(experimental).toBeDefined();
  });
});
