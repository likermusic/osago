import type { TPolicyTypeField } from '../../types';

export const INSURANCE_TYPES_OPTIONS: TPolicyTypeField[] = [
  { label: 'ОСАГО', value: 'Osago' },
  { label: 'КАСКО', value: 'Kasko' },
  { label: 'Ипотека', value: 'MortgageInsurance' },
  { label: 'Имущество', value: 'PropertyInsurance' },
  { label: 'От несчастных случаев', value: 'AccidentInsurance' },
  { label: 'Путешествие', value: 'TravelInsurance' },
];

export const OSAGO_POLICY_NUMBER_MASK = 'ХХХ 9999999999';
