import type { Query } from 'commonTypes/api/query';

import type { TQuerySupportedForMapping } from 'shared/types/TQuerySupportedForMapping';

export const isTRestoreCalculationQueryResponse = (
  query: TQuerySupportedForMapping,
): query is Query.TRestoreCalculationQueryResponse => 'benefitCode' in query || 'companyId' in query;

export const isTRestoreOrderQuery = (
  query: TQuerySupportedForMapping,
): query is Query.TRestoreCalculationQueryResponse => 'save' in query;
