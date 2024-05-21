import { AUTH_HEADER_MOCK, mockAxiosPost } from '../../../../../__mocks__';
import { getRecommendedStartDate } from '../getRecommendedStartDate';

const getRecommendedStartDateReq = {
  carNumber: '',
  vin: '',
};

const getRecommendedStartDateRes = {
  insCompanyId: 7469,
  insCompanyName: 'Ренессанс Страхование',
  isByEarlyOrder: false,
  isByPolicy: false,
  lastPolicyEndDate: '2023-12-26T00:00:00',
  lastPolicyPrice: 8319.03,
  startDate: '2023-08-29',
};

describe('WHEN "getRecommendedStartDate" is called', () => {
  beforeAll(() => {
    mockAxiosPost.mockResolvedValue({ data: getRecommendedStartDateRes });
  });

  it('MUST do request to osagogateway service', async () => {
    await getRecommendedStartDate(getRecommendedStartDateReq);

    expect(mockAxiosPost).toHaveBeenCalledWith(
      `<OSAGOGATEWAY>/v1/calculations/recommendedstartdate`,
      getRecommendedStartDateReq,
      AUTH_HEADER_MOCK,
    );
  });

  it('MUST return policy info', async () => {
    expect(await getRecommendedStartDate(getRecommendedStartDateReq)).toEqual(getRecommendedStartDateRes);
  });
});
