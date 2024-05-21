import type { Auto } from 'commonTypes/api/auto';

import { mapManufactureYears } from '../mapManufactureYears';

describe('WHEN "mapManufactureYears" is called', () => {
  const year: Auto.GetManufactureYears[0] = 2022;
  const modelId = 64;

  it('MUST convert brands list from server to ui options', () => {
    expect(mapManufactureYears({ modelId }, [year])).toEqual({
      [modelId]: [
        {
          label: year.toString(),
          value: year,
        },
      ],
    });
  });

  it.each([[null], [undefined]])(
    'AND provided list from server has incorrect value like %p, MUST return empty list',
    (input) => {
      expect(mapManufactureYears({ modelId: 64 }, input as unknown as number[])).toEqual({ 64: [] });
    },
  );
});
