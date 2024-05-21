import { NotificationManager } from '@sravni/react-design-system';

import type { Query } from 'commonTypes/api/query';
import { BASE_NOTIFICATION_TIMEOUT } from 'constants/notification';

import { sendSentryClientError } from 'shared/lib/sendSentryClientError';

import { setCarInfo, setCarInfoDictionaries, setCarInfoLoaded, setCarInfoPrefilled } from 'entities/carInfo';

import { getExistCarInfoDataInDictionaries } from '../getExistCarInfoDataInDictionaries';
import { restoreQueryDictionaries } from '../restoreQueryDictionaries';

import { getFormAdditionalDataTexts } from './getFormAdditionalData.texts';

/**
 * После того как данные для формы были восстановлены,
 * догружаем данные о полисе и списки для дропдаунов.
 * */
export const getFormAdditionalDataThunk =
  (calculationQuery: Query.TRestoreCalculationQueryResponse): ThunkResult<void> =>
  async (dispatch) => {
    const {
      brandId: brandIdFromQuery,
      enginePower: enginePowerFromQuery,
      modelId: modelIdFromQuery,
      year: yearFromQuery,
    } = calculationQuery;

    try {
      const dictionaries = await restoreQueryDictionaries({
        brandId: brandIdFromQuery,
        modelId: modelIdFromQuery,
        year: yearFromQuery,
        enginePower: enginePowerFromQuery,
      });

      const { carInfo, brandId, modelId, year, enginePower } = getExistCarInfoDataInDictionaries(
        calculationQuery,
        dictionaries,
      );

      dispatch(setCarInfo({ data: carInfo }));
      dispatch(setCarInfoPrefilled(carInfo));
      dispatch(setCarInfoLoaded(!!calculationQuery.brandId));

      dispatch(
        setCarInfoDictionaries({
          ...dictionaries,
          brand: { id: brandId },
          model: { id: modelId },
          year,
          power: enginePower,
        }),
      );
    } catch (e) {
      NotificationManager.show(
        getFormAdditionalDataTexts.notification.title,
        '',
        getFormAdditionalDataTexts.notification.message,
        BASE_NOTIFICATION_TIMEOUT,
        'info',
      );

      sendSentryClientError('Не смогли восстановить ни один словарь для авто', {
        request: {
          brandIdFromQuery,
          enginePowerFromQuery,
          modelIdFromQuery,
          yearFromQuery,
        },
        error: JSON.stringify(e),
        place: 'getFormAdditionalData',
      });
    }
  };
