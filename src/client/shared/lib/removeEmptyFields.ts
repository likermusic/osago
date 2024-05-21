import { unsafeCoerce } from './unsafeCoerce';

// TODO: поправить тип оно не совсем Partial<T> https://sravni-corp.atlassian.net/browse/OS-7544 возвращет
// из-за этого выше тоже приходится всем полям Partial ставить а это не оч правильно
export const removeEmptyFields = <T extends Record<string, unknown>>(obj: T): Partial<T> =>
  unsafeCoerce<string[], Array<keyof T>>(Object.keys(obj ?? {})).reduce((result, key) => {
    const value = obj[key];

    if (value === undefined || value === null || Number.isNaN(value)) return result;

    if (Array.isArray(value)) {
      return {
        ...result,
        [key]: (value as Array<Record<string, unknown>>)
          .map((v) => removeEmptyFields(v))
          .filter((o) => Object.keys(o).length > 0),
      };
    }

    if (value instanceof Object) {
      const clearedObject = removeEmptyFields(value as Record<string, unknown>);

      return {
        ...result,
        ...(Object.keys(clearedObject).length === 0 ? {} : { [key]: clearedObject }),
      };
    }

    if (typeof value === 'string' && (value === '' || value === 'Invalid Date')) {
      return result;
    }

    return { ...result, [key]: value };
  }, {});
