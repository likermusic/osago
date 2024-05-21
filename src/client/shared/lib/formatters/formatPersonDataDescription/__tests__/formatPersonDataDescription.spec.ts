import { TEXT_DOT_SEPARATOR } from 'shared/config/contacts';
import { formatPersonDataDescription } from 'shared/lib/formatters';

describe('WHEN "formatPersonDataDescription" is called', () => {
  it.each([
    [undefined, undefined, ''],
    ['31.12.2000', undefined, `31.12.2000`],
    ['31.12.2000', '12121212', `31.12.2000${TEXT_DOT_SEPARATOR}Паспорт 12\u00A012\u00A01212`],
  ])('AND "birthday is %p AND passport is %p, MUST return %p', (birthday, passport, result) => {
    expect(formatPersonDataDescription('', birthday, passport)).toEqual(result);
  });
});
