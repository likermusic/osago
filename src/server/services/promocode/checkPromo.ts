import type { Promocode } from 'commonTypes/api/promocode';

import { config } from '../../constants/config';
import { requestWithTokenPost } from '../../utils/api/api';

export const checkPromoRequest = async (code: string) => {
  const { data } = await requestWithTokenPost<Promocode.CheckPromoResponse>(
    `${config.OSAGOGATEWAY}/v2/promo/check?code=${encodeURI(code)}`,
    '',
  );
  return data;
};
