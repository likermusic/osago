import { AUTH_HEADER_MOCK } from 'mocks/authHeader';
import { mockAxiosPost } from 'mocks/helpers';

import { checkPromoRequest } from '../checkPromo';

const promocode = 'promo';

const checkPromoRes = {
  promoCode: 'promo',
  isActive: true,
  error: 'srt',
  status: 'valid',
};

describe('WHEN "checkPromoRequest" is called', () => {
  beforeAll(() => {
    mockAxiosPost.mockResolvedValue({ data: checkPromoRes });
  });

  it('MUST do request to osagogateway service', async () => {
    await checkPromoRequest(promocode);

    expect(mockAxiosPost).toHaveBeenCalledWith(
      `<OSAGOGATEWAY>/v2/promo/check?code=${encodeURI(promocode)}`,
      {},
      AUTH_HEADER_MOCK,
    );
  });

  it('MUST return check promo result', async () => {
    expect(await checkPromoRequest(promocode)).toEqual(checkPromoRes);
  });
});
