import { removeSpaces } from '@sravni/cosago-react-library/lib/utils';

import type { TFrontQuery } from 'commonTypes/TFrontQuery';

import { localStorageKeys } from 'shared/config/localStorageKeys';
import { customLocalStorage } from 'shared/lib/customStorage';
import { sendSentryClientErrorOnce } from 'shared/lib/sendSentryClientError';

export const tryWriteClientDataToMemory = (query: TFrontQuery) => {
  const autoNumber = removeSpaces(query.carNumber ?? '');

  if (!autoNumber) return;

  try {
    const currentClientDataByNumbers = JSON.parse(customLocalStorage.get(localStorageKeys.clientDataV3) || '{}');

    const updatedClientData = {
      ...currentClientDataByNumbers,
      [autoNumber]: query,
    };

    const clientDataJSON = JSON.stringify(updatedClientData);

    customLocalStorage.set(localStorageKeys.clientDataV3, clientDataJSON);
  } catch (e) {
    sendSentryClientErrorOnce('tryWriteClientDataToMemory', e, {
      placement: 'tryWriteClientDataToMemory',
    });
  }
};
