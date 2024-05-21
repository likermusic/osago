import { FLAT_PREFIX_IN_FULL_ADDRESS, FLAT_PREFIX_IN_FULL_ADDRESS_WITH_DOT } from 'constants/flatPrefix';

import { getFlatAndAddressFromFullAddress } from '../getFlatAndAddressFromFullAddress';

describe('WHEN "getFlatAndAddressFromFullAddress" is called', () => {
  test.each`
    fullAddress                                                                       | address                                        | flat
    ${`г Калининград, ул Стекольная, д 45, ${FLAT_PREFIX_IN_FULL_ADDRESS_WITH_DOT}7`} | ${'г Калининград, ул Стекольная, д 45'}        | ${'7'}
    ${`г Калининград, ул Стекольная, д 45, ${FLAT_PREFIX_IN_FULL_ADDRESS}7`}          | ${'г Калининград, ул Стекольная, д 45'}        | ${'7'}
    ${'г Калининград, ул Стекольная, д 45, к7'}                                       | ${'г Калининград, ул Стекольная, д 45, к7'}    | ${''}
    ${'г Калининград, ул Стекольная, д 45к2, кв7'}                                    | ${'г Калининград, ул Стекольная, д 45к2, кв7'} | ${''}
    ${'г Калининград, ул Стекольная, д 45'}                                           | ${'г Калининград, ул Стекольная, д 45'}        | ${''}
    ${'г Калининград, квартирная'}                                                    | ${'г Калининград, квартирная'}                 | ${''}
  `('MUST map $fullAddress to $address - $address and flat - $flat', ({ fullAddress, address, flat }) => {
    expect(getFlatAndAddressFromFullAddress(fullAddress)).toEqual({ address, flat });
  });

  test.each([undefined, '', null])('MUST map falsy value - %p correctly', (fullAddress) => {
    expect(getFlatAndAddressFromFullAddress(fullAddress as string)).toEqual({ address: '', flat: '' });
  });
});
