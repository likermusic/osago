// eslint-disable-next-line boundaries/element-types
import type { GlobalState } from 'app/MyApp';

import { shouldUseMaskedCarInfoValue } from '../CarInfo.selectors';

describe('WHEN "shouldUseMaskedCarInfoValue" is called', () => {
  const maskedVin = 'KM5**124234523452';
  const maskedPartialVin = 'KM5';
  const unmaskedVin = 'KM337124234523452';

  const generateState = (isMasked: boolean, isLoggedIn: boolean) =>
    ({
      carInfo: {
        lastPrefilledValues: {
          carVinNumber: isMasked ? maskedVin : '',
        },
      },
      user: {
        isLoggedIn,
      },
    } as unknown as GlobalState);

  describe('AND user is not logged', () => {
    it('AND field is masked, MUST continue mask fields', () => {
      const testedState = generateState(true, false);

      expect(shouldUseMaskedCarInfoValue('carVinNumber', maskedVin)(testedState)).toBeTruthy();
    });

    it('AND user clear field for type new value partially, MUST continue masking', () => {
      const testedState = generateState(true, false);

      expect(shouldUseMaskedCarInfoValue('carVinNumber', maskedPartialVin)(testedState)).toBeTruthy();
    });

    it('AND user clear field for type new value, MUST stop masking', () => {
      const testedState = generateState(true, false);

      expect(shouldUseMaskedCarInfoValue('carVinNumber', '12')(testedState)).toBeFalsy();
    });
  });

  it('AND user is authorized, MUST stop masking fields', () => {
    const testedState = generateState(true, true);

    expect(shouldUseMaskedCarInfoValue('carVinNumber', maskedVin)(testedState)).toBeFalsy();
  });

  it('AND user is authorized, MUST continue masking fields', () => {
    const testedState = generateState(false, true);

    expect(shouldUseMaskedCarInfoValue('carVinNumber', unmaskedVin)(testedState)).toBeFalsy();
  });
});
