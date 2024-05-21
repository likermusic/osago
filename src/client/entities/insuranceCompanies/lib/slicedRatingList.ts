import { LANDING_RATINGS_QUANTITY_SHORT } from '../config';
import type { ICompaniesRatingElement } from '../types';

export const slicedRatingList = (ratingsList: ICompaniesRatingElement[], isHidden: boolean) => {
  const sizeRatingList = isHidden ? LANDING_RATINGS_QUANTITY_SHORT : ratingsList.length;
  return ratingsList.slice(0, sizeRatingList);
};
