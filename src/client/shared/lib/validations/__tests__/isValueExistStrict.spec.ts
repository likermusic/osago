import { mockSendSentryClientError } from 'mocks/helpers/sendSentryClientErrorMock';

import { isValueExistStrict } from '../isValueExistStrict';

const ERROR_TEXT = 'not exist';

describe('WHEN "isValueExistStrict" is called', () => {
  it.each(['str', {}, [], 0, '', [{}], { key: [] }])(
    'AND value was %p(nonnullish), MUST return this value',
    (value) => {
      expect(isValueExistStrict(value, ERROR_TEXT)).toEqual(value);
    },
  );
  it.each([[null], [undefined]])('AND value was %p(nullish), MUST throw error with provided text', (value) => {
    expect(() => isValueExistStrict(value, ERROR_TEXT)).toThrowError(ERROR_TEXT);
  });

  it.each([[null], [undefined]])(
    'AND value was %p(nullish) AND sentryInfo was provided, MUST throw error with provided text AND call sendSentryClient error with place and args',
    (value) => {
      expect(() => isValueExistStrict(value, ERROR_TEXT, { place: 'in test', test: 'additional' })).toThrowError(
        ERROR_TEXT,
      );
      expect(mockSendSentryClientError).toHaveBeenCalledWith(ERROR_TEXT, {
        value,
        place: 'in test',
        test: 'additional',
      });
    },
  );
});
