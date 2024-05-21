import { compose, mapKeys, mapValues } from 'lodash/fp';

import { objectToQuery } from '../../../commonUtils/objectToQuery';

// eslint-disable-next-line @typescript-eslint/ban-types
const isObject = (value: string | boolean | object): value is Record<string, string | boolean | object> =>
  typeof value === 'object';

const toString = <T>(value: T) => `${value}`;

const stackNestedKeys = (key: string) => (nestedKey: string) => `${key}.${nestedKey}`;

/**
 * { a: { b: 'str' } } => { a.b: 'str' }
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const flatObject = (obj: Record<string, string | boolean | object>): Record<string, string> =>
  Object.entries(obj).reduce<Record<string, string>>(
    (acc, [key, value]) =>
      isObject(value)
        ? {
            ...acc,
            ...mapKeys(stackNestedKeys(key))(flatObject(value)),
          }
        : {
            ...acc,
            [key]: toString(value),
          },
    {},
  );

const encodeObjectKeys = mapValues(encodeURIComponent);
/**
 * { a: { b: 'str str', c: 'str2&str2' } } => "a.b=str%202str&a.c=str2%26str2"
 */
export const encodeObjectToQuery = compose(objectToQuery, encodeObjectKeys, flatObject);
