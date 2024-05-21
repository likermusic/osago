import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { config } from '../../../constants/config';
import { requestWithoutTokenPost } from '../../../utils/api/api';

export const getCalculationsHashRequest = async (query: PropositionCalculations.GetCalculationsHashQuery) => {
  const { data } = await requestWithoutTokenPost<PropositionCalculations.GetCalculationsHashResponse>(
    `${config.OSAGOGATEWAY}/v1/calculations`,
    query,
  );

  return data;
};
