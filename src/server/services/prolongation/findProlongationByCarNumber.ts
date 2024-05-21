import BadRequestError from '@sravni/server-utils/lib/errors/BadRequestError';
import { NotFoundError } from '@sravni/utils/lib/errors/network/NotFoundError';

import type { Prolongation } from 'commonTypes/api/prolongation';

import { config } from '../../constants/config';
import type { OsagoUtmQuery } from '../../utils/analytics/types';
import { requestWithTokenPost } from '../../utils/api/api';

export const findProlongationByCarNumber = async (carNumber: string, phone: string | undefined, utm: OsagoUtmQuery) => {
  if (!carNumber) {
    throw new BadRequestError('Не указан carNumber');
  }

  const { data } = await requestWithTokenPost<
    Prolongation.FoundedProlongationPolicyResponse | { hasError: boolean; error: string },
    { carNumber: string; phone: string | undefined; utm: OsagoUtmQuery }
  >(`${config.OSAGOGATEWAY}/v1/orders/prolongationOffer`, '', {
    carNumber,
    phone,
    utm,
  });

  if ('hasError' in data) {
    throw new NotFoundError(data.error);
  }

  if (data?.type === 'newShortProlongation') {
    throw new Error('Фронт не знает о типе newShortProlongation');
  }

  return {
    ...data,
    carNumber: data.carNumber || carNumber,
  };
};
