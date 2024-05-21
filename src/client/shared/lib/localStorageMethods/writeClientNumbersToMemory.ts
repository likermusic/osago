import { localStorageKeys } from 'shared/config/localStorageKeys';
import { customLocalStorage } from 'shared/lib/customStorage';
import { leaveOnlyUniqueValues } from 'shared/lib/leaveOnlyUniqueValues';
import { sendSentryClientErrorOnce } from 'shared/lib/sendSentryClientError';

export const writeClientNumbersToMemory = (vehicleNumber: string, vehicleType: VehicleType) => {
  try {
    const localStorageName =
      vehicleType === 'motorcycle' ? localStorageKeys.motoNumbersList : localStorageKeys.carNumbersListV2;

    const currentClientNumbers = JSON.parse(customLocalStorage.get(localStorageName) || '[]');

    const updatedClientNumbers = [vehicleNumber, ...currentClientNumbers];

    const updatedClientNumbersJSON = JSON.stringify(leaveOnlyUniqueValues(updatedClientNumbers));

    customLocalStorage.set(localStorageName, updatedClientNumbersJSON);
  } catch (e) {
    sendSentryClientErrorOnce('writeClientNumbersToMemory', e, {
      placement: 'writeClientNumbersToMemory',
    });
  }
};
