import { renderHook } from '@testing-library/react-hooks';

import { CrossSalesStatuses } from 'shared/config/cross';

import type { ICrossCalculationsResult } from '../../types';
import { useIsCrossSalesShown } from '../useIsCrossSalesShown';

describe('WHEN "useIsCrossSalesShown" is called', () => {
  it.each([[{}], [undefined], [null]])('AND "empty data were provided as %p, MUST return true"', (order) => {
    renderHook(() => useIsCrossSalesShown(order as ICrossCalculationsResult));
    const { result } = renderHook(() => useIsCrossSalesShown(order as ICrossCalculationsResult));
    expect(result.current).toEqual(true);
  });

  it.each([['none'], ['created'], ['running']])('AND statuses %p was provided, MUST return "true"', (status) => {
    const calculations = {
      status,
      propositions: new Array(2),
    } as ICrossCalculationsResult;
    renderHook(() => useIsCrossSalesShown(calculations));
    const { result } = renderHook(() => useIsCrossSalesShown(calculations));
    expect(result.current).toEqual(true);
  });

  it('AND "finished" status was provided and propositions are not empty, MUST return "true"', () => {
    const calculations = {
      status: CrossSalesStatuses.finished,
      propositions: new Array(2),
    } as ICrossCalculationsResult;
    renderHook(() => useIsCrossSalesShown(calculations));
    const { result } = renderHook(() => useIsCrossSalesShown(calculations));
    expect(result.current).toEqual(true);
  });

  it('AND "noProducts" status and empty propositions is not valid, MUST return "false"', () => {
    const calculations = {
      status: CrossSalesStatuses.noProducts,
      propositions: [],
    } as unknown as ICrossCalculationsResult;
    renderHook(() => useIsCrossSalesShown(calculations));
    const { result } = renderHook(() => useIsCrossSalesShown(calculations));
    expect(result.current).toEqual(false);
  });

  it('AND "finished" status and empty propositions is not valid, MUST return "false"', () => {
    const calculations = {
      status: CrossSalesStatuses.finished,
      propositions: [],
    } as unknown as ICrossCalculationsResult;
    renderHook(() => useIsCrossSalesShown(calculations));
    const { result } = renderHook(() => useIsCrossSalesShown(calculations));
    expect(result.current).toEqual(false);
  });

  it('AND "error" status and empty propositions is not valid, MUST return "false"', () => {
    const calculations = {
      status: CrossSalesStatuses.error,
      propositions: [],
    } as unknown as ICrossCalculationsResult;
    renderHook(() => useIsCrossSalesShown(calculations));
    const { result } = renderHook(() => useIsCrossSalesShown(calculations));
    expect(result.current).toEqual(false);
  });
});
