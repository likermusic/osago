import { BASE_TIMEOUT } from 'constants/apiTimeout';

import { mockAxiosGet, TEST_ERROR } from '../../../../../__mocks__';
import { getInsuranceCompaniesByIds } from '../insuranceCompaniesServices';
import type { ICompaniesByIdResult } from '../interfaces';

describe('WHEN "getInsuranceCompaniesByIds" is called', () => {
  const result: ICompaniesByIdResult = [{ id: 1234 }];

  beforeEach(() => {
    mockAxiosGet.mockResolvedValue({ data: result });
  });

  describe('AND ids list is empty', () => {
    it('MUST exit', async () => {
      expect(await getInsuranceCompaniesByIds([])).toBeNull();
    });

    it('MUST NOT do request to service', async () => {
      await getInsuranceCompaniesByIds([]);

      expect(mockAxiosGet).not.toHaveBeenCalled();
    });
  });

  describe('AND ids were provided', () => {
    it('MUST do request to "osago gateway" service', async () => {
      await getInsuranceCompaniesByIds(['1234']);

      expect(mockAxiosGet).toHaveBeenCalledWith('<INSURANCECOMPANIES>/v1.0/companies?ids=1234', {
        timeout: BASE_TIMEOUT,
      });
    });

    it('AND request was success, MUST return data from request', async () => {
      expect(await getInsuranceCompaniesByIds(['1234'])).toEqual(result);
    });

    it('AND request was failed, MUST throw error', async () => {
      let error: Nullable<Error> = null;
      mockAxiosGet.mockRejectedValue(TEST_ERROR);

      try {
        await getInsuranceCompaniesByIds(['1234']);
      } catch (e) {
        error = e;
      }
      expect(error).toEqual(TEST_ERROR);
    });
  });
});
