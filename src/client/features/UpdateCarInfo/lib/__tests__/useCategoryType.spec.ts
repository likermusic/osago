import { renderHook } from '@testing-library/react-hooks';

import { useCategoryType } from '../useCategoryType';

const mockUseOptions = jest.fn();
jest.mock('../useOptions', () => ({
  useOptions: jest.fn().mockImplementation(() => mockUseOptions()),
}));

const mockUseFormContext = jest.fn();
jest.mock('@sravni/cosago-react-library/lib/hooks', () => ({
  useFormContext: jest.fn().mockImplementation(() => mockUseFormContext()),
}));

describe('WHEN useCategoryType is called', () => {
  it('AND category.value is not "B" AND data isPrefilled is true, MUST return "alert"', () => {
    mockUseOptions.mockReturnValue({ categories: [] });
    mockUseFormContext.mockReturnValue({
      watch: () => ({
        value: 'C',
        data: { isPrefilled: true },
      }),
    });
    const { result } = renderHook(() => useCategoryType());

    expect(result.current).toEqual('alert');
  });
  it('AND category.value is "B" AND data isPrefilled is true, MUST return null', () => {
    mockUseOptions.mockReturnValue({ categories: [] });
    mockUseFormContext.mockReturnValue({
      watch: () => ({
        value: 'B',
        data: { isPrefilled: true },
      }),
    });
    const { result } = renderHook(() => useCategoryType());

    expect(result.current).toEqual(null);
  });

  const testWithCarModel = () => {
    it.each([
      [undefined, null],
      [null, null],
      [[{ value: 'C' }], 'alert'],
      [[{ value: 'D' }], 'alert'],
      [[{ value: 'E' }], 'alert'],
      [[{ value: 'B' }, { value: 'C' }], 'field'],
      [[{ value: 'D' }, { value: 'C' }, { value: 'A' }], 'field'],
      [[{ value: 'B' }], null],
    ])('AND categories is %p MUST return %p', (categories, expectation) => {
      mockUseOptions.mockReturnValue({ categories });
      const { result } = renderHook(() => useCategoryType());

      expect(result.current).toEqual(expectation);
    });
  };

  describe.each([
    [
      {
        value: 'B',
        data: { isPrefilled: false },
      },
    ],
    [{ label: '' }],
    null,
    undefined,
  ])('AND category is %p', (category) => {
    beforeEach(() => {
      mockUseFormContext.mockReturnValue({
        watch: () => category,
      });
    });

    testWithCarModel();
  });
});
