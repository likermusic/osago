import { calculateRating } from '../calculateRating';

describe('WHEN "calculateRating" is called', () => {
  describe('countMarks', () => {
    it('MUST return marks object to array', () => {
      expect(
        calculateRating({
          star1Count: 10,
          star2Count: 20,
          star3Count: 30,
          star4Count: 40,
          star5Count: 50,
        }),
      ).toStrictEqual([
        { count: 50, ratingValue: 5 },
        { count: 40, ratingValue: 4 },
        { count: 30, ratingValue: 3 },
        { count: 20, ratingValue: 2 },
        { count: 10, ratingValue: 1 },
      ]);
    });

    it('AND all rating are 0 MUST should return undefined', () => {
      expect(
        calculateRating({
          star1Count: 0,
          star2Count: 0,
          star3Count: 0,
          star4Count: 0,
          star5Count: 0,
        }),
      ).toStrictEqual(undefined);
    });
  });
});
