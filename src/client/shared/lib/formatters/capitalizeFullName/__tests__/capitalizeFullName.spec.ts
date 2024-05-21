import { capitalizeFullName } from 'shared/lib/formatters';

describe('WHEN "capitalizeFullName" is called', () => {
  it.each([
    ['', ''],
    [undefined, ''],
    ['иванов иван иванович', 'Иванов Иван Иванович'],
    ['Иванов иван иванович', 'Иванов Иван Иванович'],
    ['Иванов Иван Иванович', 'Иванов Иван Иванович'],
    ['ИВАНОВ ИВАН ИВАНОВИЧ', 'Иванов Иван Иванович'],
  ])('AND incoming name is %p, MUST return  formatted name as %p', (input, output) => {
    expect(capitalizeFullName(input)).toEqual(output);
  });
});
