import { CAR_INFO_PREFILLED_MOCK } from 'mocks/carInfo';
import { mockAppDispatch, mockAxiosPost, TEST_ERROR } from 'mocks/helpers';

import { setCarInfoDictionaries, setCarInfoLoaded, setCarInfoPrefilled } from '../../model/carInfo.slice';
import { mapCarInfo } from '../mapAutoInfo';
import { tryLoadDataByCarNumberThunk } from '../restoreDataByCarNumberThunk';

describe('WHEN "tryLoadDataByCarNumberThunk" is called', () => {
  const getState = (): AppStore => ({
    carInfo: {},
  });

  const validNumber = 'с912ее187';

  describe('AND provided number was not prefilled', () => {
    beforeEach(() => {
      mockAxiosPost.mockResolvedValue({ data: CAR_INFO_PREFILLED_MOCK });
    });

    it('MUST do request for car info by provided car number', async () => {
      await tryLoadDataByCarNumberThunk(validNumber)(mockAppDispatch, getState, undefined);

      expect(mockAxiosPost).toHaveBeenCalled();
      expect(mockAppDispatch).toHaveBeenCalledWith(setCarInfoLoaded(true));
    });

    describe('AND request was succeed', () => {
      it('MUST update car dictionary by provided auto info', async () => {
        await tryLoadDataByCarNumberThunk(validNumber)(mockAppDispatch, getState, undefined);

        expect(mockAppDispatch).toHaveBeenCalledWith(setCarInfoDictionaries(CAR_INFO_PREFILLED_MOCK));
      });

      it('MUST cache last prefilled auto info', async () => {
        await tryLoadDataByCarNumberThunk(validNumber)(mockAppDispatch, getState, undefined);

        expect(mockAppDispatch).toHaveBeenCalledWith(
          setCarInfoPrefilled({ ...mapCarInfo(CAR_INFO_PREFILLED_MOCK), carNumber: validNumber }),
        );
      });
    });

    it('AND request was failed, MUST disable auto info alert block', async () => {
      mockAxiosPost.mockResolvedValue(TEST_ERROR);
      const result = await tryLoadDataByCarNumberThunk(validNumber)(mockAppDispatch, getState, undefined);
      expect(result).toBeNull();
      expect(mockAppDispatch).toHaveBeenCalledWith(setCarInfoLoaded(false));
    });
  });
});
