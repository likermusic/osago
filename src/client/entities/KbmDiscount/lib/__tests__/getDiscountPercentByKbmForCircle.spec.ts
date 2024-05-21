import { getDiscountPercentByKbmForCircle } from '../KbmCircle/getDiscountPercentByKbmForCircle';

describe('WHEN getDiscountPercentByKbmForCircle is called', () => {
  it.each([
    [0.46, 0.53],
    [0.99, 0.56],
    [1, 0.56],
    [1.17, 0.57],
    [1.46, 0.59],
    [1.465, 0.59],
    [1.463, 0.59],
    [0, 0.5],
  ])('AND provided kbm is equal (%p), MUST return (%p) status', (kbm, result) => {
    expect(getDiscountPercentByKbmForCircle(kbm)).toEqual(result);
  });
});
