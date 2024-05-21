import { isPhoneEqualMaskedPhone } from '../isPhoneEqualMaskedPhone';

describe('WHEN "isPhoneEqualMaskedPhone" is called', () => {
  const userPhone = '+79042111100';
  const maskedPhone = '+7904211****';
  const anotherMaskedPhone = '+7904212****';
  it('AND user phone was not provided, MUST return false', () => {
    expect(isPhoneEqualMaskedPhone(null, maskedPhone)).toBeFalsy();
  });

  it('AND masked phone was not provided, MUST return false', () => {
    expect(isPhoneEqualMaskedPhone(userPhone, null)).toBeFalsy();
  });

  it('AND both phones were not provided, MUST return false', () => {
    expect(isPhoneEqualMaskedPhone(null, null)).toBeFalsy();
  });

  it('AND phones are not equal, MUST return false', () => {
    expect(isPhoneEqualMaskedPhone(userPhone, anotherMaskedPhone)).toBeFalsy();
  });

  it('AND phones are equal, MUST return true', () => {
    expect(isPhoneEqualMaskedPhone(userPhone, maskedPhone)).toBeTruthy();
  });
});
