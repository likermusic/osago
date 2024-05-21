import { act, renderHook } from '@testing-library/react-hooks';

import { mockAppSelector, mockReset, mockTrigger } from '../../../../../__mocks__';
import type { TPerson } from '../../types';
import { convertPersonToFormFields } from '../convertPersonToFormFields';
import { useApplyProfile } from '../useApplyProfile';

const resetOptions = { keepDirty: false, keepTouched: false, keepIsValid: false };
describe('WHEN "useApplyProfile" is mounted AND "callback" is called', () => {
  describe('AND it is owner or insurer set', () => {
    const BASE_PERSON: TPerson = {
      addressFlat: '3a',
      address: {
        value: 'Самарская обл, г Тольятти, ул Фрунзе, д 8Б',
        source: {
          data: {
            fias_level: '8',
            region: 'Самарская',
          },
        },
      },
      birthday: '05.01.1999',
      fullName: 'Иванов Иван Иванович',
      passportNumber: '1234567890',
      phone: '79272123456',
    };

    it('AND persons from profile service were not provided, MUST NOT update form data', () => {
      mockAppSelector.mockReturnValue([]);
      const { result } = renderHook(() => useApplyProfile(() => {}));

      act(() => {
        result.current(BASE_PERSON.fullName);
      });

      expect(mockReset).not.toHaveBeenCalled();
      expect(mockTrigger).not.toHaveBeenCalled();
    });

    it('AND persons from profile service were provided, MUST update form data by provided map', () => {
      mockAppSelector.mockReturnValue([BASE_PERSON]);
      const { result } = renderHook(() => useApplyProfile(() => {}));

      act(() => {
        result.current(BASE_PERSON.fullName);
      });

      expect(mockReset).toHaveBeenCalledWith(convertPersonToFormFields(BASE_PERSON), resetOptions);
      expect(mockTrigger).toHaveBeenCalled();
    });
  });

  describe('AND it is driver set', () => {
    it('MUST update form data by provided map', () => {
      const BASE_PERSON: TPerson = {
        birthday: '05.01.1999',
        experienceStartDate: '21.03.2017',
        fullName: 'Иванов Иван Иванович',
        licenceNumber: '1234567890',
      };

      mockAppSelector.mockReturnValue([BASE_PERSON]);
      const { result } = renderHook(() => useApplyProfile(() => {}));

      act(() => {
        result.current(BASE_PERSON.fullName);
      });

      expect(mockReset).toHaveBeenCalledWith(convertPersonToFormFields(BASE_PERSON), resetOptions);
      expect(mockTrigger).toHaveBeenCalled();
    });
  });
});
