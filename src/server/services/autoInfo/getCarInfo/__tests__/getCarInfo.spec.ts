import {
  AUTH_HEADER_MOCK,
  AUTO_INFO_SERVICE_BRAND,
  AUTO_INFO_SERVICE_MODEL,
  mockAxiosGet,
} from '../../../../../__mocks__';
import { getCarInfo } from '../getCarInfo';

describe('WHEN "getCarInfo" is called', () => {
  const testData = {
    brand: AUTO_INFO_SERVICE_BRAND,
    model: AUTO_INFO_SERVICE_MODEL,
    year: 2022,
    power: 123,
    models: [AUTO_INFO_SERVICE_MODEL],
    powers: [123, 150],
    years: [2022],
  };
  const carNumber = 'carNumber';

  beforeEach(() => {
    mockAxiosGet.mockResolvedValue({ data: testData });
  });

  it('MUST do request to auto service', async () => {
    await getCarInfo({ type: 'number', value: carNumber });

    expect(mockAxiosGet).toHaveBeenCalledWith(
      `<OSAGOGATEWAY>/auto/v1/info/?type=number&value=carNumber`,
      AUTH_HEADER_MOCK,
    );
  });

  it('MUST return list of engines powers', async () => {
    mockAxiosGet.mockResolvedValueOnce({ data: testData }).mockResolvedValueOnce({ data: [123, 150] });

    expect(await getCarInfo({ type: 'number', value: carNumber })).toEqual({
      ...testData,
      models: [AUTO_INFO_SERVICE_MODEL],
      powers: [123, 150],
      years: [2022],
      modifications: [123, 150],
    });
  });
});
