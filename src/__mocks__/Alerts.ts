import type { ApiSchemas } from 'commonTypes/api/ApiSchemas';
import { INSURANCE_COMPANIES_IDS } from 'constants/INSURANCE_COMPANIES_IDS';

import { AWARD_TEXTS } from 'shared/lib/getSravniAwardTagIfHasAward';
import type { IDetailAlert } from 'shared/types/IAlert';

export const ALERT_DEFAULT_DATA: IDetailAlert[] = [
  {
    color: undefined,
    variant: undefined,
    title: '',
    action: null,
    modalTitle: undefined,
    subtitle: '',
    url: undefined,
  },
];

export const ALERT_CORRECT_DATA: ApiSchemas.IAlert[] = [
  {
    alert: 'Orange',
    title: 'string',
    action: 'GoToDriverStep',
    description: 'string',
    modalTitle: 'string',
  },
];

export const ALERT_CORRECT_DATA_TRANSFORMED: IDetailAlert[] = [
  {
    color: 'orange',
    title: 'string',
    action: 'GoToDriverStep',
    subtitle: 'string',
    modalTitle: 'string',
  },
];

export const SBER_AWARD_ALERT = {
  action: null,
  color: 'green',
  title: AWARD_TEXTS[INSURANCE_COMPANIES_IDS.sber],
  subtitle: 'Победитель ежегодной премии Сравни',
  type: 'sravniAward',
};
