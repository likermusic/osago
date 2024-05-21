import type { OTP } from 'commonTypes/api/OTPData';
import type { Query } from 'commonTypes/api/query';

interface OtpUserData {
  aud: string;
  exp: number;
  iss: string;
  tokenData: OTP.OtpUserData;
}

export const JWE =
  'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.iTrarQojOjseSZYgfPG-ceXEs3PFSRHLUuoks066sxrJV1FxpJjS2Uu9wbsNxG3Ika5LaMrVl1xST-S3rDsjyubqzaZWbsW_omGRrMwT5d1WAK5xa4rMYMwQVZZHvH3PY1UWZ4JgnUac98Yj8ERGZfkdkelqWtHSoDz59mMlpr_4k3KbN4HwxIBhyRrQE5uK9Vl2VtmeaQ_FVbyEoXA1Pp155wujHABcfEBovgWiA6023iZaWYx_OPsCwAhE3XBsSfCawV2dDsj_FXugjCFVbIVPf5QqSx_MPwjvd1nkm4WxvsRXG0JTxwz4RAS0SFqXkLBMWT0_IMuURP-twlFnjA.LWImDFSYA7tzqgx0f2wkYQ.bVmo7QF5IAqBr3ESHssTJMUCsV2sSFO4hqe7XoTGCNXAxcvzSdNPoVBAi-ESdH8ZDQHCYhl18jX2kLRFvnk_VitmUiMAkdNA-qgCHQp9qZaXODSwQKHnGb1USmbwdVl2XUs8DfM4DLR74wgjUN5D4N0vZw1fGxIKf4HhH_UTjo52vu6nE-dlsnOjsKVJYgSBQ9Y-PDYVNYOOzyqLpMftaGsQb9947dQbO9yt5dAWspCfYYtQejAxBnZo6nDw4ypYSbun0MxOpIZt0FwHk274_l5XcA1QS2VjiBet4N2SAHLCNKEcd3n9bFN6LSJ3OR1cjhVEE0p5WRsTVPMGOa9xzC1wAPqoFbJAOJShiBemm617dlqVZsOmDYUUDHMqqJ1q-k0NaCmVD653Tsic2dyOWolg-gakxmBqzdy2DxBKlYvH5Czc2rFQQipE5NhUE-Lx0z8TR5jQi7U_vwey9WEsva5yizPLm4OyedlRo3CHAUHwYBccXgn_XMg9ZyAt5kxCq9Po5tBjBBPMYajzXst9MBaO7FL7MBhE_910cbkg4I4AUgHmmHCEZx-N-5aHcvyVKtaZUkqNyhTWos-G7U4XTybZRFAimTD-gXBe63beL7OAFWip2dFLenoFPe-o4YFaeH4QHJUS_YISfcJvs9m46n_9wVjU_iYhUVNct9GGATkgKCaFwzjHzb6bfAZYeElvMmiAbELKumeQFyYeU1iV3a5V2hxkDOvr_1zZc4NAFevaT8sdjUA1lnEiEL24DpvM4ev5gU4d5yUvo03DpVB2U6BoxhPn5Uj46vDGJnl3IdIFqIW6J6tfVmMthmB-2oyGmceBcAUML0gzOvjGra4AMh62Gja2BQ98vXqOzpJh23MxwLpWVm_fnPm9k_QQ6K0jNVe50rQSk-NTdlFIzueDv_39wAoULCNYYAxMAM5to-T5a_LSZLgrGV84X_g6Ufht9o4IuXwVb_ufO-6rY5zJ3zjbfzZPnR3l-982OhZQ1hRW2H3pb05VipXvXiO1tk_YV6EHJbQsIoY3NLlOqrJJ8RaqSIv5CXf-OdZA0FWy56HtGrz5o3et0G8zmXsv35A5R9u4JHc05pFhONgLh-IVU0UxJ5BipFqxJa4MxnpcAzMm-G44bIrWqtuMJQCVB7aJ4TDiKlwnLhcRt0hjQVY5_8SPxFDEe_UDestuwroa2K9P0Y_MclAFkfejP7WD1f2Jjy0TPu9FwdtS6yRroDJyjmGYXrjzzDQOnlN9kblfsF5wtKzqItj9wp_kY6vKrQ53ndbY6WOF-70MiQqmvpH7rp4BC4-wQ7DMV2pQZj8Q9VlPxfSrm-B3SOlO0HGGNH8uzlvHmo6HX1fNMhwXAPPY5dueYlZ5rxzt_gbrttAwqhZEYZ1u0TjysHIq3muJnE9nYOEfGh01kJ-_M_PKD0cgHWsZBp7qGFNEPZ5Mb2PZvqTUpcTSrIAdGxYVIvj8Ik85UL1WTIFukw8VOtMVXbA3DW21DsduZyIduLdhgbZqFOCqf_OQIESJVeVanwQF31mR2rbv8MrzFCtEuYqyXfrMe7239gC2Yyo_MsVkUAYmviGgR7v1-qOoZVnaHTxYodbvXrZzPR9pTMwZ83zBQokcs_v-EgmYCtJBLgR-_AAROsIAnroqnPYX52FF1i0CdBTEvGc-knJXsmvdUYICQFS0iqElqz6p3a6feYEkoUuNouEOBAvDK7SpiGQvYatrBz-pwwhXDRP6FRxJjF8UQ1B0XyKuLzrLCS7CMjbAkC_-DYn6vDvyCm88iFAeSPobhgdvbsRNOxSJ3M4jnJPlbZ8bm5vXRKclMOcWovSupmj5JJUAEhRhekeW1vFN79y_w9GRwP0mAj7terOV-2BNikyeB2FNZKFtTOf5Gy3Z_mWpSb7YpKiFyVuUijWJvHMMHcJldFZNFw5xyFY1GQ-ZBK7Fo5g6Ry5FiJ0YQVo9h0UrMAGlAxdM3K3kKKMa6o5tYSjv3IwPmwFYD9PQeOrJ8qviyA.3_--_c-h7iKzjMTGUcG-iQ';

export const FULL_OTP_USER_DATA: OtpUserData = {
  aud: 'urn:example:audience',
  exp: 1708444983,
  iss: "'urn:example:issuer",
  tokenData: {
    clientId: '919191',
    personalData: {
      actualAddress: 'г Санкт-Петербург, ул Мира, д 69, кв 1',
      birthDate: '1966-06-13',
      birthPlace: 'гор Ленинград',
      citizenship: '643',
      email: 'perelman@mail.ru',
      firstName: 'Григорий',
      gender: 'm',
      inn: '123456789012',
      lastName: 'Перельман',
      middleName: 'Яковлевич',
      passportIssueDate: '2011-06-21',
      passportIssuer: 'Отделением УФМС России по Санкт-Петербургу в Московском р-не гор. Санкт-Петербурга',
      passportIssuerCode: '780-047',
      passportNumber: '4507123456',
      phone: '79851234567',
      registrationAddress: 'г Санкт-Петербург, ул Мира, д 69, кв 1',
      snils: '123-456-789 00',
    },
  },
};

const FULL_OTP_USER_COMMON_DATA_MAPPED = {
  birthDate: '1966-06-13',
  firstName: 'Григорий',
  fullName: 'Перельман Григорий Яковлевич',
  lastName: 'Перельман',
  middleName: 'Яковлевич',
};

const FULL_OTP_USER_PASSPORT_DATA_MAPPED = {
  ...FULL_OTP_USER_COMMON_DATA_MAPPED,
  address: {
    data: {
      fiasLevel: '8',
      flatNumber: '1',
      normalizedAddress: 'г Санкт-Петербург, ул Мира, д 69',
    },
    formattedAddress: 'г Санкт-Петербург, ул Мира, д 69',
    formattedFiasLevel: '8',
  },
  email: 'perelman@mail.ru',
  gender: 'male',
  passport: {
    issueDate: '2011-06-21',
    number: '123456',
    series: '4507',
  },
  phone: '79851234567',
} as const;

const FULL_OTP_USER_DRIVER_DATA_MAPPED = {
  ...FULL_OTP_USER_COMMON_DATA_MAPPED,
  license: {
    series: '',
    number: '',
    date: '',
  },
};

export const FULL_OTP_QUERY_DATA_MAPPED: Query.TRestoreCalculationQueryResponse = {
  insurer: FULL_OTP_USER_PASSPORT_DATA_MAPPED,
  owner: FULL_OTP_USER_PASSPORT_DATA_MAPPED,
  driversInfo: {
    driverAmount: 'limited',
    drivers: [FULL_OTP_USER_DRIVER_DATA_MAPPED],
  },

  modelId: undefined,
  modification: undefined,
  year: undefined,
  bodyNumber: undefined,
  policyStartDate: undefined,
  enginePower: undefined,
  vehicleCategory: undefined,
  carNumber: undefined,
  chassisNumber: undefined,
  brandId: undefined,
  carDocument: undefined,
  vin: undefined,
};

const NULLABLE_ADDRESS = {
  address: {
    data: {
      fiasLevel: '',
      normalizedAddress: '',
      flatNumber: '',
    },
    formattedAddress: '',
    formattedFiasLevel: '',
  },
};

const NULLABLE_ADDRESS_OTP_USER_PASSPORT_DATA_MAPPED = {
  ...FULL_OTP_USER_PASSPORT_DATA_MAPPED,
  ...NULLABLE_ADDRESS,
};

export const NULLABLE_ADDRESS_OTP_QUERY_DATA_MAPPED: Query.TRestoreCalculationQueryResponse = {
  ...FULL_OTP_QUERY_DATA_MAPPED,
  insurer: NULLABLE_ADDRESS_OTP_USER_PASSPORT_DATA_MAPPED,
  owner: NULLABLE_ADDRESS_OTP_USER_PASSPORT_DATA_MAPPED,
};

const COUNTRY_HOUSE_ADDRESS = {
  address: {
    data: {
      fiasLevel: '75',
      normalizedAddress: 'г Санкт-Петербург, ул Мира, д 69',
      flatNumber: '',
    },
    formattedAddress: 'г Санкт-Петербург, ул Мира, д 69',
    formattedFiasLevel: '75',
  },
};

const COUNTRY_HOUSE_ADDRESS_OTP_USER_PASSPORT_DATA_MAPPED = {
  ...FULL_OTP_USER_PASSPORT_DATA_MAPPED,
  ...COUNTRY_HOUSE_ADDRESS,
};

export const COUNTRY_HOUSE_ADDRESS_OTP_QUERY_DATA_MAPPED: Query.TRestoreCalculationQueryResponse = {
  ...FULL_OTP_QUERY_DATA_MAPPED,
  insurer: COUNTRY_HOUSE_ADDRESS_OTP_USER_PASSPORT_DATA_MAPPED,
  owner: COUNTRY_HOUSE_ADDRESS_OTP_USER_PASSPORT_DATA_MAPPED,
};
