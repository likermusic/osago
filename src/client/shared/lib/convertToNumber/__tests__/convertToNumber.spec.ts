// write test on convertToNumber
import { convertToNumber } from '../convertToNumber';

describe('WHEN "convertToNumber" is Called', () => {
  it.each`
    value        | res
    ${'12'}      | ${12}
    ${12}        | ${12}
    ${'0'}       | ${0}
    ${'1.1'}     | ${1.1}
    ${1.1}       | ${1.1}
    ${null}      | ${0}
    ${undefined} | ${0}
    ${NaN}       | ${0}
    ${[]}        | ${0}
    ${{}}        | ${0}
    ${false}     | ${0}
    ${true}      | ${1}
  `('MUST convert $value into $res', ({ value, res }) => {
    expect(convertToNumber(value)).toEqual(res);
  });
});
