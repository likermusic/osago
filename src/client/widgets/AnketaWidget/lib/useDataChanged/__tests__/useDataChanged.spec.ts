import { renderHook } from '@testing-library/react-hooks';

import { mockAppSelector } from 'mocks/helpers';

import { useDataChanged } from '../useDataChanged';

describe('WHEN "useDataChanged" is mounted AND returned function was called', () => {
  const onDataChanged = jest.fn();

  it('AND form is ready, MUST call provided "onDataChanged" callback', () => {
    mockAppSelector.mockReturnValue(false);
    const { result } = renderHook(() => useDataChanged(onDataChanged));

    result.current();

    expect(onDataChanged).not.toHaveBeenCalled();
  });

  it('AND form is not ready, MUST NOT call provided "onDataChanged" callback', () => {
    mockAppSelector.mockReturnValue(true);
    const { result } = renderHook(() => useDataChanged(onDataChanged));

    result.current();

    expect(onDataChanged).toHaveBeenCalled();
  });

  it('AND form is toggled from not ready to ready, MUST call provided "onDataChanged" callback', () => {
    mockAppSelector.mockReturnValue(false);
    const { result, rerender } = renderHook(() => useDataChanged(onDataChanged));
    result.current();

    expect(onDataChanged).not.toHaveBeenCalled();

    mockAppSelector.mockReturnValue(true);
    rerender();
    result.current();

    expect(onDataChanged).toHaveBeenCalled();
  });
});
