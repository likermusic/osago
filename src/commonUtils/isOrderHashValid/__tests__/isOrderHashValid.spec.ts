import { isOrderHashValid } from '../isOrderHashValid';

describe('WHEN "isCalculationHashValid" is called', () => {
  it('AND hash was not provided, MUST return false', () => {
    expect(isOrderHashValid()).toEqual(false);
  });

  describe('AND hash was provided', () => {
    const invalidHashWith21char = 'pjf_OJDPygMSTlzIJIXthpjf_OJDPygMSTlzIJIXthpjf_OJDPygMSTlzIJIXt3';
    const validHash = `${invalidHashWith21char}h`;

    it('AND it is valid, MUST return true', () => {
      expect(isOrderHashValid(validHash)).toEqual(true);
    });
  });
});
