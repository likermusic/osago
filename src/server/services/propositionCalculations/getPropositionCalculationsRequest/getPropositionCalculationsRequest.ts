import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { config } from '../../../constants/config';
import { requestWithoutTokenGet } from '../../../utils/api/api';

export const getPropositionCalculationsRequest = async (calcHash: string) => {
  const { data } = await requestWithoutTokenGet<PropositionCalculations.GetCalculations>(
    `${config.OSAGOGATEWAY}/v2/calculations/${encodeURI(calcHash)}`,
  );

  return data;
};
