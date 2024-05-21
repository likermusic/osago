import { getCircleOffsetByKbm } from '../KbmCircle/getCircleOffsetByKbm';
import { CIRCLE_CONFIG } from '../KbmCircle/KbmCircle.constants';

jest.mock('../KbmCircle/getDiscountPercentByKbmForCircle', () => ({
  getDiscountPercentByKbmForCircle: jest.fn().mockReturnValue(0.5),
}));

jest.mock('../getDiscountPercentByKbm', () => ({
  getDiscountPercentByKbm: jest.fn().mockReturnValue(0.5),
}));

describe('WHEN getCircleOffsetByKbm is called', () => {
  it.each([
    [1, 0.5 * CIRCLE_CONFIG.CIRCUMFERENCE],
    [0.9, 0.995 * CIRCLE_CONFIG.CIRCUMFERENCE],
    [1.1, 0.5 * CIRCLE_CONFIG.CIRCUMFERENCE],
  ])('AND provided kbm is equal (%p), MUST return (%p) status', (kbm, result) => {
    expect(getCircleOffsetByKbm(kbm)).toEqual(result);
  });
});
