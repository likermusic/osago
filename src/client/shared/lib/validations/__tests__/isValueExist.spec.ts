import { isValueExist } from '../isValueExist';

const NOT_EXIST_VALUE = 'not exist';

describe('WHEN "isValueExist" is called', () => {
  it.each(['str', {}, [], 0, '', [{}], { key: [] }])(
    'AND value was %p(nonnullish), MUST return this value',
    (value) => {
      expect(isValueExist(value, '')).toEqual(value);
    },
  );

  it.each([[null], [undefined]])('AND value was %p(nullish), MUST return undefined value', (value) => {
    expect(isValueExist(value, NOT_EXIST_VALUE)).toEqual(NOT_EXIST_VALUE);
  });
});
