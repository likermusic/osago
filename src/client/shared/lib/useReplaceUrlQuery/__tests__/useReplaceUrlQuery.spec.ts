import { act, renderHook } from '@testing-library/react-hooks';

import { mockRouterReplace } from 'mocks/helpers';

import { useGetUrlQueryReplacer } from '../useGetUrlQueryReplacer';

// TODO: os-7670 поправить тест чтобы в mockRouterPush был не просто test/route а еще и квери параметры а то смысла в нем нет
describe('WHEN "useReplaceUrlQuery" is mounted', () => {
  beforeEach(() => {
    mockRouterReplace.mockReset();
  });

  it.each([[null], [{}], [undefined]])(
    'AND replace function is called with %p params, MUST replace all query',
    (query) => {
      const { result } = renderHook(() => useGetUrlQueryReplacer());

      act(() => {
        result.current(query as {});
      });

      expect(mockRouterReplace).toHaveBeenCalledWith({ pathname: 'test/route', query: {} }, undefined, {
        shallow: true,
      });
    },
  );

  it('AND replace function is called with valid params, MUST call route replace function with query string', () => {
    const { result } = renderHook(() => useGetUrlQueryReplacer());

    act(() => {
      result.current({
        hash: 'hash_value',
      });
    });

    expect(mockRouterReplace).toHaveBeenCalledWith(
      { pathname: 'test/route', query: { hash: 'hash_value' } },
      undefined,
      {
        shallow: true,
      },
    );
  });

  it('AND replace function is called with some empty params, MUST call route replace function with only truthy query string', () => {
    const { result } = renderHook(() => useGetUrlQueryReplacer());

    act(() => {
      result.current({
        hash: 'hash_value',
        empty: '',
        empty2: null as unknown as undefined,
        empty3: undefined,
      });
    });

    expect(mockRouterReplace).toHaveBeenCalledWith(
      { pathname: 'test/route', query: { hash: 'hash_value' } },
      undefined,
      {
        shallow: true,
      },
    );
  });
});
