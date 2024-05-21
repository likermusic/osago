import { unsafeCoerce } from './unsafeCoerce';

describe('utils/unsafeCoerce', () => {
  it('should return the same value', () => {
    const value = 'a';
    const result = unsafeCoerce(value);
    expect(result).toBe(value);
  });
});
