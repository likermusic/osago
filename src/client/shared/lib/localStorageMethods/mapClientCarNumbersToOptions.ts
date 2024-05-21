import { beautifyCarNumber, beautifyMotorcycleNumber } from '@sravni/cosago-react-library/lib/utils';
import { isDefined } from '@sravni/react-utils';

import { localStorageKeys } from 'shared/config/localStorageKeys';
import { customLocalStorage } from 'shared/lib/customStorage';

// TODO: Добавить тест https://sravni-corp.atlassian.net/browse/OS-10278
export const mapClientCarNumbersToOptions = () => {
  try {
    const currentClientNumbers = JSON.parse(customLocalStorage.get(localStorageKeys.carNumbersListV2) || '[]');

    return currentClientNumbers
      .map((number: string) =>
        number
          ? {
              value: number,
              label: beautifyCarNumber(number),
            }
          : undefined,
      )
      .filter(isDefined);
  } catch (e) {
    return [];
  }
};

export const mapClientMotorcycleNumbersToOptions = () => {
  try {
    const currentClientNumbers = JSON.parse(customLocalStorage.get(localStorageKeys.motoNumbersList) || '[]');

    return currentClientNumbers
      .map((number: string) =>
        number
          ? {
              value: number,
              label: beautifyMotorcycleNumber(number),
            }
          : undefined,
      )
      .filter(isDefined);
  } catch (e) {
    return [];
  }
};
