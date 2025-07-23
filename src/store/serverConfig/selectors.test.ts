import { describe, expect, it, vi } from 'vitest';

import { DEFAULT_FEATURE_FLAGS, mapFeatureFlagsEnvToState } from '@/config/featureFlags';

import { featureFlagsSelectors, serverConfigSelectors } from './selectors';
import { initServerConfigStore } from './store';

vi.mock('zustand/traditional');

describe('featureFlagsSelectors', () => {
  it('should return mapped feature flags from store', () => {
    const store = initServerConfigStore({
      featureFlags: {
        language_model_settings: false,
        edit_agent: false,
      },
    });

    const result = featureFlagsSelectors(store.getState());

    const expected = mapFeatureFlagsEnvToState({
      ...DEFAULT_FEATURE_FLAGS,
      language_model_settings: false,
      edit_agent: false,
    });

    expect(result).toEqual(expected);
  });
});

describe('serverConfigSelectors', () => {
  describe('enabledOAuthSSO', () => {
    it('should return enabledOAuthSSO value from store', () => {
      const store = initServerConfigStore({
        serverConfig: {
          enabledOAuthSSO: true,
          telemetry: {},
          aiProvider: {},
        },
      });

      const result = serverConfigSelectors.enabledOAuthSSO(store.getState());

      expect(result).toBe(true);
    });
  });

  describe('enabledTelemetryChat', () => {
    it('should return langfuse value from store when defined', () => {
      const store = initServerConfigStore({
        serverConfig: {
          telemetry: { langfuse: true },
          aiProvider: {},
        },
      });

      const result = serverConfigSelectors.enabledTelemetryChat(store.getState());

      expect(result).toBe(true);
    });

    it('should return false when langfuse is not defined', () => {
      const store = initServerConfigStore({
        serverConfig: {
          telemetry: {},
          aiProvider: {},
        },
      });

      const result = serverConfigSelectors.enabledTelemetryChat(store.getState());

      expect(result).toBe(false);
    });
  });
});
