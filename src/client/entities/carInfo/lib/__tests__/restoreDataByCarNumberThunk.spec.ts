import { act } from '@testing-library/react-hooks';

import { CAR_INFO_PREFILLED_MOCK } from 'mocks/carInfo';
import { mockAppDispatch } from 'mocks/helpers';

import { setCarInfoDefault, setShoudShowCarNumberField } from '../../model/carInfo.slice';
import { mapCarInfo } from '../mapAutoInfo';
import { restoreDataByCarNumberThunk } from '../restoreDataByCarNumberThunk';

describe('WHEN "tryRestoreDataByCarNumberThunk" is called', () => {
  const getState = (carNumber: string) => (): AppStore => ({
    carInfo: {
      lastPrefilledValues: {
        carNumber,
      },
    },
  });

  it('AND number was not provided, MUST do nothing', () => {
    act(() => {
      restoreDataByCarNumberThunk('')(mockAppDispatch, getState(''), undefined);
    });

    act(() => {
      restoreDataByCarNumberThunk('12')(mockAppDispatch, getState(''), undefined);
    });

    expect(mockAppDispatch).not.toHaveBeenCalled();
  });

  describe('AND number was provided', () => {
    const validNumber = 'с912ее187';

    beforeEach(() => {
      mockAppDispatch.mockResolvedValue({ ...mapCarInfo(CAR_INFO_PREFILLED_MOCK), carNumber: validNumber });
    });

    it('AND provided number has already been prefilled, MUST use exited set for restoring', () => {
      restoreDataByCarNumberThunk(validNumber)(mockAppDispatch, getState(validNumber), undefined);

      expect(mockAppDispatch).toHaveBeenCalledWith(setShoudShowCarNumberField(true));
      expect(mockAppDispatch).toHaveBeenCalledWith(
        setCarInfoDefault(getState(validNumber)().carInfo.lastPrefilledValues),
      );
    });

    it('AND provided number has already been prefilled, MUST use exited set for restoring', async () => {
      await restoreDataByCarNumberThunk(validNumber)(mockAppDispatch, getState(''), undefined);

      expect(mockAppDispatch).toHaveBeenCalledWith(
        setCarInfoDefault({ ...mapCarInfo(CAR_INFO_PREFILLED_MOCK), carNumber: validNumber }),
      );
    });
  });
});
