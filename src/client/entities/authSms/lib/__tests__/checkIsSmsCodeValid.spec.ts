import { checkIsSmsCodeValid } from 'entities/authSms/lib';

describe('WHEN "checkIsSmsCodeValid" is called', () => {
  it.each([[null], [undefined], [''], [0], [1], [12], [123], ['123'], ['12334']])(
    'AND code is %p, MUST return false',
    (value) => {
      expect(checkIsSmsCodeValid(value as string)).toBeFalsy();
    },
  );

  it.each([[1234], ['1234']])('AND code is %p, MUST return true', (value) => {
    expect(checkIsSmsCodeValid(value as string)).toBeTruthy();
  });
});
