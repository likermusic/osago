import type { IReviewsApi } from 'commonTypes/insuranceCompanies';
import { BASE_TIMEOUT } from 'constants/apiTimeout';

import { mockAxiosGet, TEST_ERROR } from '../../../../../__mocks__';
import { getReviews } from '../getReviews';
import { generateReviewsParams } from '../utils/generateReviewsParams';

describe('WHEN "getReviews" is called', () => {
  const locationId = 'locationId';
  const companyId = 'companyId';

  const result: IReviewsApi = {
    total: 0,
    items: [],
    averageRating: 0,
  };

  beforeEach(() => {
    mockAxiosGet.mockResolvedValue({ data: result });
  });

  it.each([
    ['', ''],
    ['', companyId],
    [locationId, companyId],
    [locationId, ''],
  ])(
    'AND locationId is %p AND companyId is %p, MUST send query with that parameters',
    // eslint-disable-next-line @typescript-eslint/no-shadow
    async (locationId: string, companyId: string) => {
      await getReviews(locationId, companyId);
      const params = generateReviewsParams(locationId, companyId);

      expect(mockAxiosGet).toHaveBeenCalledWith('<OSAGOGATEWAY>/v1/reviews', { params, timeout: BASE_TIMEOUT });
    },
  );

  it('AND request was success, MUST return data from request', async () => {
    expect(await getReviews()).toEqual(result);
  });

  it('AND request was failed, MUST throw error', async () => {
    let error: Nullable<Error> = null;
    mockAxiosGet.mockRejectedValue(TEST_ERROR);

    try {
      await getReviews();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(TEST_ERROR);
  });
});
