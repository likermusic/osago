import type { Raffle } from 'commonTypes/api/raffle';

export const sortRafflePolicies = (policies: Raffle.GetPoliciesForRaffleResponse['policies']) =>
  policies?.sort((a, b) => {
    if (a?.isRegistered && !b?.isRegistered) return 1;
    if (!a?.isRegistered && b?.isRegistered) return -1;

    if (a?.productType !== 'Osago' && b?.productType === 'Osago') return 1;
    if (a?.productType === 'Osago' && b?.productType !== 'Osago') return -1;

    return 0;
  });
