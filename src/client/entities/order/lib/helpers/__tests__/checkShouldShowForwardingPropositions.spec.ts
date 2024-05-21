import type { TOrderStatus } from '../../../types';
import { checkShouldShowForwardingPropositions } from '../checkShouldShowForwardingPropositions';

describe('WHEN "checkShouldShowForwardingPropositions" is called', () => {
  it.each`
    orderStatus              | searchPrice  | price        | result
    ${null}                  | ${undefined} | ${undefined} | ${false}
    ${'priceChanged'}        | ${undefined} | ${undefined} | ${false}
    ${'initial'}             | ${undefined} | ${undefined} | ${false}
    ${'loading'}             | ${1000}      | ${undefined} | ${false}
    ${'success'}             | ${1000}      | ${1000}      | ${false}
    ${'error'}               | ${undefined} | ${undefined} | ${false}
    ${'priceChanged'}        | ${1000}      | ${900}       | ${false}
    ${'priceAndDateChanged'} | ${950}       | ${900}       | ${true}
    ${'priceAndDateChanged'} | ${150}       | ${1000}      | ${true}
    ${'priceChanged'}        | ${1000}      | ${1500}      | ${true}
    ${'rejected'}            | ${1000}      | ${1000}      | ${true}
    ${'allRejected'}         | ${1000}      | ${1000}      | ${true}
    ${'dateChanged'}         | ${1000}      | ${1000}      | ${true}
  `(
    'MUST map orderStatus:$orderStatus, searchPrice:$searchPrice, price:$price into "$result"',
    ({ orderStatus, searchPrice, price, result }) => {
      expect(checkShouldShowForwardingPropositions(orderStatus as unknown as TOrderStatus, searchPrice, price)).toBe(
        result,
      );
    },
  );
});
