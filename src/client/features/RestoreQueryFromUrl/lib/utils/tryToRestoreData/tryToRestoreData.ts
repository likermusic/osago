import type { Query } from 'commonTypes/api/query';
import { isCalculationHashValid } from 'commonUtils/isCalculationHashValid/isCalculationHashValid';
import { isOrderHashValid } from 'commonUtils/isOrderHashValid/isOrderHashValid';
import type { IParseUrlQuery } from 'commonUtils/parseUrlQuery/interface';

import { mapCarInfo } from 'entities/carInfo';
import { mapCarInfoToQuery } from 'entities/carInfo/lib/mapCarInfoToQuery';

import { restoreCalculationQuery } from '../restoreCalculationQuery';
import { restoreCarByCarToken } from '../restoreCarByCarToken';
import { updateFormStoreThunk } from '../updateFormStoreThunk';

export const tryToRestoreData =
  (queryParamsOnce: IParseUrlQuery): ThunkResult<Promise<Query.TRestoreCalculationQueryResponse | null>> =>
  async (dispatch) => {
    const { orderOrProlongationHash, hash, calculationHash, searchId, regNumberToken } = queryParamsOnce ?? {};

    if (regNumberToken) {
      const data = await restoreCarByCarToken(regNumberToken);

      if (data) {
        const mappedData = mapCarInfo(data);

        return mappedData
          ? mapCarInfoToQuery({
              ...mappedData,
              carNumber: data.carNumber ?? '',
            })
          : null;
      }
    }

    if (isOrderHashValid(orderOrProlongationHash) || (hash && searchId) || isCalculationHashValid(calculationHash)) {
      // пытаемся восстановить данные через бэк, по ручкам восстановления
      const data = await restoreCalculationQuery({
        orderHash: orderOrProlongationHash,
        calculationHash,
        searchId,
        hash,
      });

      if (data) {
        dispatch(updateFormStoreThunk(data));

        return data;
      }
    }

    return null;
  };
