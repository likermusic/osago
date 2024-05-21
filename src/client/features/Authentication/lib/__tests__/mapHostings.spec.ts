import type { DaData } from 'commonTypes/dadata';

import { mapHostings } from '../mapHostings';

describe('WHEN "mapHostings" is called', () => {
  it.each([undefined, null, {}, ''])('AND data was not correct as %p, MUST return empty array', (order) => {
    expect(mapHostings(order as unknown as DaData.HostingsSuggestions)).toEqual([]);
  });
  it('AND data was correct, MUST return objects array', () => {
    expect(mapHostings(['1', '2'])).toEqual([
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ]);
  });
});
