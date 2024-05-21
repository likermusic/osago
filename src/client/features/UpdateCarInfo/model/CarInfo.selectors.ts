import { createSelector } from 'reselect';

import type { CarInfoCommonFields } from 'entities/carInfo';
import { selectIsMaskedCarInfoValue } from 'entities/carInfo';
import { isUserLoggedInSelector } from 'entities/user';

export const shouldUseMaskedCarInfoValue = (
  field: keyof Pick<CarInfoCommonFields, 'carVinNumber' | 'documentNumber' | 'bodyNumber' | 'chassisNumber'>,
  currentFieldValue: string,
) =>
  createSelector(
    selectIsMaskedCarInfoValue(field, currentFieldValue),
    isUserLoggedInSelector,
    (isFieldMasked, loggedUserId) => {
      if (!isFieldMasked) {
        // пользак стер звездочки или поле изначально было открыто, не маскируем поле
        return false;
      }

      if (loggedUserId) {
        // если пользак залогинен, то не маскируем
        return false;
      }

      // если пользак не залогинен и поля замаскерованы, то продолжаем маскировать
      return true;
    },
  );
