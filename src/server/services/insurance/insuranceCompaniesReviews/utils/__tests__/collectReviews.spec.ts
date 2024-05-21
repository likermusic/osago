import { collectReviews } from '../collectReviews';

describe('WHEN "collectReviews" is called', () => {
  const generateRating = (id: number) => ({
    locationId: id,
    reviewObjectId: `reviewObjectId-${id}`,
  });

  const rating1 = generateRating(1);
  const rating2 = generateRating(1);
  const rating3 = generateRating(2);

  it('AND reviews list is empty, MUST return empty locations ids and companies ids lists', () => {
    expect(collectReviews([{}])).toEqual({
      companies: [],
      locations: [],
    });
  });

  it('AND reviews list is not empty, MUST return unique locations ids and companies ids lists', () => {
    expect(collectReviews([rating1, rating2, rating3])).toEqual({
      companies: [rating1.reviewObjectId, rating3.reviewObjectId],
      locations: [rating1.locationId.toString(), rating3.locationId.toString()],
    });
  });
});
