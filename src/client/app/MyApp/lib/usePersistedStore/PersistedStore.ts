import type { ToolkitStore } from '@reduxjs/toolkit/src/configureStore';

import { localStorageKeys } from 'shared/config/localStorageKeys';
import { customSessionStorage } from 'shared/lib/customStorage';
import { sendSentryClientError } from 'shared/lib/sendSentryClientError';

import type { GlobalState } from '../../model/store';
import { getOrCreateStore } from '../../model/store';

export interface IPersistedStore {
  save: () => void;
  getStore: () => ToolkitStore<GlobalState>;
}

/**
 * При загрузке страницы мы создаем стор и часть данных получаем при серверном рендеринге
 * Но данные формы и ордеры мы восстанавливаем из стора пользователя.
 * Данный класс управляет объемом данных которые клиент восстанавливает в стор из локального хранилища данных в браузере
 * */
export class PersistedStore implements IPersistedStore {
  // указатель на созданный стор
  private readonly store: ToolkitStore<GlobalState>;

  // поля которые фактически хранятся в сторадже и восстанавливаются в стор после перегруза
  static PERSISTED_FIELD_KEYS: Array<keyof GlobalState> = [
    'carInfo',
    'owner',
    'contacts',
    'drivers',
    'insurer',

    'policyDraft',
    'purchasedPolicy',

    'selectedProposition',
    'policyInfo',
    'prolongation',
  ];

  constructor(defaultValue: GlobalState, requiredRoutes: string[]) {
    if (typeof window === 'undefined') {
      this.store = getOrCreateStore(defaultValue);
      return;
    }

    let isRestoreStorage = false;
    for (let i = 0; i < requiredRoutes.length; i++) {
      // восстанавливаем данные только на определенных страницах, а не по всему проекту
      if (window.location.pathname.includes(requiredRoutes[i])) {
        isRestoreStorage = true;
        break;
      }
    }

    if (isRestoreStorage) {
      this.store = getOrCreateStore(this._restore(defaultValue));
    } else {
      this.store = getOrCreateStore(defaultValue);
    }
  }

  // получить созданный ранее стор
  getStore(): ToolkitStore<GlobalState> {
    return this.store;
  }

  /**
   * Метод сохраняет данные в локальное хранилище из redux store
   * */
  save = (): void => {
    try {
      this._writeJSON(this._encodeValue(this.store.getState()));
    } catch (e) {
      sendSentryClientError(e as Error, { placement: 'PersistedStore' });
    }
  };

  /**
   * Метод восстанавливает данные из локального хранилища в redux store
   * @param defaultValue - дефолтные значения для полей, которые перечислены в PERSISTED_FIELD_KEYS
   * */
  private _restore = (defaultValue: GlobalState): GlobalState => {
    try {
      const restoredData = this._decodeValue(this._readJSON());

      if (!Object.keys(restoredData).length) {
        return defaultValue;
      }

      const persistedData: Record<string, unknown> = {};

      PersistedStore.PERSISTED_FIELD_KEYS.forEach((key) => {
        persistedData[key as string] = restoredData[key] || defaultValue[key];
      });

      return { ...defaultValue, ...persistedData };
    } catch (e) {
      sendSentryClientError(e as Error);
      return defaultValue;
    }
  };

  private _readJSON(): string {
    const result = customSessionStorage.get(localStorageKeys.appState) ?? '';
    customSessionStorage.remove(localStorageKeys.appState);
    return result;
  }

  private _writeJSON(value: string): void {
    customSessionStorage.set(localStorageKeys.appState, value);
  }

  private _encodeValue(state: GlobalState): string {
    const persistedData: Record<string, unknown> = {};
    PersistedStore.PERSISTED_FIELD_KEYS.forEach((key) => {
      persistedData[key as string] = state[key];
    });

    return JSON.stringify(persistedData);
  }

  private _decodeValue(value: string): Partial<GlobalState> {
    try {
      return JSON.parse(value);
    } catch (e) {
      return {};
    }
  }
}
