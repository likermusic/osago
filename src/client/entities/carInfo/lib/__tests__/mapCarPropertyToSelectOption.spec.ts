import type { Auto } from 'commonTypes/api/auto';

import { mapCarPropertyToSelectOption } from '../mapCarPropertyToSelectOption';

describe('WHEN "mapCarPropertyToSelectOption" is called', () => {
  const model: Auto.GetModels[0] = {
    alias: 'brand',
    id: 123,
    name: 'brand',
    categories: ['b'],
  };
  const brandId = 64;

  it('MUST convert models list from server to ui options', () => {
    expect(mapCarPropertyToSelectOption({ brandId }, [model])).toEqual({
      [brandId]: [
        {
          label: model.name,
          value: model.id,
          categories: ['B'],
        },
      ],
    });
  });

  it.each([[null], [undefined]])(
    'AND provided list from server has incorrect value like %p, MUST return empty list',
    (input) => {
      expect(mapCarPropertyToSelectOption({ brandId: 64 }, input as unknown as Auto.GetModels)).toEqual({ 64: [] });
    },
  );
});
