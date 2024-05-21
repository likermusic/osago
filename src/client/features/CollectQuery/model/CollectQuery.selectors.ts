import { createSelector } from 'reselect';

import { formatDate } from 'commonUtils/formatters';

import { comparePeopleWithAddressAndPassport } from 'shared/lib/comparePeopleWithAddressAndPassport';
import type { TBaseQuery, TOrderQuery } from 'shared/types/TCollectQuery';

import { analyticsBaseSelector, originalUrlSelector, platformSelector } from 'entities/appConfig';
import { selectCarInfoData } from 'entities/carInfo';
import { mapCarInfoToQuery } from 'entities/carInfo/lib/mapCarInfoToQuery';
import { selectContactsData } from 'entities/contacts';
import { selectDrivers } from 'entities/drivers';
import { selectInsurerDataOrDefaults } from 'entities/insurer';
import { selectOwnerDataOrDefaults } from 'entities/owner';
import { currentPolicySelector } from 'entities/PolicyInfo';
import { promocodeSelector, propositionCalculationsHashSelector } from 'entities/propositionCalculations';
import { selectedPropositionSelector } from 'entities/selectedProposition';
import { userIdOrRestoredIdSelector } from 'entities/user';
import { isNonPartnerWlSelector, isWLSelector, whiteLabelSelector } from 'entities/whiteLabels';

import { mapDrivers } from '../lib/mapDrivers';
import { mapInsurerOwner } from '../lib/mapInsurerOwner';

export const cookiesSelector = createSelector(
  isWLSelector,
  isNonPartnerWlSelector,
  whiteLabelSelector,
  analyticsBaseSelector,
  originalUrlSelector,
  // eslint-disable-next-line max-params
  (isWl, isNonPartnerWl, wl, base, originalUrl) => ({ isWl, isNonPartnerWl, wl, base, originalUrl }),
);

export const selectQuery = createSelector(
  selectCarInfoData,
  selectDrivers,
  selectOwnerDataOrDefaults,
  selectInsurerDataOrDefaults,
  selectContactsData,
  currentPolicySelector,
  userIdOrRestoredIdSelector,
  platformSelector,
  promocodeSelector,
  // eslint-disable-next-line max-params
  (carInfo, drivers, owner, insurer, contacts, policy, userId, platform, promocode): TBaseQuery => ({
    ...mapCarInfoToQuery(carInfo),
    driversInfo: mapDrivers(drivers, owner),
    getting: owner?.registrationAddress?.value?.toString(),
    insurer: mapInsurerOwner(insurer, contacts, true),
    isApproximation: false, // Приблизительный расчёт, должен всегда быть false
    isProlongation: false,
    isResident: true,
    owner: mapInsurerOwner(owner, contacts, comparePeopleWithAddressAndPassport(insurer, owner)),
    platform,
    policyStartDate: policy.currentStartDate ? formatDate.toServerFromClient(policy.currentStartDate) : undefined,
    registration: owner.registrationAddress?.value?.toString(),
    usageMonthsPerYear: 10, // Константа
    userId: userId ? Number(userId) : undefined,
    benefitCode: promocode ?? undefined,
  }),
);

export const selectOrderQuery = createSelector(
  propositionCalculationsHashSelector,
  selectQuery,
  selectedPropositionSelector,
  (calculationHash, query, selectedProposition): TOrderQuery => ({
    ...query,
    save: {
      searchId: selectedProposition?.searchId || calculationHash,
      productId: selectedProposition?.productId ?? undefined,
      // не передаем беку originalCompanyId и isRoute, оно формируется на беке автоматически https://sravni-corp.atlassian.net/browse/OS-8073?focusedCommentId=287693
      // originalCompanyId - компания с которой выбрали проброс, первый заказ originalCompanyId = nul
      originalCompanyId: undefined,
      isRoute: undefined,
    },
  }),
);
