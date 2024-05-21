import { removePhoneMaskSymbols } from './removePhoneMaskSymbols';

export const isPhoneEqualMaskedPhone = (phoneNumber?: Nullable<string>, maskedPhone?: Nullable<string>) => {
  if (!phoneNumber || !maskedPhone) {
    return false;
  }

  const formattedPhone = `
        ${removePhoneMaskSymbols(phoneNumber).slice(0, -4)}****
      `.trim();

  const formattedMaskedPhone = maskedPhone.replace('+', '');

  return formattedPhone === formattedMaskedPhone;
};
