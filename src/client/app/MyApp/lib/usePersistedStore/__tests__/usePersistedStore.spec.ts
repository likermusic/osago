import { act, renderHook } from '@testing-library/react-hooks';

import { MockPersistedStore } from 'mocks/helpers/localStorage';

import type { GlobalState } from '../../../model/store';
import { usePersistedStore } from '../usePersistedStore';

jest.mock('../PersistedStore', () => ({
  PersistedStore: jest.fn().mockImplementation(() => new MockPersistedStore()),
}));

describe('WHEN "usePersistedStore" is mounted', () => {
  const store = {
    carInfo: {},
    insurer: {},
    order: {},
    user: {},
  } as GlobalState;

  const reduxStore = {
    getState: () => store,
  };

  beforeAll(() => {
    MockPersistedStore.onGetStore.mockReturnValue(reduxStore);
  });

  it('MUST return reduxStore', () => {
    const { result } = renderHook(() => usePersistedStore(store));

    expect(result.current).toEqual(reduxStore);
  });

  it('AND user close page, MUST save store to local storage', () => {
    renderHook(() => usePersistedStore(store));

    act(() => {
      window.dispatchEvent(new Event('beforeunload'));
    });

    expect(MockPersistedStore.onSave).toHaveBeenCalled();
  });
});
