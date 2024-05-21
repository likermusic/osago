import type { ToolkitStore } from '@reduxjs/toolkit/src/configureStore';

import type { GlobalState } from 'app/MyApp';
import type { IPersistedStore } from 'app/MyApp/lib/usePersistedStore/PersistedStore';

export const localStorageMock: Storage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
  key: jest.fn(),
  length: 0,
};

export class MockPersistedStore implements IPersistedStore {
  static onGetStore = jest.fn();
  static onSave = jest.fn();
  static onCheckIsRestored = jest.fn();
  constructor() {}

  getStore(): ToolkitStore<GlobalState> {
    return MockPersistedStore.onGetStore();
  }

  save(): void {
    MockPersistedStore.onSave();
  }

  checkIsRestored(): void {
    return MockPersistedStore.onCheckIsRestored();
  }
}
