import { BASE_TIMEOUT } from 'constants/apiTimeout';

import { mockAxiosGet } from '../../../../../__mocks__/helpers/axiosMock';
import { getManufactureYears } from '../getManufactureYears';

describe('WHEN "getManufactureYears" is called', () => {
  const years = [12, 13, 14];
  const modelId = 'modelId';

  beforeAll(() => {
    mockAxiosGet.mockResolvedValue({ data: years });
  });

  it('MUST do request to auto service', async () => {
    await getManufactureYears(modelId);

    expect(mockAxiosGet).toHaveBeenCalledWith(`<AUTO_API>/v1/model/${modelId}/years`, { timeout: BASE_TIMEOUT });
  });

  it('MUST return list of years', async () => {
    expect(await getManufactureYears(modelId)).toEqual(years);
  });
});
