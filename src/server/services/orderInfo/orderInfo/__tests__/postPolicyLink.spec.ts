import { BASE_TIMEOUT } from 'constants/apiTimeout';

import { mockAxiosPost, GET_POLICY_LINK_MOCK } from '../../../../../__mocks__';
import { postPolicyLinkRequest } from '../orderInfoServices';

describe('WHEN "postPolicyLinkRequest" is called', () => {
  const orderHash = 'orderHash';

  describe('AND "order hash" was not provided', () => {
    it('MUST return empty list', async () => {
      expect(await postPolicyLinkRequest('')).toBeNull();
    });

    it('MUST NOT do query to server', async () => {
      await postPolicyLinkRequest('');

      expect(mockAxiosPost).not.toHaveBeenCalled();
    });
  });

  beforeAll(() => {
    mockAxiosPost.mockResolvedValue({ data: GET_POLICY_LINK_MOCK });
  });

  it('MUST do request to service', async () => {
    await postPolicyLinkRequest(orderHash);

    expect(mockAxiosPost).toHaveBeenCalledWith(`<OSAGO_STAFF>/v1/order/${orderHash}/policyinfo`, undefined, {
      timeout: BASE_TIMEOUT,
    });
  });

  it('MUST return police link information', async () => {
    expect(await postPolicyLinkRequest(orderHash)).toEqual(GET_POLICY_LINK_MOCK);
  });
});
