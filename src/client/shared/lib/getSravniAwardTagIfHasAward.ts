import { SHOULD_SHOW_CROWNS } from 'constants/FEATURE_FLAGS';
import { INSURANCE_COMPANIES_IDS } from 'constants/INSURANCE_COMPANIES_IDS';

import type { IDetailAlert } from '../types/IAlert';
import type { IOfferTag } from '../types/IOfferTag';

export const AWARD_TEXTS = {
  [INSURANCE_COMPANIES_IDS.ingosstrah]: 'Лучшая страховая компания',
  [INSURANCE_COMPANIES_IDS.alfaStrahovanie]: 'Самая технологичная страховая компания',
  [INSURANCE_COMPANIES_IDS.rosgosstrah]: 'Лучший страховой продукт в категории ОСАГО',
  [INSURANCE_COMPANIES_IDS.sber]: 'Прорыв года в страховой отрасли',
  [INSURANCE_COMPANIES_IDS.ugsk]: 'Это по любви',
};

const SravniAwardTag = (companyId: number): IOfferTag => ({
  color: 'green',
  title: '',
  text: `Победитель ежегодной премии Сравни в номинации «${AWARD_TEXTS[companyId]}»`,
  type: 'SravniAward',
  variant: 'primary',
  isTooltip: true,
});

const SravniAwardDetailAlert = (companyId: number): IDetailAlert => ({
  action: null,
  color: 'green',
  title: AWARD_TEXTS[companyId],
  subtitle: 'Победитель ежегодной премии Сравни',
  type: 'sravniAward',
});
// выключили короны до проведения следующей премии Сравни в этом году
const isWinner = (companyId: number) => SHOULD_SHOW_CROWNS && Object.keys(AWARD_TEXTS).includes(companyId?.toString());

export const getSravniAwardTagIfHasAward = (companyId: number | undefined) =>
  companyId && isWinner(companyId) ? SravniAwardTag(companyId) : undefined;

export const getSravniDetailAward = (companyId: number | undefined) =>
  companyId && isWinner(companyId) ? SravniAwardDetailAlert(companyId) : undefined;
