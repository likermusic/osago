import { MOCK_NANO_ID_VALUE, mockedNanoid } from 'mocks/helpers';
import { INITIAL_ORDER } from 'mocks/orderInfo';

import { ORDER_ERROR_ALERT } from 'entities/order';

import { generateEmptyOrder } from '../generateEmptyOrder';

describe('WHEN "generateEmptyOrder" is called', () => {
  it('MUST return empty order', () => {
    mockedNanoid.mockReturnValue(MOCK_NANO_ID_VALUE);

    expect(generateEmptyOrder()).toEqual(INITIAL_ORDER);
  });
  it('MUST return empty order with changed props', () => {
    mockedNanoid.mockReturnValue(MOCK_NANO_ID_VALUE);

    expect(generateEmptyOrder({ orderPropositionStatus: 'error', alerts: ORDER_ERROR_ALERT })).toEqual({
      ...INITIAL_ORDER,
      orderPropositionStatus: 'error',
      alerts: ORDER_ERROR_ALERT,
    });
  });
});
