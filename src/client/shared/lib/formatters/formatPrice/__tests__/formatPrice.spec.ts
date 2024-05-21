import { formatPrice } from '../formatPrice';

describe('modules/formatters/formatPrice', () => {
  it('AND provided price truthy MUST return formatted price', () => {
    expect(formatPrice(12345)).toBe('12\xa0345\xa0₽');
  });

  it('AND provided price is 0 MUST return empty string', () => {
    expect(formatPrice(0)).toBe('');
  });

  it.each([undefined, null])('AND provided price is falsy value MUST return empty string', (price) => {
    expect(formatPrice(price)).toBe('');
  });
});
