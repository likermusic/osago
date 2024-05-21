import type { ICustomSelectValue } from '@sravni/cosago-react-library/lib/types';
import { parseFullName } from '@sravni/cosago-react-library/lib/utils';

import type { PolicyInfo } from 'commonTypes/api/policyInfo';
import { formatDate } from 'commonUtils/formatters';

import { removeMaskSymbols } from 'shared/lib/formatters';

export interface IPolicyInfoRequest {
  carNumber?: string;
  bodyNumber?: string;
  vin?: string;
  ownerFio?: Nullable<ICustomSelectValue>;
  ownerBirthDate?: string;
}

export const mapPolicyInfoRequest = (data?: IPolicyInfoRequest): PolicyInfo.GetRecommendedStartDateReq => {
  if (!data) return {};
  const { carNumber, vin, ownerBirthDate, ownerFio, bodyNumber } = data;
  return {
    carNumber: carNumber && removeMaskSymbols(carNumber),
    vin,
    bodyNumber,
    ownerBirthDate: ownerBirthDate ? formatDate.toServerFromClient(ownerBirthDate) : undefined,
    ownerFio: ownerFio ? parseFullName(ownerFio) : undefined,
  };
};
