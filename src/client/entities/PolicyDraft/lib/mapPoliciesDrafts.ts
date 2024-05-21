import type { PoliciesDrafts } from 'commonTypes/api/policiesDrafts';

import { isValueExist } from 'shared/lib/validations/isValueExist';
import { isValueExistStrict } from 'shared/lib/validations/isValueExistStrict';

import type { IPolicyDraftState } from '../types';

export const mapPoliciesDrafts = (response: PoliciesDrafts.Response): IPolicyDraftState => {
  const { result, kidUrl, upsalePolicyDraftUrl } = isValueExistStrict(
    response,
    'Отсутствует response при getPoliciesDrafts',
    { place: 'Summary' },
  );

  return {
    policyUrl: isValueExistStrict(result, 'Отсутствует policyDraftUrl', { place: 'Summary' }),
    upsaleUrl: isValueExist(upsalePolicyDraftUrl, null),
    upsaleRulesUrl: isValueExist(kidUrl, null),
  };
};
