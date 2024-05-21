import type { UserCommonFields } from 'shared/types';

import type { PolicyHolderType } from './policyHolderConfig';

type TDriverId = string;

export type TPolicyHolder = PolicyHolderType | TDriverId;

export type OwnerCommonFields = UserCommonFields & {
  policyHolder: TPolicyHolder;
};

export type OwnerEntityReducer = Form.Single<OwnerCommonFields> & {
  // Поле нужно для восстановления, когда пользователь выбрал другого страхователя, но передумал и решил закрыть модалку
  prevPolicyHolder: TPolicyHolder;
  isFilledByEsiaStatus?: boolean;
};
