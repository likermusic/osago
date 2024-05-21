import { formatDateString } from '@sravni/cosago-react-library/lib/utils';
import { useCallback } from 'react';

import type { Query } from 'commonTypes/api/query';

import { useLazyGetPolicyInfo } from '../../model';
import type { IPolicyInfoRequest } from '../mapPolicyInfoRequest';

export const useLazyGetPolicyInfoFromQuery = () => {
  const [getPolicyInfoRtk, { isLoading }] = useLazyGetPolicyInfo();

  // Нужно вызывать так как в квере нет инфы о старом полисе
  const getPolicyInfo = useCallback(
    (data: IPolicyInfoRequest | Query.TRestoreCalculationQueryResponse | null) => {
      let ownerFio = null;
      let ownerBirthDate = '';

      if (!data) {
        return;
      }

      const { carNumber, vin, bodyNumber } = data || {};

      if (!(bodyNumber || vin || carNumber)) {
        return;
      }

      if ('ownerFio' in data) {
        ownerFio = data.ownerFio || null;
        ownerBirthDate = data.ownerBirthDate ?? '';
      } else if ('owner' in data) {
        ownerFio = data.owner?.fullName ? { value: data.owner?.fullName } : null;
        ownerBirthDate = formatDateString(data.owner?.birthDate ?? '');
      }

      return getPolicyInfoRtk({
        carNumber: carNumber ?? undefined,
        bodyNumber: bodyNumber ?? undefined,
        vin: vin ?? undefined,
        ownerFio,
        ownerBirthDate,
      });
    },
    [getPolicyInfoRtk],
  );

  return { isPolicyInfoLoading: isLoading, getPolicyInfo };
};
