import type { Auto } from 'commonTypes/api/auto';

import { mapBrands } from '../mapBrands';

describe('WHEN "mapBrands" is called', () => {
  const brand: Auto.GetBrands[0] = {
    alias: 'brand',
    firstLetter: 'a',
    id: 123,
    isImported: false,
    isPopular: false,
    name: 'brand',
    popularity: 0,
  };

  it('MUST convert brands list from server to ui options', () => {
    expect(mapBrands([brand])).toEqual([
      {
        data: {
          alias: brand.alias,
        },
        label: brand.name,
        value: brand.id,
      },
    ]);
  });

  it.each([[null], [undefined]])(
    'AND provided list from server has incorrect value like %p, MUST return empty list',
    (input) => {
      expect(mapBrands(input as unknown as Auto.GetBrands)).toEqual([]);
    },
  );
});
