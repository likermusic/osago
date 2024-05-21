import type { DriversCommonFields } from 'entities/drivers';

import { generateTitle } from '../generateTitle';

const data = {
  fullName: {
    label: 'иванов иван иванович',
    value: 'иванов иван иванович',
  },
} as DriversCommonFields;

describe('WHEN "generateTitle" is called', () => {
  it('AND isMultidrive MUST return multidrive title', () => {
    const result = generateTitle(true, data);
    expect(result).toEqual('Водители без ограничений');
  });

  it('AND isMultidrive false MUST return formatter fio', () => {
    const result = generateTitle(false, data);
    expect(result).toEqual('Иванов Иван Иванович');
  });
});
