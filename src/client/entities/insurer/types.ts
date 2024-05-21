import type { UserCommonFields } from 'shared/types';

export type InsurerEntityReducer = Form.Single<UserCommonFields> & {
  isFilledByEsiaStatus?: boolean;
};
