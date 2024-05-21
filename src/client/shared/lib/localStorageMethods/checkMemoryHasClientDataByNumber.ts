import { removeSpaces } from '@sravni/cosago-react-library/lib/utils';

import type { TFrontQuery } from 'commonTypes/TFrontQuery';

import { mapOldLocalStorageToQuery } from 'shared/lib/localStorageMethods/mapOldLocalStorageToQuery';
import { sendSentryClientErrorOnce } from 'shared/lib/sendSentryClientError';

import { localStorageKeys, oldLocalStorageKeys } from '../../config/localStorageKeys';
import { customLocalStorage } from '../customStorage';

export const checkMemoryHasClientDataByNumber = (autoNumber: string): TFrontQuery | false => {
  try {
    const autoNumberTrimmed = removeSpaces(autoNumber);
    const clientDataV3: Record<string, TFrontQuery> = JSON.parse(
      customLocalStorage.get(localStorageKeys.clientDataV3) || '{}',
    );

    if (clientDataV3[autoNumberTrimmed]) return clientDataV3[autoNumberTrimmed];

    const clientDataV2 = JSON.parse(customLocalStorage.get(oldLocalStorageKeys.clientDataV2) || '{}');
    return clientDataV2[autoNumberTrimmed] && mapOldLocalStorageToQuery(clientDataV2[autoNumberTrimmed]);
  } catch (e) {
    sendSentryClientErrorOnce('localStorage error', e, {
      placement: 'checkMemoryHasClientDataByNumber',
    });

    return false;
  }
};
