import { removeKeyFromObject } from '../removeKeyFromObject';

describe('WHEN "removeKeyFromObject" is called', () => {
  it('MUST remove key', () => {
    const obj = {
      a: '1',
      b: '2',
      c: '3',
    };
    const expected = {
      a: '1',
      c: '3',
    };
    expect(removeKeyFromObject(obj, 'b')).toStrictEqual(expected);
  });

  it('AND key is not in object MUST not remove anything', () => {
    const obj = {
      a: '1',
      b: '2',
      c: '3',
    };
    const expected = {
      a: '1',
      b: '2',
      c: '3',
    };
    expect(removeKeyFromObject(obj, 'd' as keyof typeof obj)).toStrictEqual(expected);
  });
});
