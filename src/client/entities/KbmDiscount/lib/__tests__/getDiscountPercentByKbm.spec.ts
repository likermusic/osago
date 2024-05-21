import { getDiscountPercentByKbm } from '../getDiscountPercentByKbm';

describe('WHEN getDiscountPercentByKbm is called', () => {
  it.each([
    [0.46, 54],
    [0.99, 1],
    [1, 0],
    [1.17, 17],
    [1.46, 46],
    [1.465, 47],
    [1.463, 46],
    [0, 100],
  ])('AND provided kbm is equal (%p), MUST return (%p)', (kbm, result) => {
    expect(getDiscountPercentByKbm(kbm)).toEqual(result);
  });
});
