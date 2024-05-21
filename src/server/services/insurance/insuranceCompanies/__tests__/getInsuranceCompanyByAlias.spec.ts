import { BASE_TIMEOUT } from 'constants/apiTimeout';

import { mockAxiosGet, TEST_ERROR } from '../../../../../__mocks__';
import { getInsuranceCompanyByAlias } from '../insuranceCompaniesServices';
import type { ICompaniesByIdResult } from '../interfaces';

describe('WHEN "getInsuranceCompanyByAlias" is called', () => {
  const result: ICompaniesByIdResult = [{ id: 1234 }];

  beforeEach(() => {
    mockAxiosGet.mockResolvedValue({ data: result });
  });

  describe('AND alias is empty', () => {
    it('MUST exit', async () => {
      expect(await getInsuranceCompanyByAlias('')).toBeNull();
    });

    it('MUST NOT do request to service', async () => {
      await getInsuranceCompanyByAlias('');

      expect(mockAxiosGet).not.toHaveBeenCalled();
    });
  });

  describe('AND alias were provided', () => {
    it('MUST do request to "insurance" service', async () => {
      await getInsuranceCompanyByAlias('alias');

      expect(mockAxiosGet).toHaveBeenCalledWith('<INSURANCECOMPANIES>/v1.0/company-details/alias', {
        timeout: BASE_TIMEOUT,
      });
    });

    it('AND request was success, MUST return data from request', async () => {
      expect(await getInsuranceCompanyByAlias('alias')).toEqual(result);
    });

    it('AND request was failed, MUST throw error', async () => {
      let error: Nullable<Error> = null;
      mockAxiosGet.mockRejectedValue(TEST_ERROR);

      try {
        await getInsuranceCompanyByAlias('alias');
      } catch (e) {
        error = e;
      }
      expect(error).toEqual(TEST_ERROR);
    });
  });
});
