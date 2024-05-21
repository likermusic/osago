import { BASE_TIMEOUT } from 'constants/apiTimeout';

import { mockAxiosGet } from '../../../../../__mocks__';
import { getCarEnginePowers } from '../getCarEnginePowers';

describe('WHEN "getCarEnginePowers" is called', () => {
  const engines = [12, 13, 14];
  const brandId = 'brandId';
  const modelId = 'modelId';
  const year = 'year';

  beforeAll(() => {
    mockAxiosGet.mockResolvedValue({ data: engines });
  });

  it('MUST do request to auto service', async () => {
    await getCarEnginePowers(brandId, modelId, year);

    expect(mockAxiosGet).toHaveBeenCalledWith(
      `<AUTO_API>/v1/brand/${brandId}/years/${year}/models/${modelId}/engine-powers`,
      { timeout: BASE_TIMEOUT },
    );
  });

  it('MUST return list of engines powers', async () => {
    expect(await getCarEnginePowers(brandId, modelId, year)).toEqual(engines);
  });
});
