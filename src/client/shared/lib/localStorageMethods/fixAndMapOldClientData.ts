import type { TFrontQuery } from 'commonTypes/TFrontQuery';

import { mapOldLocalStorageToQuery } from 'shared/lib/localStorageMethods/mapOldLocalStorageToQuery';

import { replaceValueInObject } from '../replaceValueInObject';

import type { IClientDataState } from './types';

const OLD_LADA_NAME = 'ВАЗ';
const NEW_LADA_NAME = 'LADA (ВАЗ)';

/**
 * В рамках таска OS-5033 была переключена ручка brands autosvc -> osagogateway. Сменилось название бренда с 'ВАЗ' на 'LADA (ВАЗ)'
 * Но у пользаков в старом local storage остался 'ВАЗ', поэтому нужно изменить на 'LADA (ВАЗ)' чтобы маппинг сработал
 * Этот код можно удалить через несколько лет (когда пользаки еще раз пройдут через эту функцию и local storage перезапишется)
 * начали мапить в февраль 2023
 **/
export const fixAndMapOldClientData = (clientData: Record<string, IClientDataState>) =>
  Object.entries(clientData).reduce<Record<string, TFrontQuery>>(
    (fixedResult, [key, value]) => ({
      ...fixedResult,
      [key]: mapOldLocalStorageToQuery(replaceValueInObject(value, 'brand', OLD_LADA_NAME, NEW_LADA_NAME)),
    }),
    {},
  );
