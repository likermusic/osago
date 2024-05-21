import { generateReviewsParams } from '../generateReviewsParams';

describe('WHEN "generateReviewsParams" is called', () => {
  const locationId = 'locationId';
  const companyId = 'companyId';

  it.each([
    ['', ''],
    ['', companyId],
    [locationId, companyId],
    [locationId, ''],
  ])(
    'AND "locationId" is %p AND "companyId" is %p, MUST return list of params for reviews query',
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (locationId: string, companyId: string) => {
      const result = {
        Deleted: 'false',
        GroupedByBanks: 'false',
        LocationId: locationId,
        OrderBy: 'WithRates',
        RateStatus: 'rateApproved',
        Rated: 'good',
        ReviewObjectType: 'insuranceCompany',
        ReviewObjectId: companyId,
        ReviewOnly: 'true',
        ReviewStatus: 'checked',
        Tag: 'osago',
      };

      expect(generateReviewsParams(locationId, companyId)).toEqual(result);
    },
  );
});
