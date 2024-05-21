import { mockAxiosPost } from '../../../../__mocks__';
import { registerUserInRaffleRequest } from '../registerUserInRaffleRequest';

describe('WHEN registerUserInRaffleRequest is called', () => {
  const authHeader = { Authorization: 'Bearer token' };
  const responseData = { policies: ['policy1', 'policy2'] };

  const body = {
    lotteryName: '',
    productType: '',
    policyNumber: '',
    orderId: '',
    phone: '',
    isRulesAccepted: true,
  };

  it('AND body and authHeader is provided MUST do request with them', async () => {
    mockAxiosPost.mockResolvedValueOnce({ data: responseData });
    const result = await registerUserInRaffleRequest(body, authHeader);

    expect(result).toEqual(responseData);
    expect(mockAxiosPost).toHaveBeenCalledWith(`<PROMO>/v1/lottery/register`, body, {
      headers: authHeader,
      timeout: 15000,
    });
  });

  it('AND api failed MUST throw an error', async () => {
    const error = new Error('API error');
    mockAxiosPost.mockRejectedValueOnce(error);

    await expect(registerUserInRaffleRequest(body, authHeader)).rejects.toThrow(error);
  });
});
