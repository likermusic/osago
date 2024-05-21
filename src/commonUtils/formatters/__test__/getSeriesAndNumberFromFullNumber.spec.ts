import { getSeriesAndNumberFromFullNumber } from '../getSeriesAndNumberFromFullNumber';

describe('WHEN getSeriesAndNumberFromFullNumber is called', () => {
  it.each`
    documentNumber      | seriesLength | numberLength | series       | number
    ${undefined}        | ${undefined} | ${undefined} | ${undefined} | ${undefined}
    ${null}             | ${undefined} | ${undefined} | ${undefined} | ${undefined}
    ${''}               | ${undefined} | ${undefined} | ${''}        | ${''}
    ${'12345678901234'} | ${undefined} | ${undefined} | ${'1234'}    | ${'5678901234'}
    ${'12345678901234'} | ${5}         | ${undefined} | ${'12345'}   | ${'678901234'}
    ${'1234567890'}     | ${5}         | ${5}         | ${'12345'}   | ${'67890'}
    ${' 12345 678901 '} | ${5}         | ${5}         | ${'12345'}   | ${'67890'}
    ${'1234567890'}     | ${5}         | ${6}         | ${'12345'}   | ${'67890'}
    ${'1234567890'}     | ${5}         | ${4}         | ${'12345'}   | ${'6789'}
    ${'1234567890'}     | ${1}         | ${1}         | ${'1'}       | ${'2'}
    ${'12'}             | ${5}         | ${undefined} | ${'12'}      | ${''}
    ${'1234'}           | ${4}         | ${undefined} | ${'1234'}    | ${''}
    ${'1234'}           | ${4}         | ${4}         | ${'1234'}    | ${''}
  `(
    `AND documentNumber - $documentNumber,seriesLength - seriesLength,numberLength - numberLength, MUST return series - $series and number - $number`,
    ({ documentNumber, seriesLength, numberLength, series, number }) => {
      expect(getSeriesAndNumberFromFullNumber(documentNumber, seriesLength, numberLength)).toEqual({ series, number });
    },
  );
});
