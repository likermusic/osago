import { POLICIES_RESULT } from 'mocks/policies';

import { mockAxiosGet, POLICIES, AUTH_HEADER_MOCK } from '../../../../../__mocks__';
import { getPreviousPolicies } from '../getPreviousPoliciesServices';

describe('WHEN "getPreviousPolicies" is called', () => {
  beforeAll(() => {
    mockAxiosGet.mockResolvedValue({ data: POLICIES });
  });

  it('MUST do request to staff service', async () => {
    await getPreviousPolicies(AUTH_HEADER_MOCK.headers);

    expect(mockAxiosGet).toHaveBeenCalledWith(`<OSAGO_STAFF>/v1/userorders/last`, AUTH_HEADER_MOCK);
  });

  it('MUST return list of policies', async () => {
    expect(await getPreviousPolicies(AUTH_HEADER_MOCK.headers)).toEqual(POLICIES_RESULT);
  });
});
