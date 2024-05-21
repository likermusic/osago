import type { ICalculationProposition } from 'shared/types';

import { sortPropositions } from '../sortPropositions';

describe('WHEN "sortPropositions" is called', () => {
  const generateProposition = (isSectionSponsor: boolean, price: number, rating: number) => ({
    company: {
      companyId: 7932,
      companyName: 'Согласие',
      logoLink: '//f.sravni.ru/logotypes/ic/40x40/logo_7932.svg',
      averageRating: rating,
    },
    isSectionSponsor,
    price,
  });

  const proposition1 = generateProposition(false, 100, 1);
  const proposition2 = generateProposition(false, 50, 5);
  const proposition3 = generateProposition(false, 150, 2);
  const proposition4 = generateProposition(true, 1, 1);

  const propositions = [proposition1, proposition2, proposition3, proposition4] as ICalculationProposition[];

  it('AND "sort" is equal "bestSravniReviews", MUST sort propositions by sravni reviews from biggest value to smallest AND by isSectionSponsor in first', () => {
    expect(sortPropositions(propositions, 'bestSravniReviews')).toEqual([
      proposition4,
      proposition2,
      proposition3,
      proposition1,
    ]);
  });

  it('AND "sort" is equal "priceASC", MUST sort propositions by price from smallest value to biggest AND by isSectionSponsor in first', () => {
    expect(sortPropositions(propositions, 'priceASC')).toEqual([
      proposition4,
      proposition2,
      proposition1,
      proposition3,
    ]);
  });

  it('AND "sort" is equal "priceDESC", MUST sort propositions by price from biggest value to smallest AND by isSectionSponsor in first', () => {
    expect(sortPropositions(propositions, 'priceDESC')).toEqual([
      proposition4,
      proposition3,
      proposition1,
      proposition2,
    ]);
  });
});
