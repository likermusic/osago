import { doSort } from 'shared/lib/doSort/doSort';
import type { ICalculationProposition } from 'shared/types';

import type { PropositionCalculationsState } from '../../types/StoreTypes';
import type { TSortProposition } from '../../types/UITypes';

const SORTING_PROPOSITIONS_MAP: Record<
  TSortProposition,
  (propositions: ICalculationProposition[]) => ICalculationProposition[]
> = {
  bestSravniReviews: (propositions) =>
    propositions.sort((a, b) => doSort('DESC', a.company.averageRating, b.company.averageRating)),
  priceASC: (propositions) => propositions.sort((a, b) => doSort('ASC', a.price, b.price)),
  priceDESC: (propositions) => propositions.sort((a, b) => doSort('DESC', a.price, b.price)),
};

export const sortPropositions = (
  propositions: PropositionCalculationsState['propositions'],
  sort: PropositionCalculationsState['sort'],
) => {
  if (!propositions?.length) {
    return propositions;
  }

  const sectionSponsors = propositions.filter((proposition) => proposition.isSectionSponsor);
  const prolongationProposition = propositions.filter(
    (proposition) => proposition.isProlongation && !proposition.isSectionSponsor,
  );
  const nonSectionSponsorsAndNonProlongation = propositions.filter(
    (proposition) => !(proposition.isSectionSponsor || proposition.isProlongation),
  );

  return [
    ...sectionSponsors,
    ...prolongationProposition,
    ...SORTING_PROPOSITIONS_MAP[sort](nonSectionSponsorsAndNonProlongation),
  ];
};
