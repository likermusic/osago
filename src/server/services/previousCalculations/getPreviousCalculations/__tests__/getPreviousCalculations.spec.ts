import { PREVIOUS_CALCULATION_RESULT } from 'mocks/previousCalculations';

import { mockAxiosGet, PREVIOUS_CALCULATION, AUTH_HEADER_MOCK } from '../../../../../__mocks__';
import { getPreviousCalculations } from '../getPreviousCalculationsServices';

describe('WHEN "getPreviousCalculations" is called', () => {
  beforeAll(() => {
    mockAxiosGet.mockResolvedValue({ data: PREVIOUS_CALCULATION });
  });

  it('MUST do request to staff service', async () => {
    await getPreviousCalculations(AUTH_HEADER_MOCK.headers);

    expect(mockAxiosGet).toHaveBeenCalledWith(`<OSAGO_STAFF>/v1/usersearches/last`, AUTH_HEADER_MOCK);
  });

  it('MUST return list of old calculations', async () => {
    expect(await getPreviousCalculations(AUTH_HEADER_MOCK.headers)).toEqual(PREVIOUS_CALCULATION_RESULT);
  });
});
