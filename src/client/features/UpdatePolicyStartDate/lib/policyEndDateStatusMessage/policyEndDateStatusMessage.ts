import { formatDate } from 'commonUtils/formatters';

import type { ILastPolicy } from 'entities/PolicyInfo';

import { getLastPolicyEndDayUnavailableMessage, getMessages, policyStartDateNonRecommendedMessage } from './constants';

export const getPolicyEndDateStatusMessage = (
  recommendedPolicyStartDate: Date,
  currentOfferDate: Date,
  lastPolicy?: ILastPolicy,
): string | null => {
  const recommendedPolicyStartDateClient = formatDate.toClientFromDate(recommendedPolicyStartDate);
  const localizedRecommendedPolicyStartDate = formatDate.toLocalizedClientFromClient(recommendedPolicyStartDateClient);
  const isDateChanged = formatDate.toClientFromDate(currentOfferDate) !== recommendedPolicyStartDateClient;

  if (isDateChanged) {
    return policyStartDateNonRecommendedMessage;
  }
  if (
    lastPolicy?.endDateStatus === undefined ||
    lastPolicy?.insCompanyName === undefined ||
    lastPolicy?.endDate === undefined
  ) {
    return getLastPolicyEndDayUnavailableMessage(localizedRecommendedPolicyStartDate);
  }

  const localizedEndDate = formatDate.toLocalizedClientFromClient(lastPolicy.endDate);
  const recommendedPolicyOfferDay = formatDate.toObjectFromClient(lastPolicy.endDate).add(-59, 'd');
  const localizedRecommendedPolicyOfferDay = formatDate.toLocalizedClientFromClient(
    formatDate.toClientFromObject(recommendedPolicyOfferDay),
  );

  const messages = getMessages(
    lastPolicy.insCompanyName,
    localizedEndDate,
    localizedRecommendedPolicyStartDate,
    localizedRecommendedPolicyOfferDay,
  );

  return messages[lastPolicy.endDateStatus];
};
