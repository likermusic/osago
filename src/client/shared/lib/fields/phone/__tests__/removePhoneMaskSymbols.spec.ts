import { removePhoneMaskSymbols } from '../removePhoneMaskSymbols';

describe('WHEN "removePhoneMaskSymbols" is called', () => {
  it('AND clean phone correctly, MUST return phone only number', () => {
    expect(removePhoneMaskSymbols('+7 (900) 000-00-00')).toBe('79000000000');
    expect(removePhoneMaskSymbols('+7 (900) 000-__-__')).toBe('7900000');
  });
});
