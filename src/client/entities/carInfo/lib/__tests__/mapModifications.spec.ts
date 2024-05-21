import type { Auto } from 'commonTypes/api/auto';

import { mapModifications } from '../mapModifications';

describe('WHEN "mapModifications" is called', () => {
  const modification: Auto.GetModification[0] = {
    id: 123,
    name: 'brand',
    shortName: 'xDrive',
  };
  const brandId = 64;

  it('MUST convert modifications list from server to ui options', () => {
    expect(mapModifications({ brandId, modelId: 2, year: 3, power: 4 }, [modification])).toEqual({
      [`${brandId}:2:3:4`]: [
        {
          label: modification.name,
          value: modification.shortName,
        },
      ],
    });
  });

  it.each([[null], [undefined]])(
    'AND provided list from server has incorrect value like %p, MUST return empty list',
    (input) => {
      expect(mapModifications({ brandId: 64 }, input as unknown as Auto.GetModels)).toEqual({ 64: [] });
    },
  );
});
