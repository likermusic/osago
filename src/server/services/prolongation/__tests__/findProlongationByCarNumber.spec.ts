import type { Prolongation } from 'commonTypes/api/prolongation';
import { AUTH_HEADER_MOCK } from 'mocks/authHeader';
import { mockAxiosPost, TEST_ERROR } from 'mocks/helpers';

import { findProlongationByCarNumber } from '../findProlongationByCarNumber';

describe('WHEN "findProlongationByCarNumber" is called', () => {
  const carNumber = '1234';
  const phone = '9042000000';
  const utm = {};
  const returnData: Prolongation.FoundedProlongationPolicyResponse = {
    userName: 'Test Test Test',
  };

  beforeEach(() => {
    mockAxiosPost.mockResolvedValue({
      data: returnData,
    });
  });

  it('MUST do request to osago gateway service', async () => {
    await findProlongationByCarNumber(carNumber, phone, utm);

    expect(mockAxiosPost).toHaveBeenCalledWith(
      '<OSAGOGATEWAY>/v1/orders/prolongationOffer',
      { carNumber, phone, utm },
      AUTH_HEADER_MOCK,
    );
  });

  describe('AND request is succeed', () => {
    it('MUST provide responded data to client', async () => {
      expect(await findProlongationByCarNumber(carNumber, phone, utm)).toEqual({
        ...returnData,
        carNumber,
      });
    });

    it('AND offer not found, MUST provide 400 error to client', async () => {
      mockAxiosPost.mockResolvedValue({
        data: {
          hasError: true,
          error: TEST_ERROR.message,
        },
      });
      let error: Nullable<Error> = null;
      try {
        await findProlongationByCarNumber(carNumber, phone, utm);
      } catch (e) {
        error = e;
      }

      expect(error?.message).toEqual(TEST_ERROR.message);
    });
  });

  it('AND "carNumber" was not provided, MUST return 400 error to client', async () => {
    let error: Nullable<Error> = null;

    try {
      await findProlongationByCarNumber('', phone, utm);
    } catch (e) {
      error = e;
    }
    expect(error?.message).toEqual('Не указан carNumber');
  });

  it('AND request is failed, MUST provide error to client', async () => {
    mockAxiosPost.mockRejectedValue(TEST_ERROR);
    let error: Nullable<Error> = null;

    try {
      await findProlongationByCarNumber(carNumber, phone, utm);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(TEST_ERROR);
  });
});
