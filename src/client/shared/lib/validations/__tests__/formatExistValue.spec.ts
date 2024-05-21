import { formatExistValue } from '../formatExistValue';

const RETURN_VALUE = 'return value';
const NOT_EXIST_VALUE = 'not exist';

const formatter = jest.fn().mockReturnValue(RETURN_VALUE);

describe('WHEN "formatExistValue" is called', () => {
  it.each(['str', {}, [], 0, '', [{}], { key: [] }])(
    'AND value was %p(nonnullish) AND formatter was provided, MUST provide value to formatter and return result of formatter',
    (value) => {
      expect(formatExistValue(value, formatter, NOT_EXIST_VALUE)).toEqual(RETURN_VALUE);
      expect(formatter).toHaveBeenCalledWith(value);
    },
  );

  it.each([[null], [undefined]])(
    'AND value was %p(nullish) AND formatter was provided, MUST return undefined value and does not call formatter',
    (value) => {
      expect(formatExistValue(value, formatter, NOT_EXIST_VALUE)).toEqual(NOT_EXIST_VALUE);
      expect(formatter).toHaveBeenCalledTimes(0);
    },
  );
});
