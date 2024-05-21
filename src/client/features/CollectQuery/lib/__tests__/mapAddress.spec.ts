import { FLAT_PREFIX_IN_FULL_ADDRESS_WITH_DOT } from 'constants/flatPrefix';

import { mapAddress } from '../mapAddress';

describe('WHEN "mapAddress" is called', () => {
  it('AND flat is provided MUST map address with flat', () => {
    expect(mapAddress('г Москва, ш Богородское, д 18 стр 11', '1')).toEqual(
      `г Москва, ш Богородское, д 18 стр 11, ${FLAT_PREFIX_IN_FULL_ADDRESS_WITH_DOT}1`,
    );
  });

  it('AND flat is not provided MUST map address without flat', () => {
    expect(mapAddress('г Москва, ш Богородское, д 18 стр 11')).toEqual('г Москва, ш Богородское, д 18 стр 11');
  });
});
