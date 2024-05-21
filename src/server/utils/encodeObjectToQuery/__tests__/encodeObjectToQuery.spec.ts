import { encodeObjectToQuery, flatObject } from '../encodeObjectToQuery';

describe('WHEN "encodeObjectToQuery" is called', () => {
  describe('AND nested object is provided', () => {
    it('MUST flat simple object', () => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      expect(flatObject({ a: { b: '1' } })).toEqual({ 'a.b': '1' });
    });

    it('MUST flat nested object', () => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      expect(flatObject({ a: { b: { c: '1' } } })).toEqual({ 'a.b.c': '1' });
    });
  });

  describe('AND object is provided', () => {
    it('MUST convert an object to a query string', () => {
      expect(encodeObjectToQuery({ a: '1', b: '2' })).toBe('a=1&b=2');
    });

    it('MUST encode values', () => {
      expect(encodeObjectToQuery({ a: 'a&b', b: 'a b' })).toBe('a=a%26b&b=a%20b');
    });

    it('MUST convert an nested object to a query string', () => {
      expect(encodeObjectToQuery({ a: { b: '1' }, c: { b: '2' } })).toBe('a.b=1&c.b=2');
    });
  });
});
