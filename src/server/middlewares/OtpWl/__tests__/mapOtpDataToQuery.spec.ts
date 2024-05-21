import {
  FULL_OTP_USER_DATA,
  FULL_OTP_QUERY_DATA_MAPPED,
  NULLABLE_ADDRESS_OTP_QUERY_DATA_MAPPED,
  COUNTRY_HOUSE_ADDRESS_OTP_QUERY_DATA_MAPPED,
} from 'mocks/OtpUserData';

import { mapOtpDataToQuery } from '../mapOtpDataToQuery';

describe('WHEN "mapOtpDataToQuery" is called', () => {
  it('AND data fully provided MUST map correctly', () => {
    expect(mapOtpDataToQuery(FULL_OTP_USER_DATA.tokenData)).toEqual(FULL_OTP_QUERY_DATA_MAPPED);
  });

  it('AND data fully provided AND address is country house MUST map correctly', () => {
    expect(
      mapOtpDataToQuery({
        ...FULL_OTP_USER_DATA.tokenData,

        personalData: {
          ...FULL_OTP_USER_DATA.tokenData.personalData,
          registrationAddress: 'г Санкт-Петербург, ул Мира, д 69',
        },
      }),
    ).toEqual(COUNTRY_HOUSE_ADDRESS_OTP_QUERY_DATA_MAPPED);
  });

  it('AND data provided without address MUST map correctly', () => {
    expect(
      mapOtpDataToQuery({
        ...FULL_OTP_USER_DATA.tokenData,

        personalData: {
          ...FULL_OTP_USER_DATA.tokenData.personalData,
          registrationAddress: '',
        },
      }),
    ).toEqual(NULLABLE_ADDRESS_OTP_QUERY_DATA_MAPPED);
  });

  test.each([undefined, '', null, {}])('AND data provided nullable value - %p MUST map correctly', (data) => {
    // @ts-ignore
    expect(mapOtpDataToQuery(data)).toEqual(null);
  });
});
