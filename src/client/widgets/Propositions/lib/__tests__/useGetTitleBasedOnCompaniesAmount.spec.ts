import type { PropositionCalculationsState } from 'entities/propositionCalculations';

import { useGetTitleBasedOnCompaniesAmount } from '../useGetTitleBasedOnCompaniesAmount';
import { useGetTitleBasedOnCompaniesAmountTexts } from '../useGetTitleBasedOnCompaniesAmount.texts';

const getSameData = <T>(value: T) => ({
  propositions: value,
  orderInfo: value,
});

const getData = (propositionsLength: number, orderInfo: 0 | 1) => ({
  propositions: [...new Array(propositionsLength)],
  orderInfo,
});

const NULLABLE_TEXTS = {
  progressBarTitle: useGetTitleBasedOnCompaniesAmountTexts.startText,
};

const getTexts = (respondCompanies: number) => ({
  progressBarTitle: useGetTitleBasedOnCompaniesAmountTexts.getProgressBarText(respondCompanies),
});

describe('WHEN "generateSteps" is called', () => {
  it.each([getSameData(undefined), getSameData(null), getSameData(''), [], {}, null, undefined, getSameData(0)])(
    'AND values %p incorrect MUST return 0',
    (value) => {
      expect(useGetTitleBasedOnCompaniesAmount(value as unknown as PropositionCalculationsState)).toEqual(
        NULLABLE_TEXTS,
      );
    },
  );

  it.each([[2, 1] as const, [0, 1] as const, [1, 0] as const])(
    'AND data provided MUST return correct texts',
    (propositionsLength, orderInfo) => {
      const respondCompanies = propositionsLength + orderInfo;

      const value = getData(propositionsLength, orderInfo);
      const texts = getTexts(respondCompanies);

      expect(useGetTitleBasedOnCompaniesAmount(value as unknown as PropositionCalculationsState)).toEqual(texts);
    },
  );
});
