import { getIsNeededABVariant } from '../getIsNeededABVariant';

const EXPERIMENTS_MOCK = '123.1|1234.2';

describe('WHEN "getIsNeededABVariant" is called', () => {
  it('AND all args were not provided, MUST return false', () => {
    expect(getIsNeededABVariant('', '', undefined)).toEqual(false);
    expect(getIsNeededABVariant('', '', null)).toEqual(false);
    expect(getIsNeededABVariant('', '', '')).toEqual(false);
  });

  it('AND experiments is not valid, MUST return false', () => {
    expect(getIsNeededABVariant('123', '1', 'not valid')).toEqual(false);
  });

  it('AND experimentName AND variant does not exist in experiment, MUST return false', () => {
    expect(getIsNeededABVariant('000', '1', EXPERIMENTS_MOCK)).toEqual(false);
  });

  it('AND experimentName AND variant exist in experiment, MUST return true', () => {
    expect(getIsNeededABVariant('123', '1', EXPERIMENTS_MOCK)).toEqual(true);
  });
});
