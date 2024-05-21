import { boolean, object, string } from 'yup';

import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { sendSentryClientErrorOnce } from 'shared/lib/sendSentryClientError';

import type { ITransformedGetCalculationHash } from '../../types';

export const calculationHashSchemaError = object({
  hash: string().length(22).required(),
  showPromoField: boolean().nullable(),
});

export const mapCalculationHashResponse = (
  data: PropositionCalculations.GetCalculationsHashResponse,
): ITransformedGetCalculationHash => {
  if (!data || !calculationHashSchemaError.isValidSync(data)) {
    sendSentryClientErrorOnce(true, '/v1/calculations вернуло некорректный calculationHash', {
      data,
    });

    return {
      calculationHash: null,
      isShowPromoField: false,
      propositionStatus: 'error',
    };
  }

  return {
    calculationHash: data.hash,
    isShowPromoField: data.showPromoField ?? false,
  };
};
