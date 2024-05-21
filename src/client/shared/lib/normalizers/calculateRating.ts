import type { TStarRatings } from 'shared/types/IPropositionDetail';

interface IRatingDetalization {
  star1Count?: number;
  star2Count?: number;
  star3Count?: number;
  star4Count?: number;
  star5Count?: number;
}

/**
 * Если все рейтинги нулевые, то возвращаем undefined
 **/
export const calculateRating = (rating?: IRatingDetalization): TStarRatings | undefined =>
  rating && Object.values(rating).filter((value) => value !== 0).length !== 0
    ? [
        { count: rating.star5Count ?? 0, ratingValue: 5 },
        { count: rating.star4Count ?? 0, ratingValue: 4 },
        { count: rating.star3Count ?? 0, ratingValue: 3 },
        { count: rating.star2Count ?? 0, ratingValue: 2 },
        { count: rating.star1Count ?? 0, ratingValue: 1 },
      ]
    : undefined;
