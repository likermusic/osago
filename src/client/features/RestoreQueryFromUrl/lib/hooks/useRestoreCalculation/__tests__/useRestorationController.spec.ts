import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

import { mockAppDispatch } from 'mocks/helpers';

import { RestorationFormEventMediator } from 'shared/lib';

import { useRestorationController } from '../useRestoreController';

const MockCheckMemoryHasClientDataByNumber = jest.fn();

jest.mock('shared/lib', () => ({
  ...jest.requireActual('shared/lib'),
  checkMemoryHasClientDataByNumber: () => MockCheckMemoryHasClientDataByNumber(),
}));
describe('WHEN "useRestorationController" is mounted', () => {
  describe('AND custom event contains local storage restoration data', () => {
    it('AND storage contains data for provided number, MUST init store with data from localstorage', () => {
      MockCheckMemoryHasClientDataByNumber.mockReturnValue(true);
      renderHook(() => useRestorationController());

      RestorationFormEventMediator.generateEvent({
        payload: {
          carNumber: 'c911tt33',
        },
        type: 'LOCAL_STORAGE',
      });

      act(() => {
        expect(mockAppDispatch).toHaveBeenCalled();
      });
    });

    it('AND storage does not contain data for provided number, MUST do nothing', () => {
      MockCheckMemoryHasClientDataByNumber.mockReturnValue(false);
      renderHook(() => useRestorationController());

      RestorationFormEventMediator.generateEvent({
        payload: {
          carNumber: 'c911tt33',
        },
        type: 'LOCAL_STORAGE',
      });

      act(() => {
        expect(mockAppDispatch).not.toHaveBeenCalled();
      });
    });
  });

  it('AND hook was unmounted, MUST clean restoration subscription', () => {
    MockCheckMemoryHasClientDataByNumber.mockReturnValue(true);
    const { unmount } = renderHook(() => useRestorationController());

    act(unmount);

    RestorationFormEventMediator.generateEvent({
      payload: {
        carNumber: 'c911tt33',
      },
      type: 'LOCAL_STORAGE',
    });

    act(() => {
      expect(mockAppDispatch).not.toHaveBeenCalled();
    });
  });
});
