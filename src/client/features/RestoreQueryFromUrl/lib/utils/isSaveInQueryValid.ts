import type { Query } from 'commonTypes/api/query';

export const isSaveInQueryValid = (data: Query.TRestoreCalculationQueryResponse): boolean =>
  !!data?.save?.searchId && !!data?.save?.productId;
