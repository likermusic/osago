import type { RestoreSelectedProposition } from 'commonTypes/api/restoreSelectedProposition';

import { sendSentryClientErrorOnce } from 'shared/lib/sendSentryClientError';
import { NO_COMPANY_OR_PRICE_INFO_ERROR } from 'shared/lib/validations/Errors.texts';

import type { IMappedSelectedPropositionInfo } from '../types/types';

// пока нужна только цена на саммари(расширить если надо)
export const mapSelectedPropositionInfo = (
  data: RestoreSelectedProposition.Response,
): IMappedSelectedPropositionInfo | null => {
  const { price, companyId, orderId } = data || {};
  if (price === null || price === undefined || !companyId) {
    sendSentryClientErrorOnce(true, NO_COMPANY_OR_PRICE_INFO_ERROR, {
      placement: 'mapSelectedPropositionInfo',
      level: 'log',
      price,
      companyId,
      orderId,
    });

    return null;
  }

  return {
    price,
    activeCompanyId: companyId,
  };
};
