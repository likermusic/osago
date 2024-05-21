import { convertToNumber } from 'shared/lib/convertToNumber/convertToNumber';

import type { ITransformedGetMultiCalculations } from 'entities/propositionCalculations';

import { useGetTitleBasedOnCompaniesAmountTexts } from './useGetTitleBasedOnCompaniesAmount.texts';

export const useGetTitleBasedOnCompaniesAmount = (data: ITransformedGetMultiCalculations | undefined) => {
  const respondCompanies = convertToNumber(data?.propositions?.length) + convertToNumber(!!data?.orderInfo);

  const progressBarTitle = respondCompanies
    ? useGetTitleBasedOnCompaniesAmountTexts.getProgressBarText(respondCompanies)
    : useGetTitleBasedOnCompaniesAmountTexts.startText;

  return { progressBarTitle };
};
