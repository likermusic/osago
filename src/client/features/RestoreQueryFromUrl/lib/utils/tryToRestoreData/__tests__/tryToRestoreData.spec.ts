import type { IParseUrlQuery } from 'commonUtils/parseUrlQuery/interface';
import { BFF_PROXY_API } from 'constants/apiRoutes';
import { mockAppDispatch, mockAxiosGet, mockAxiosPost } from 'mocks/helpers';
import { FULL_QUERY } from 'mocks/mapCalculationQueryToFormCarInfo';

import { tryToRestoreData } from '../tryToRestoreData';

const mockUpdateFormStoreThunk = jest.fn();
jest.mock('../../updateFormStoreThunk', () => ({
  updateFormStoreThunk: (data: unknown) => mockUpdateFormStoreThunk(data),
}));

describe('WHEN "tryToRestoreData" is called', () => {
  const mockGetState = jest.fn();
  const carNumber = 'с911тт33';

  describe('AND "regNumberToken" was provided', () => {
    beforeEach(() => {
      mockAxiosPost.mockResolvedValue({
        data: {
          carNumber,
          year: 0,
        },
      });
    });

    it('MUST try to decode car number token on bff', async () => {
      await tryToRestoreData({ regNumberToken: 'some-long-hash-value' } as IParseUrlQuery)(
        mockAppDispatch,
        mockGetState,
        undefined,
      );

      expect(mockAxiosPost).toHaveBeenCalledWith(BFF_PROXY_API.getRegNumberTokenInfo, {
        carNumberToken: 'some-long-hash-value',
      });
    });

    it('MUST return query with filled data', async () => {
      expect(
        await tryToRestoreData({ regNumberToken: 'some-long-hash-value' } as IParseUrlQuery)(
          mockAppDispatch,
          mockGetState,
          undefined,
        ),
      ).toEqual({
        brandId: undefined,
        carDocument: { date: undefined, documentType: 'sts', number: '', series: '' },
        carNumber: 'с911тт33',
        enginePower: undefined,
        modelId: undefined,
        modification: undefined,
        vehicleCategory: undefined,
        year: undefined,
      });
    });
  });

  describe.each([
    ['orderOrProlongationHash', { orderOrProlongationHash: 'orderOrProlongationHash' }],
    ['hash, searchId', { hash: 'hash', searchId: 'searchId' }],
    ['calculationHash', { calculationHash: '1234567891234567890012' }],
  ])('AND param %p was provided', (property, query) => {
    beforeEach(() => {
      mockAxiosGet.mockResolvedValue({
        data: FULL_QUERY,
      });
    });

    it('MUST do request to bff for trying to restore query by provided hash', async () => {
      await tryToRestoreData(query as IParseUrlQuery)(mockAppDispatch, mockGetState, undefined);

      expect(mockAxiosGet).toHaveBeenCalledWith(BFF_PROXY_API.restoreCalculationQuery, {
        params: property === 'orderOrProlongationHash' ? { orderHash: 'orderOrProlongationHash' } : query,
      });
    });

    describe('AND request returns data', () => {
      it('MUST update store by query', async () => {
        await tryToRestoreData(query as IParseUrlQuery)(mockAppDispatch, mockGetState, undefined);

        expect(mockUpdateFormStoreThunk).toHaveBeenCalledWith(FULL_QUERY);
      });

      it('MUST return query', async () => {
        expect(await tryToRestoreData(query as IParseUrlQuery)(mockAppDispatch, mockGetState, undefined)).toEqual(
          FULL_QUERY,
        );
      });
    });

    it('AND request returns null, MUST return null', async () => {
      mockAxiosGet.mockResolvedValue({
        data: null,
      });

      expect(await tryToRestoreData(query as IParseUrlQuery)(mockAppDispatch, mockGetState, undefined)).toBeNull();
    });
  });

  it('AND no one parament was provided, MUST return null', async () => {
    expect(await tryToRestoreData({} as IParseUrlQuery)(mockAppDispatch, mockGetState, undefined)).toBeNull();
  });
});
