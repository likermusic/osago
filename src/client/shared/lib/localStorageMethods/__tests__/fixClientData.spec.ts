import { MAPPED_CLIENT_DATA, CLIENT_DATA, EMPTY_CLIENT_DATA } from 'mocks/mappingOldClientData';

import { mapOldLocalStorageToQuery } from '../mapOldLocalStorageToQuery';

describe('WHEN mapOldLocalStorageToQuery is called', () => {
  it('AND data fully provided MUST map correctly', () => {
    expect(mapOldLocalStorageToQuery(CLIENT_DATA.А197МВ197)).toStrictEqual(MAPPED_CLIENT_DATA.А197МВ197);
  });

  it.each([null, undefined, {}])('AND data was not provided as $p MUST return empty query', (value) => {
    // @ts-ignore
    expect(mapOldLocalStorageToQuery(value)).toEqual(EMPTY_CLIENT_DATA);
  });
});
