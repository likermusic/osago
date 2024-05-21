import { act, renderHook } from '@testing-library/react-hooks';
import type React from 'react';

import { useTogglePropositionDetails } from '../useTogglePropositionDetails';

describe('WHEN "useTogglePropositionDetails" is mounted', () => {
  it('AND card "togglePropositionDetails" was called, MUST toggle flag state', () => {
    const { result } = renderHook(() => useTogglePropositionDetails());
    expect(result.current.isCardDetailsOpened).toBeFalsy();

    act(() => {
      result.current.togglePropositionDetails(true);
    });

    expect(result.current.isCardDetailsOpened).toBeTruthy();

    act(() => {
      result.current.togglePropositionDetails(false);
    });

    expect(result.current.isCardDetailsOpened).toBeFalsy();
  });

  describe('AND card "openPropositionDetails" was called', () => {
    it('And event comes from active element, MUST NOT toggle switcher', () => {
      const { result } = renderHook(() => useTogglePropositionDetails());
      expect(result.current.isCardDetailsOpened).toBeFalsy();

      act(() => {
        result.current.openPropositionDetails({ isActiveElement: true } as unknown as React.MouseEvent<HTMLDivElement>);
      });

      expect(result.current.isCardDetailsOpened).toBeFalsy();
    });

    it('And event comes from not from active element, MUST toggle switcher to on', () => {
      const { result } = renderHook(() => useTogglePropositionDetails());
      expect(result.current.isCardDetailsOpened).toBeFalsy();

      act(() => {
        result.current.openPropositionDetails({
          isActiveElement: false,
        } as unknown as React.MouseEvent<HTMLDivElement>);
      });

      expect(result.current.isCardDetailsOpened).toBeTruthy();
    });
  });
});
