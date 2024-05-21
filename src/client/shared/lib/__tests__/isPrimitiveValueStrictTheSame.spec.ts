import { isPrimitiveValuesStrictTheSame } from '../isPrimitiveValuesStrictTheSame';

describe('WHEN "isPrimitiveValuesStrictTheSame" is called', () => {
  it.each`
    value1   | value2
    ${'123'} | ${'123'}
    ${123}   | ${123}
    ${true}  | ${true}
  `('$# AND value1 - $value1 AND value2 - $value2  MUST return true ', ({ value1, value2 }) => {
    expect(isPrimitiveValuesStrictTheSame(value1, value2)).toEqual(true);
  });

  it.each`
    value1       | value2
    ${undefined} | ${undefined}
    ${undefined} | ${null}
    ${false}     | ${false}
    ${0}         | ${0}
    ${null}      | ${null}
    ${null}      | ${'123'}
    ${undefined} | ${'123'}
    ${''}        | ${''}
    ${'123'}     | ${''}
    ${'1'}       | ${'123'}
    ${123}       | ${'123'}
    ${123}       | ${12}
  `('$# AND value1 - $value1 AND value2 - $value2  MUST return false ', ({ value1, value2 }) => {
    expect(isPrimitiveValuesStrictTheSame(value1, value2)).toEqual(false);
  });
});
