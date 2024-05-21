import { getLicenseFromSeriesAndNumber } from '../getLicenseFromSeriesAndNumber';

describe('WHEN "getLicenseFromSeriesAndNumber" is called', () => {
  it.each`
    series              | number      | result
    ${''}               | ${''}       | ${''}
    ${'1'}              | ${'2'}      | ${'12'}
    ${'01234567891011'} | ${'2222'}   | ${'0123456789'}
    ${'0123456789'}     | ${''}       | ${'0123456789'}
    ${'012345'}         | ${'6789'}   | ${'0123456789'}
    ${'01 234 5'}       | ${' 67 89'} | ${'0123456789'}
    ${'abcd'}           | ${'1234'}   | ${'abcd1234'}
  `('MUST return $result for series - $series number - $number', ({ series, number, result }) => {
    expect(getLicenseFromSeriesAndNumber(series, number)).toEqual(result);
  });
});
