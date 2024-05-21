import { checkAndReturnStringIfObjectHasLabelOrValue } from 'shared/lib/checkAndReturnStringIfObjectHasValue/checkAndReturnStringIfObjectHasLabelOrValue';

describe('WHEN "checkAndReturnStringIfObjectHasValue.spec.ts" is called', () => {
  test.each([{}, [], '', { a: 'b' }])('MUST return value - %p converted to string', (value) => {
    expect(checkAndReturnStringIfObjectHasLabelOrValue(value as unknown as string)).toEqual(String(value));
  });

  test.each([null, undefined])('for %p MUST return original value', (value) => {
    expect(checkAndReturnStringIfObjectHasLabelOrValue(value as unknown as string)).toEqual(value);
  });

  test('MUST return string', () => {
    expect(checkAndReturnStringIfObjectHasLabelOrValue('string')).toEqual('string');
  });

  test('MUST return string from object.value', () => {
    expect(checkAndReturnStringIfObjectHasLabelOrValue({ value: 'string' })).toEqual('string');
  });
});
