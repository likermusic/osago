import { AUTH_HEADER_MOCK } from 'mocks/authHeader';

import { AUTO_INFO_SERVICE_BRAND } from '../../../../../__mocks__/brand';
import { mockAxiosGet } from '../../../../../__mocks__/helpers/axiosMock';
import { getBrands } from '../getBrands';

describe('WHEN "getBrands" is called', () => {
  beforeAll(() => {
    mockAxiosGet.mockResolvedValue({ data: [AUTO_INFO_SERVICE_BRAND] });
  });

  it('MUST do request to auto service', async () => {
    await getBrands();

    expect(mockAxiosGet).toHaveBeenCalledWith(
      `<OSAGOGATEWAY>/auto/v1/brands?yearFrom=1950&categories=A&categories=B&categories=C&categories=D`,
      AUTH_HEADER_MOCK,
    );
  });

  it('MUST return list of brands', async () => {
    expect(await getBrands()).toEqual([AUTO_INFO_SERVICE_BRAND]);
  });
});
