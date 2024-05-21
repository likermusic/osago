import { PolicyEndDateStatus } from 'entities/PolicyInfo';

export const getLastPolicyEndDayUnavailableMessage = (recommendedPolicyStartDate: string) =>
  `Рекомендуемая дата начала нового полиса ${recommendedPolicyStartDate}`;

export const getMessages = (
  companyName: string,
  policyEndDate: string,
  recommendedPolicyStartDate: string,
  recommendedPolicyOfferDay: string,
) => ({
  [PolicyEndDateStatus.LastPolicyEndDayWas]: `Мы нашли ваш предыдущий полис в ${companyName}, он уже закончился ${policyEndDate}. С учетом того, что полис закончился совсем недавно, рекомендуем ставить датой начала - ${recommendedPolicyStartDate}`,
  [PolicyEndDateStatus.LastPolicyEndDayMoreThan12DaysAgo]: `Мы нашли ваш предыдущий полис в ${companyName}, он уже закончился ${policyEndDate}, поэтому рекомендуем указать датой начала нового ${recommendedPolicyStartDate} или позже, потому что большинство страховых компаний не берут на страхование с датой ранее, чем 4 дня от даты расчета`,
  [PolicyEndDateStatus.LastPolicyEndDayIsToday]: `Мы нашли ваш предыдущий полис в ${companyName}, он заканчивается сегодня, поэтому рекомендуем указать датой начала нового ${recommendedPolicyStartDate}`,
  [PolicyEndDateStatus.LastPolicyEndDayLessThan60Days]: `Мы нашли ваш предыдущий полис в ${companyName}, он заканчивается  ${policyEndDate}, поэтому рекомендуем указать датой начала нового ${recommendedPolicyStartDate}`,
  [PolicyEndDateStatus.LastPolicyEndDayMoreThan60Days]: `Мы нашли ваш предыдущий полис в ${companyName}, он заканчивается ${policyEndDate}. Страховые компании разрешают продлевать полисы не ранее чем за 60 дней до окончания. Поэтому для расчета мы указали датой начала ${recommendedPolicyStartDate}. Если вы хотите продлить прошлый полис, то вам нужно сделать расчет не ранее ${recommendedPolicyOfferDay}`,
  [PolicyEndDateStatus.LastPolicyEndDayUnavailable]: getLastPolicyEndDayUnavailableMessage(recommendedPolicyStartDate),
});

export const policyStartDateNonRecommendedMessage = `Если вам нужен полис в ближайшую дату, то рекомендуем поставить датой начала +4 дня или позже, потому что большинство страховых компаний не берут на страхование с датой ранее, чем 4 дня от даты расчета`;
