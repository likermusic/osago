import { mockAxiosGet } from '../../../../__mocks__';
import { getPoliciesForRaffleRequest } from '../getPoliciesForRaffleRequest';

describe('WHEN getPoliciesForRaffleRequest is called', () => {
  const lotteryName = 'TestLottery';
  const authHeader = { Authorization: 'Bearer token' };
  const responseData = { policies: ['policy1', 'policy2'] };

  it('AND lotteryName and authHeader is provided MUST do request with them', async () => {
    mockAxiosGet.mockResolvedValueOnce({ data: responseData });

    const result = await getPoliciesForRaffleRequest(lotteryName, authHeader);

    expect(result).toEqual(responseData);
    expect(mockAxiosGet).toHaveBeenCalledWith(`<PROMO>/v1/lottery/policies?LotteryName=${lotteryName}`, {
      headers: authHeader,
      timeout: 15000,
    });
  });

  it('AND api failed MUST throw an error', async () => {
    const error = new Error('API error');
    mockAxiosGet.mockRejectedValueOnce(error);

    await expect(getPoliciesForRaffleRequest(lotteryName, authHeader)).rejects.toThrow(error);
  });
});
