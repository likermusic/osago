import { AUTH_HEADER_MOCK, mockAxiosGet, CROSS_CALCULATIONS_MOCK } from '../../../../../__mocks__';
import { getCrossCalculations } from '../crossCalculationsServices';

describe('WHEN "getCrossCalculations" is called', () => {
  const crossHash = 'crossHash';
  beforeAll(() => {
    mockAxiosGet.mockResolvedValue({ data: CROSS_CALCULATIONS_MOCK });
  });

  it('MUST do request to service', async () => {
    await getCrossCalculations(crossHash);

    expect(mockAxiosGet).toHaveBeenCalledWith(
      `<OSAGOGATEWAY>/v1/x/calculation/${encodeURI(crossHash)}`,
      AUTH_HEADER_MOCK,
    );
  });

  it('MUST return cross calculations', async () => {
    expect(await getCrossCalculations(crossHash)).toEqual(CROSS_CALCULATIONS_MOCK);
  });
});
