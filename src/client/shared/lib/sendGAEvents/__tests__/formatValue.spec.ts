import { formatValue } from 'shared/lib/sendGAEvents/formatValue';

describe('WHEN "formatValue" is called', () => {
  it.each([
    ['', undefined],
    [undefined, undefined],
    [0, undefined],
    ['test', 'test'],
    [['test'], 'test'],
    [['test', 'test1'], 'test|test1'],
  ])('AND value is %p, MUST return %p', (input, output) => {
    expect(formatValue(input)).toEqual(output);
  });
});
