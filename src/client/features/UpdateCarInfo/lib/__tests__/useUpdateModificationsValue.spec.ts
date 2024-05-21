import { renderHook } from '@testing-library/react-hooks';

import { mockReset, mockWatch } from 'mocks/helpers';

import { useUpdateModificationsValue } from '../useUpdateModificationsValue';

const mockUseIsCarModificationsAvailable = jest.fn();
jest.mock('features/UpdateCarInfo/lib/useIsCarModificationsAvailable', () => ({
  useIsCarModificationsAvailable: jest.fn().mockImplementation(() => mockUseIsCarModificationsAvailable()),
}));

describe('WHEN "useUpdateModificationsValue" is mounted', () => {
  describe('AND modifications are available', () => {
    beforeEach(() => {
      mockUseIsCarModificationsAvailable.mockReturnValue(true);
    });

    describe('AND modification is undefined', () => {
      beforeEach(() => {
        mockWatch.mockReturnValue(undefined);
      });
      it('MUST run reset once', () => {
        renderHook(() => useUpdateModificationsValue());
        expect(mockReset).toHaveBeenCalledTimes(1);
      });
      it('MUST reset modification', () => {
        renderHook(() => useUpdateModificationsValue());
        expect(mockReset).toHaveBeenCalledWith('carModification', { keepDirty: true, defaultValue: { value: '' } });
      });
    });

    describe('AND modification is null', () => {
      beforeEach(() => {
        mockWatch.mockReturnValue(null);
      });
      it('MUST run reset once', () => {
        renderHook(() => useUpdateModificationsValue());
        expect(mockReset).toHaveBeenCalledTimes(1);
      });
      it('MUST reset modification', () => {
        renderHook(() => useUpdateModificationsValue());
        expect(mockReset).toHaveBeenCalledWith('carModification', { keepDirty: true, defaultValue: { value: '' } });
      });
    });

    describe('AND modification is set', () => {
      beforeEach(() => {
        mockWatch.mockReturnValue('xDrive');
      });
      it('MUST not reset field', () => {
        renderHook(() => useUpdateModificationsValue());
        expect(mockReset).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('AND modifications are not available', () => {
    beforeEach(() => {
      mockUseIsCarModificationsAvailable.mockReturnValue(false);
    });

    describe('AND modification is undefined', () => {
      beforeEach(() => {
        mockWatch.mockReturnValue(undefined);
      });
      it('MUST not reset field', () => {
        renderHook(() => useUpdateModificationsValue());
        expect(mockReset).toHaveBeenCalledTimes(0);
      });
    });

    describe('AND modification is null', () => {
      beforeEach(() => {
        mockWatch.mockReturnValue(null);
      });
      it('MUST not reset field', () => {
        renderHook(() => useUpdateModificationsValue());
        expect(mockReset).toHaveBeenCalledTimes(0);
      });
    });

    describe('AND modification is set', () => {
      beforeEach(() => {
        mockWatch.mockReturnValue('xDrive');
      });
      it('MUST not reset field', () => {
        renderHook(() => useUpdateModificationsValue());
        expect(mockReset).toHaveBeenCalledTimes(0);
      });
    });
  });
});
