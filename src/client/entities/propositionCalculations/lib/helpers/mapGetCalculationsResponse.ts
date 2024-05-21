import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { mapAlerts } from 'shared/lib/normalizers/mapAlerts';
import { mapOrderInfo } from 'shared/lib/normalizers/mapOrderInfo';
import { mapPropositionsResultsResponse } from 'shared/lib/normalizers/mapPropositionsResultsResponse';

import type { ITransformedGetMultiCalculations } from '../../types';

import { mapDriversWithKbm } from './mapKbmDrivers';
import { mapPropositionStatus } from './mapPropositionStatus';

export const mapGetCalculationsResponse = (
  data: PropositionCalculations.GetCalculations,
): ITransformedGetMultiCalculations => {
  const mappedPropositions = mapPropositionsResultsResponse(data?.offers);
  const mappedOrder = mapOrderInfo(data?.orderInfo);

  return {
    propositions: mappedPropositions,
    propositionStatus: mapPropositionStatus(mappedPropositions.length, !!mappedOrder, data?.isCompleted),

    orderInfo: mappedOrder,

    driversWithKbm: mapDriversWithKbm(data?.kbmInfo),
    multiDriveWithKbm: data?.kbmInfo?.multidrive?.defaultKbm,
    promocodeAlerts: mapAlerts(data?.benefitSuccess),

    alerts: mapAlerts(data?.alerts),
  };
};
