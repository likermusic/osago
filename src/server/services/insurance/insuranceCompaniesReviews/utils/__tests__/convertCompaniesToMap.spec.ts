import { convertCompaniesToMap } from '../convertCompaniesToMap';

describe('WHEN "convertCompaniesToMap" is called', () => {
  const company = {
    alias: 'alias',
    name: 'name',
    id: 3,
  };

  it('AND companies list is empty, MUST return empty object', () => {
    expect(convertCompaniesToMap([])).toEqual({});
  });

  it('AND companies list is not empty, MUST return object with company id as a key', () => {
    expect(convertCompaniesToMap([company])).toEqual({
      [company.id]: company,
    });
  });
});
