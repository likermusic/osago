import type { Auto } from 'commonTypes/api/auto';

import type { CarInfoIncomingDictionaries } from '../../types';
import { mapDictionary } from '../mapDictionary';

describe('WHEN "mapDictionary" is called', () => {
  const model: Auto.GetModels[0] = {
    alias: 'model',
    id: 456,
    name: 'model',
    categories: ['b'],
  };

  const brand: Auto.GetBrands[0] = {
    alias: 'brand',
    firstLetter: 'a',
    id: 123,
    isImported: false,
    isPopular: false,
    name: 'brand',
    popularity: 0,
  };

  it('MUST convert dictionaries lists from server to ui dictionaries', () => {
    expect(
      mapDictionary({
        brand,
        brands: [brand],
        model,
        models: [model],
        modifications: [],
        power: 123,
        powers: [123],
        year: 2022,
        years: [2022],
      }),
    ).toEqual({
      brands: [
        {
          data: {
            alias: brand.alias,
          },
          label: brand.name,
          value: brand.id,
        },
      ],
      models: {
        123: [
          {
            label: model.name,
            value: model.id,
            categories: ['B'],
          },
        ],
      },
      modification: { '123:456:2022:123': [] },
      powers: {
        '123:456:2022': [
          {
            label: '123 л.с. / 90,47 кВт',
            value: 123,
          },
        ],
      },
      years: {
        '456': [
          {
            label: '2022',
            value: 2022,
          },
        ],
      },
    });
  });

  it.each([[null], [undefined]])(
    'AND provided lists from server has incorrect value like %p, MUST return set of dictionaries with empty lists',
    (input) => {
      expect(mapDictionary(input as unknown as Partial<CarInfoIncomingDictionaries>)).toEqual({
        brands: [],
        models: { '': [] },
        modification: { '': [] },
        powers: { '': [] },
        years: { '': [] },
      });
    },
  );
});
