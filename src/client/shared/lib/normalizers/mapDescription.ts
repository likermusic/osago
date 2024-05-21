import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { calculateRating } from 'shared/lib/normalizers/calculateRating';
import { mapAlertsAndAddAwards } from 'shared/lib/normalizers/mapAlerts';
import { mapLabeledDescription } from 'shared/lib/normalizers/mapLabeledDescription';
import { mapPromo } from 'shared/lib/normalizers/mapPromo';
import type { IDescription, TPropositionDetail } from 'shared/types';

export const mapDescription = (
  company:
    | PropositionCalculations.GetCalculations['offers'][number]['company']
    | PropositionCalculations.GetManyOrders['orderInfo']['offer']['company'],
  price: number | undefined,
): TPropositionDetail | null => {
  if (!company || !price) return null;

  return {
    aboutCompany:
      company?.hidden?.aboutCompany?.texts?.filter((el): el is IDescription => !!(el.title && el.description)) ?? [],
    bonuses: mapPromo(company?.hidden?.promo),
    description: company?.hidden?.rating?.comment ?? '',
    detailAlerts: mapAlertsAndAddAwards(company?.hidden?.alerts, company?.id),
    price: {
      all: price,
      formula: {
        resultText: company?.hidden?.price?.formula?.resultText ?? undefined,
        multipliers: company?.hidden?.price?.formula?.multipliers ?? undefined,
      },
      osagoCoefficients: company?.hidden?.price?.formulaRows?.map((coefficient) => ({
        ...mapLabeledDescription(coefficient),
        color: coefficient.color === 'Orange' ? 'orange' : 'white',
        value: coefficient.value ?? '',
      })),
      priceTitle: company?.hidden?.price?.priceTitle ?? undefined,
    },
    ratings:
      company?.hidden?.rating?.ratings?.map((rating) => ({
        ...mapLabeledDescription(rating),
        value: rating?.value ?? '',
      })) ?? [],
    reviews: {
      starRatings: calculateRating(company?.hidden?.rating?.detalization),
      positiveTag: company?.hidden?.rating?.goodBad?.positiveTag
        ? mapLabeledDescription(company?.hidden?.rating?.goodBad?.positiveTag)
        : undefined,
      negativeTag: company?.hidden?.rating?.goodBad?.negativeTag
        ? mapLabeledDescription(company?.hidden?.rating?.goodBad?.negativeTag)
        : undefined,
    },
  };
};
