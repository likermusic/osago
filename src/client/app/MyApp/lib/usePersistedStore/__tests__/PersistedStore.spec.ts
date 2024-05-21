import { APP_ROUTES } from 'constants/routes';

import type { GlobalState } from '../../../model/store';
import { PersistedStore } from '../PersistedStore';

const mockCustomLocalStorageGet = jest.fn();
const mockCustomLocalStorageSet = jest.fn();

jest.mock('shared/lib/customStorage', () => ({
  customSessionStorage: {
    remove: jest.fn(),
    get: jest.fn().mockImplementation(() => mockCustomLocalStorageGet()),
    set: jest.fn().mockImplementation((key, value) => mockCustomLocalStorageSet(key, value)),
  },
}));

jest.mock('../../../model/store', () => ({
  getOrCreateStore: (values: Record<string, unknown>) => ({
    getState: () => values,
  }),
}));

describe('WHEN "PersistedStore" is created', () => {
  const validPersistedStore = {
    carInfo: {
      data: {
        carNumber: 'c911tt123',
      },
    },
  } as GlobalState;

  const validDefaultStore = {
    carInfo: {
      data: {
        carNumber: '',
      },
    },
  } as GlobalState;

  Object.defineProperty(window, 'location', {
    value: {
      pathname: APP_ROUTES.anketa,
    },
  });

  describe('AND data are presented in localstorage', () => {
    it('AND data are valid, MUST create store with data from localstorage', () => {
      mockCustomLocalStorageGet.mockReturnValue(JSON.stringify(validPersistedStore));
      const reduxStore = new PersistedStore(validDefaultStore, [APP_ROUTES.anketa]);

      expect(reduxStore.getStore().getState().carInfo).toEqual(validPersistedStore.carInfo);
    });

    it('AND route is not in whitelist, MUST create store with default data only', () => {
      mockCustomLocalStorageGet.mockReturnValue('invalidPersistedStore');
      const reduxStore = new PersistedStore(validDefaultStore, [APP_ROUTES.main]);

      expect(reduxStore.getStore().getState().carInfo).toEqual(validDefaultStore.carInfo);
    });

    it('AND data are not valid, MUST create store with default data only', () => {
      mockCustomLocalStorageGet.mockReturnValue('invalidPersistedStore');
      const reduxStore = new PersistedStore(validDefaultStore, [APP_ROUTES.anketa]);

      expect(reduxStore.getStore().getState().carInfo).toEqual(validDefaultStore.carInfo);
    });
  });

  it('AND data are not presented, MUST create store with default data only', () => {
    mockCustomLocalStorageGet.mockReturnValue(undefined);
    const reduxStore = new PersistedStore(validDefaultStore, [APP_ROUTES.anketa]);

    expect(reduxStore.getStore().getState().carInfo).toEqual(validDefaultStore.carInfo);
  });

  it('AND "save" was called, MUST save data to localstorage', () => {
    const reduxStore = new PersistedStore(validDefaultStore, [APP_ROUTES.anketa]);

    const savedData: Record<string, unknown> = {};
    const state = reduxStore.getStore().getState();

    PersistedStore.PERSISTED_FIELD_KEYS.forEach((key) => {
      savedData[key as string] = state[key];
    });

    reduxStore.save();

    expect(mockCustomLocalStorageSet).toHaveBeenCalledWith('appState-v2', JSON.stringify(savedData));
  });
});
