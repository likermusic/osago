import { capitalizeFirstLetter } from 'shared/lib/formatters';

describe('WHEN capitalizeFirstLetter is called', () => {
  it.each([
    ['', ''],
    ['a', 'A'],
    ['ab', 'Ab'],
    ['AB', 'AB'],
    ['aB', 'AB'],
    ['Abc', 'Abc'],
  ])('AND %p is provided, MUST return %p', (value, expectation) => {
    expect(capitalizeFirstLetter(value)).toEqual(expectation);
  });
});
