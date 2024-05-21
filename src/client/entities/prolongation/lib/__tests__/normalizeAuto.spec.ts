import { normalizeAuto } from '../normalizeAuto';

describe('WHEN "normalizeAuto" is called', () => {
  const brandName = 'Kia';
  const modelName = 'Sportage';
  const year = 2022;

  it('AND "brandName" is not provided, MUST return string without "brandName"', () => {
    expect(normalizeAuto(undefined, modelName, year)).toEqual(`${modelName}, ${year}`);
  });

  it('AND "modelName" is not provided, MUST return string without "modelName"', () => {
    expect(normalizeAuto(brandName, undefined, year)).toEqual(`${brandName}, ${year}`);
  });

  it('AND "year" is not provided, MUST return string without "year"', () => {
    expect(normalizeAuto(brandName, modelName, undefined)).toEqual(`${brandName} ${modelName}`);
  });
});
