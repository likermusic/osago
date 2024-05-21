import { isCalculationHashValid } from '../isCalculationHashValid';

describe('WHEN "isCalculationHashValid" is called', () => {
  it('AND hash was not provided, MUST return false', () => {
    expect(isCalculationHashValid()).toEqual(false);
  });

  describe('AND hash was provided', () => {
    const invalidHashWith21char = 'pjf_OJDPygMSTlzIJIXth';
    const validHash = `${invalidHashWith21char}h`;
    it('AND it is not valid, MUST return false', () => {
      expect(isCalculationHashValid('pjf_OJDPygMSTlzIJIXth')).toEqual(false);
    });

    it('AND it is valid, MUST return true', () => {
      expect(isCalculationHashValid(validHash)).toEqual(true);
    });
  });
});
