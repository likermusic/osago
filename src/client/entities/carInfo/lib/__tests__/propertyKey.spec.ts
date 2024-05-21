import { formatKey } from '../propertyKey';

describe('WHEN "formatKey" is called', () => {
  it('MUST convert modelId to key', () => {
    const stringKey = {
      brandId: 64,
    };
    const expected = '64';
    expect(formatKey(stringKey)).toEqual(expected);
  });

  it('MUST convert modelId, brandId, year, power to key', () => {
    const stringKey = {
      brandId: 64,
      modelId: 1,
      year: 2,
      power: 3,
    };
    const expected = '64:1:2:3';
    expect(formatKey(stringKey)).toEqual(expected);
  });
});
