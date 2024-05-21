import { BASE_TIMEOUT } from 'constants/apiTimeout';

import { mockAxiosGet } from '../../../../../__mocks__/helpers/axiosMock';
import { AUTO_INFO_SERVICE_MODEL } from '../../../../../__mocks__/model';
import { getModels } from '../getModels';

describe('WHEN "getModels" is called', () => {
  const models = [AUTO_INFO_SERVICE_MODEL];
  const brandId = 'brandId';

  beforeAll(() => {
    mockAxiosGet.mockResolvedValue({ data: models });
  });

  it('MUST do request to auto service', async () => {
    await getModels(brandId);

    expect(mockAxiosGet).toHaveBeenCalledWith(
      `<AUTO_API>/v1/brand/${brandId}/models?yearFrom=1950&categories=A&categories=B&categories=C&categories=D`,
      {
        timeout: BASE_TIMEOUT,
      },
    );
  });

  it('MUST return list of car models', async () => {
    expect(await getModels(brandId)).toEqual(models);
  });
});
