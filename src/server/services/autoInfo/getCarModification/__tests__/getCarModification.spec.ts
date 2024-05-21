import { BASE_TIMEOUT } from 'constants/apiTimeout';

import { mockAxiosGet } from '../../../../../__mocks__';
import { getCarModification } from '../getCarModification';

describe('WHEN "getCarModification" is called', () => {
  const response = [12, 13, 14];
  const modelId = 'modelId';
  const brandId = 'brandId';
  const year = 2022;
  const power = 201;

  beforeAll(() => {
    mockAxiosGet.mockResolvedValue({ data: response });
  });

  it('MUST do request to auto service', async () => {
    await getCarModification(brandId, modelId, year, power);

    expect(mockAxiosGet).toHaveBeenCalledWith(
      `<AUTO_API>/v1/brand/${brandId}/years/${year}/models/${modelId}/powers/${power}/modifications`,
      { timeout: BASE_TIMEOUT },
    );
  });

  it('MUST return list of years', async () => {
    expect(await getCarModification(brandId, modelId, year, power)).toEqual(response);
  });
});
