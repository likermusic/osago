import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { mapOrderStatus } from '../mapOrderStatus';

describe('WHEN "mapOrderStatus" is called', () => {
  it.each([
    {
      orderStatus: null,
      isPriceChanged: false,
      isCompleted: false,
      offersLength: 0,
      result: 'initial',
    } as const,
    {
      orderStatus: undefined,
      isPriceChanged: true,
      isCompleted: true,
      offersLength: 10,
      result: 'initial',
    } as const,
    {
      orderStatus: 'DateChanged',
      isPriceChanged: false,
      isCompleted: true,
      offersLength: 0,
      result: 'dateChanged',
    } as const,
    {
      orderStatus: 'DateChanged',
      isPriceChanged: false,
      isCompleted: false,
      offersLength: 10,
      result: 'dateChanged',
    } as const,
    {
      orderStatus: 'DateChanged',
      isPriceChanged: true,
      isCompleted: false,
      offersLength: 10,
      result: 'priceAndDateChanged',
    } as const,
    {
      orderStatus: 'Loading',
      isPriceChanged: true,
      isCompleted: false,
      offersLength: 10,
      result: 'priceChanged',
    } as const,
    {
      orderStatus: 'Success',
      isPriceChanged: true,
      isCompleted: true,
      offersLength: 10,
      result: 'priceChanged',
    } as const,
    {
      orderStatus: 'Success',
      isPriceChanged: false,
      isCompleted: false,
      offersLength: 10,
      result: 'success',
    } as const,
    {
      orderStatus: 'Failed',
      isPriceChanged: false,
      isCompleted: true,
      offersLength: 10,
      result: 'rejected',
    } as const,
    {
      orderStatus: 'Failed',
      isPriceChanged: false,
      isCompleted: true,
      offersLength: 0,
      result: 'allRejected',
    } as const,
    {
      orderStatus: 'Loading',
      isPriceChanged: false,
      isCompleted: false,
      offersLength: 0,
      result: 'loading',
    } as const,
    {
      orderStatus: 'Loading',
      isPriceChanged: false,
      isCompleted: false,
      offersLength: 10,
      result: 'loading',
    } as const,
  ])(
    'MUST map orderStatus:$orderStatus, isPriceChanged:$isPriceChanged, isCompleted:$isCompleted, offersLength:offersLength into "$result"',
    ({ orderStatus, isPriceChanged, isCompleted, offersLength, result }) => {
      expect(
        mapOrderStatus(
          orderStatus as unknown as PropositionCalculations.GetManyOrders['orderInfo']['orderStatus'],
          isPriceChanged,
          isCompleted,
          offersLength,
        ),
      ).toBe(result);
    },
  );
});
