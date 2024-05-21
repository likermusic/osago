import { act, renderHook } from '@testing-library/react-hooks';

import type { AnketaScrollingLabels } from '../config';
import { ANKETA_ID as MockAnketa } from '../config';
import { usePropositionPageScroll } from '../usePropositionPageScroll';

const mockScrollIntoViewAnketa = jest.fn();
const mockScrollIntoViewProposition = jest.fn();
jest.mock('shared/lib/useScrollIntoView', () => ({
  useScrollIntoView: jest.fn().mockImplementation((key: string) => ({
    htmlId: key,
    scrollElementIntoView: key === MockAnketa ? mockScrollIntoViewAnketa : mockScrollIntoViewProposition,
  })),
}));

const mockToggleSummaryAccordion = jest.fn();
jest.mock('../toggleSummaryAccordion', () => ({
  toggleSummaryAccordion: jest.fn().mockImplementation(() => {
    mockToggleSummaryAccordion();
  }),
}));

describe('WHEN "usePropositionPageScroll" is called', () => {
  const getElementById = jest.fn();
  const click = jest.fn();

  Object.defineProperty(document, 'getElementById', {
    value: getElementById,
  });

  it('AND "navigateToPropositionList" is called, MUST call scroll function', () => {
    const { result } = renderHook(() => usePropositionPageScroll());

    act(() => {
      result.current.navigateToPropositionList();
    });

    expect(mockScrollIntoViewProposition).toHaveBeenCalled();
  });

  describe('AND "navigateToAnketa" is called', () => {
    it('MUST call anketa scroll function', () => {
      const { result } = renderHook(() => usePropositionPageScroll());

      act(() => {
        result.current.navigateToAnketa();
      });

      expect(mockScrollIntoViewAnketa).toHaveBeenCalled();
    });

    it('AND anketa accordion is folded, MUST call anketa toggle function', () => {
      getElementById.mockReturnValue(null);
      const { result } = renderHook(() => usePropositionPageScroll());

      act(() => {
        result.current.navigateToAnketa();
      });

      expect(mockToggleSummaryAccordion).toHaveBeenCalled();
    });

    it('AND anketa accordion is unfolded, MUST NOT call anketa toggle function', () => {
      getElementById.mockReturnValue({
        click: jest.fn(),
      });
      const { result } = renderHook(() => usePropositionPageScroll());

      act(() => {
        result.current.navigateToAnketa();
      });

      expect(mockToggleSummaryAccordion).not.toHaveBeenCalled();
    });
  });

  describe('AND "openSummaryBlockById" is called', () => {
    beforeEach(() => {
      jest.useFakeTimers();

      getElementById.mockReturnValue({
        click,
      });
    });

    it('AND it is "DND" block, MUST scroll it into view only', () => {
      const { result } = renderHook(() => usePropositionPageScroll());

      act(() => {
        result.current.openSummaryBlockById('DND');
      });

      expect(mockScrollIntoViewAnketa).toHaveBeenCalled();
      expect(click).not.toHaveBeenCalled();
    });

    it.each([['Driver'], ['CarInsurer'], ['CarOwner'], ['Contacts'], ['CarInfo']])(
      'AND it is %p block, MUST scroll and open edit modal',
      (block: string) => {
        const { result } = renderHook(() => usePropositionPageScroll());

        act(() => {
          result.current.openSummaryBlockById(block as keyof typeof AnketaScrollingLabels);
        });

        act(() => {
          jest.runAllTimers();
        });

        expect(mockScrollIntoViewAnketa).toHaveBeenCalled();
        expect(click).toHaveBeenCalled();
      },
    );
  });

  describe('AND "openSingleDriverOnly" is called', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('AND there are only one driver, MUST open driver popup', () => {
      getElementById.mockReturnValueOnce(null).mockReturnValue({
        click,
      });

      const { result } = renderHook(() => usePropositionPageScroll());

      act(() => {
        result.current.openSingleDriverOnly();
      });

      act(() => {
        jest.runAllTimers();
      });

      expect(mockScrollIntoViewAnketa).toHaveBeenCalled();
      expect(click).toHaveBeenCalled();
    });

    it('AND there are more then one driver, MUST only scroll to anketa', () => {
      getElementById.mockReturnValue({
        click,
      });

      const { result } = renderHook(() => usePropositionPageScroll());

      act(() => {
        result.current.openSingleDriverOnly();
      });

      act(() => {
        jest.runAllTimers();
      });

      expect(mockScrollIntoViewAnketa).toHaveBeenCalled();
      expect(click).not.toHaveBeenCalled();
    });
  });
});
