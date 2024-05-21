import { renderHook } from '@testing-library/react-hooks';

import type { ICrossOrders } from 'entities/cross';

import { LoaderStatuses } from '../../types';
import { useLoaderStatus } from '../useLoaderStatus';

describe('WHEN "useLoaderStatus" is called', () => {
  it.each([[{}], [undefined], [null], [''], ['none']])(
    'AND "empty data were provided as %p, MUST return default status"',
    (order) => {
      const { result } = renderHook(() => useLoaderStatus(order as ICrossOrders));
      expect(result.current.loaderStatus).toEqual(LoaderStatuses.default);
    },
  );

  it('AND "error" status is valid, MUST return "LoaderStatuses.error" status', () => {
    const { result } = renderHook(() => useLoaderStatus({ status: 'error' } as ICrossOrders));
    expect(result.current.loaderStatus).toEqual(LoaderStatuses.error);
  });

  it('AND "created" status is valid, MUST return "LoaderStatuses.loading" status', () => {
    const { result } = renderHook(() => useLoaderStatus({ status: 'created' } as ICrossOrders));
    expect(result.current.loaderStatus).toEqual(LoaderStatuses.loading);
  });

  it('AND "running" status is valid, MUST return "LoaderStatuses.loading" status', () => {
    const { result } = renderHook(() => useLoaderStatus({ status: 'running' } as ICrossOrders));
    expect(result.current.loaderStatus).toEqual(LoaderStatuses.loading);
  });

  it('AND "finished" status is valid, MUST return "LoaderStatuses.finished" status', () => {
    const { result } = renderHook(() => useLoaderStatus({ status: 'finished' } as ICrossOrders));
    expect(result.current.loaderStatus).toEqual(LoaderStatuses.finished);
  });
});
