import { renderHook } from '@testing-library/react-hooks';

import { mockAppSelector } from '../../../../../__mocks__';
import { useFilteredProfile } from '../useFilteredProfile';

describe('WHEN "useFilteredProfile" is mounted', () => {
  it('AND people state does not contain records from profile service, MUST return empty array', () => {
    mockAppSelector.mockReturnValue([]);
    const { result } = renderHook(() => useFilteredProfile(['test']));

    expect(result.current).toEqual([]);
  });

  describe('AND people state contains records from profile service', () => {
    const person = {
      label: 'test',
    };

    beforeEach(() => {
      mockAppSelector.mockReturnValue([person]);
    });

    it('AND "excludedPeopleFullNames" is not provided, MUST return empty array', () => {
      const { result } = renderHook(() => useFilteredProfile(undefined));

      expect(result.current).toEqual([person]);
    });

    it('AND "excludedPeopleFullNames" is provided, MUST return list of persons without persons from "excludedPeopleFullNames" ', () => {
      const { result } = renderHook(() => useFilteredProfile(['test']));

      expect(result.current).toEqual([]);
    });
  });
});
