import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

export interface ICompanyPropositionInfo {
  /* Имя компании */
  companyName: string;
  /* Id компании */
  companyId: number;
  /* Ссылка на логотип компании */
  logoLink: string;
  /* Средний рейтинг компании */
  averageRating?: number;
}

export type TNonNullableCalculationPropositionCompany = RequiredAndNonNullableFields<
  PropositionCalculations.GetCalculations['offers'][number]['company'],
  'id' | 'name'
>;

export type TRequiredOfferWithRequiredCompany = Required<
  Required<PropositionCalculations.GetManyOrders['orderInfo']>['offer']
>['company'];

export type TRequiredOfferWithNonNullableCompanyProps = RequiredAndNonNullableFields<
  TRequiredOfferWithRequiredCompany,
  'id' | 'name'
>;
