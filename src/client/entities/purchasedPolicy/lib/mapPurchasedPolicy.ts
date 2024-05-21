import type { Order } from 'commonTypes/api/orderInfo';

import { mapAlerts } from 'shared/lib/normalizers/mapAlerts';
import { NO_COMPANY_INFO_OFFER_ERROR } from 'shared/lib/validations/Errors.texts';
import { formatExistValue } from 'shared/lib/validations/formatExistValue';
import { isValueExist } from 'shared/lib/validations/isValueExist';
import { isValueExistStrict } from 'shared/lib/validations/isValueExistStrict';

import type { PolicyInfoResult } from '../types';

const SENTRY_ERROR_PLACE = 'Thank you page| mapOrderInfo';

const mapTag = (tag: Order.OrderInfoType) => ({
  name: isValueExist(tag.name, ''),
  description: isValueExist(tag.description, ''),
  ratingValue: isValueExist(tag.ratingValue, ''),
});

export const mapPurchasedPolicy = (data: Order.GetOrderInfo): PolicyInfoResult => {
  const company = isValueExistStrict(data?.company, NO_COMPANY_INFO_OFFER_ERROR, { place: SENTRY_ERROR_PLACE });

  return {
    company: {
      id: isValueExistStrict(company.id, NO_COMPANY_INFO_OFFER_ERROR, { place: SENTRY_ERROR_PLACE }),
      name: isValueExistStrict(company.name, NO_COMPANY_INFO_OFFER_ERROR, { place: SENTRY_ERROR_PLACE }),
      logoUrl: isValueExist(company.logoUrl, ''),
      ratingInfo: {
        clientRating: isValueExist(company.ratingInfo?.clientRating, 0),
        expertRating: isValueExist(company.ratingInfo?.expertRating, 0),
        clientRatingDetalization: {
          star1Count: isValueExist(company.ratingInfo?.clientRatingDetalization?.star1Count, 0),
          star2Count: isValueExist(company.ratingInfo?.clientRatingDetalization?.star2Count, 0),
          star3Count: isValueExist(company.ratingInfo?.clientRatingDetalization?.star3Count, 0),
          star4Count: isValueExist(company.ratingInfo?.clientRatingDetalization?.star4Count, 0),
          star5Count: isValueExist(company.ratingInfo?.clientRatingDetalization?.star5Count, 0),
        },
        paymentRating: isValueExist(company.ratingInfo?.paymentRating, ''),
        paymentRatingDescription: isValueExist(company.ratingInfo?.paymentRatingDescription, ''),
        positiveTag: formatExistValue(company.ratingInfo?.positiveTag, mapTag, undefined),
        negativeTag: formatExistValue(company.ratingInfo?.negativeTag, mapTag, undefined),
        ratings: formatExistValue(
          company.ratingInfo?.ratings,
          (ratings) =>
            ratings.map((rating) => ({
              name: isValueExist(rating.name, ''),
              description: isValueExist(rating.description, ''),
              value: isValueExist(rating.value, ''),
              ratingDescription: isValueExist(rating.ratingDescription, ''),
            })),
          [],
        ),
        comment: isValueExist(company.ratingInfo?.comment, ''),
      },
      yearsOnMarket: isValueExist(company.yearsOnMarket, 0),
      branchCount: isValueExist(company.branchCount, 0),
      yearsWithSravni: isValueExist(company.yearsWithSravni, 0),
      soldPolicyCount: isValueExist(company.soldPolicyCount, ''),
      soldYesterdayPolicyCount: isValueExist(company.soldYesterdayPolicyCount, ''),
      foundationYear: isValueExist(company.foundationYear, 0),
      marketShare: isValueExist(company.marketShare, undefined),
    },
    contractNumber: isValueExist(data.contractNumber, ''),
    email: isValueExist(data.email, ''),
    name: isValueExist(data.name, ''),
    price: isValueExist(data.price, 0),
    policyBlankLink: isValueExist(data.policyBlankLink, ''),
    policyDocumentsLink: isValueExist(data.policyDocumentsLink, ''),
    userId: isValueExist(data.userId, undefined),
    cashBackSuccess: formatExistValue(data.cashBackSuccess, mapAlerts, []),
  };
};
