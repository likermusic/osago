import type { ICustomSelectValue } from '@sravni/cosago-react-library/lib/types';
import { useCallback } from 'react';

import { useLazyGetPolicyInfo } from '../../model';

interface IOwner {
  fullName: Nullable<ICustomSelectValue>;
  birthday: string;
}

interface ICarInfo {
  carNumber: string;
  carVinNumber: string;
  bodyNumber: string;
}

export const useLazyGetPolicyInfoFromCarInfoAndOwner = () => {
  const [getPolicyInfoRtk, { isLoading }] = useLazyGetPolicyInfo();

  // Нужно вызывать так как в квере нет инфы о старом полисе
  const getPolicyInfo = useCallback(
    (data: ICarInfo, owner: IOwner) => {
      const { carNumber, carVinNumber, bodyNumber } = data || {};

      if (!(bodyNumber || carVinNumber || carNumber)) {
        return;
      }

      return getPolicyInfoRtk({
        carNumber: carNumber ?? undefined,
        bodyNumber: bodyNumber ?? undefined,
        vin: carVinNumber ?? undefined,
        ownerFio: owner.fullName,
        ownerBirthDate: owner.birthday,
      });
    },
    [getPolicyInfoRtk],
  );

  return { isLoading, getPolicyInfo };
};
