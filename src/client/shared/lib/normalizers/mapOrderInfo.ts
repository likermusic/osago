import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { mapAdvantages } from 'shared/lib/normalizers/mapAdvantages';
import { mapAlerts } from 'shared/lib/normalizers/mapAlerts';
import { mapCompany } from 'shared/lib/normalizers/mapCompany';
import { mapDescription } from 'shared/lib/normalizers/mapDescription';
import { mapTags } from 'shared/lib/normalizers/mapTags';
import { sendSentryClientErrorOnce } from 'shared/lib/sendSentryClientError';
import {
  NO_COMPANY_INFO_ERROR,
  NO_ORDER_HASH,
  NO_OSAGO_ID_ERROR,
  NO_PAYMENT_URL,
  NO_PRICE_INFO_ERROR,
  NO_START_DATE_ERROR,
} from 'shared/lib/validations/Errors.texts';
import type { IOrderProposition, TOrderPropositionStatus } from 'shared/types';

const mapApiOrderStatusToClient: Record<
  PropositionCalculations.GetManyOrders['orderInfo']['orderStatus'],
  TOrderPropositionStatus
> = {
  Success: 'success',
  Failed: 'rejected',
  Loading: 'loading',
  DateChanged: 'dateChanged',
};

// eslint-disable-next-line complexity,max-statements
export const mapOrderInfo = (order: PropositionCalculations.GetManyOrders['orderInfo']): IOrderProposition | null => {
  if (!order) return null;

  const {
    company,
    paymentUrl,
    searchPrice,
    price,
    osagoId,
    isProlongation,
    tags,
    startDate,
    alerts,
    upperTags,
    isPriceChanged,
    orderStatus,
    offer,
    draftFullUrl,
    orderHash,
    calcHash,
  } = order || {};

  let orderPropositionStatus = mapApiOrderStatusToClient[orderStatus] ?? 'rejected';
  const additionalFields: Record<string, unknown> = {};
  try {
    if (orderStatus === 'Success' || orderStatus === 'DateChanged') {
      if (!price) {
        orderPropositionStatus = 'error';
        throw new Error(NO_PRICE_INFO_ERROR);
      }

      if (!paymentUrl) {
        additionalFields.paymentUrl = paymentUrl;
        orderPropositionStatus = 'error';
        throw new Error(NO_PAYMENT_URL);
      }

      if (!osagoId) {
        orderPropositionStatus = 'error';
      }

      if (!company?.id || !company?.name) {
        orderPropositionStatus = 'error';
        throw new Error(NO_COMPANY_INFO_ERROR);
      }
    }

    if (!startDate) {
      additionalFields.startDate = startDate;
      throw new Error(NO_START_DATE_ERROR);
    }

    if (!osagoId) {
      additionalFields.osagoId = osagoId;
      throw new Error(NO_OSAGO_ID_ERROR);
    }

    if (!orderHash) throw new Error(NO_ORDER_HASH);
  } catch (e) {
    sendSentryClientErrorOnce(
      true,
      e,
      {
        ...additionalFields,
        orderHash,
        companyId: company?.id,
        price,
        searchPrice,
        calcHash,
      },
      { level: 'log' },
    );
  }
  return {
    id: String(company?.id) + String(startDate),
    productId: osagoId ?? null,
    price: (price || searchPrice) ?? null,
    orderHash: orderHash ?? null,
    calcHash: calcHash ?? null,
    isProlongation,
    searchPrice: searchPrice ?? null,
    paymentUrl: paymentUrl ?? null,
    startDate: startDate ?? null,
    draftFullUrl: draftFullUrl ?? null,
    isPriceChanged: !!isPriceChanged,
    orderPropositionStatus,

    tags: mapTags(tags),
    absoluteTags: mapTags(upperTags),
    alerts: mapAlerts(alerts),

    company: mapCompany(company),

    advantages: mapAdvantages(offer?.company),
    description: mapDescription(offer?.company, price || searchPrice),
  };
};
