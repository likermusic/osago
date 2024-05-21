import type { ICrossOrders } from 'entities/cross';

import { LoaderStatuses } from '../../types';
import { getLoaderStatus } from '../useLoaderStatus';

describe('WHEN "getLoaderStatus" is called', () => {
  it.each([[undefined], [null], [''], ['none']])(
    'AND "empty data were provided as %p, MUST return default status"',
    (status) => {
      expect(getLoaderStatus(status as ICrossOrders['status'])).toEqual(LoaderStatuses.default);
    },
  );

  it.each([
    ['error', LoaderStatuses.error],
    ['created', LoaderStatuses.loading],
    ['running', LoaderStatuses.loading],
    ['finished', LoaderStatuses.finished],
  ])('AND %p status is valid, MUST return %p status', (input, output) => {
    expect(getLoaderStatus(input as ICrossOrders['status'])).toEqual(output);
  });
});
