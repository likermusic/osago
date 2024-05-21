import { localStorageKeys, oldLocalStorageKeys } from '../../config/localStorageKeys';
import { customLocalStorage } from '../customStorage';

import { fixAndMapOldClientData } from './fixAndMapOldClientData';

// TODO: заюзать после переезда основного флоу на новый проект https://sravni-corp.atlassian.net/browse/OS-7438
export const cleanClientDataOldVersionsFromMemory = () => {
  const clientDataV2 = customLocalStorage.get(oldLocalStorageKeys.clientDataV2);
  if (clientDataV2) {
    const oldClientData = fixAndMapOldClientData(JSON.parse(clientDataV2));
    const newClientData = JSON.parse(customLocalStorage.get(localStorageKeys.clientDataV3) || '{}');

    customLocalStorage.set(localStorageKeys.clientDataV3, JSON.stringify({ oldClientData, newClientData }));
  }

  Object.values(oldLocalStorageKeys).forEach((key) => {
    customLocalStorage.remove(key);
  });
};
