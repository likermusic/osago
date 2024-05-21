import type { Query } from 'commonTypes/api/query';

import { mapCalculationQueryToFormContacts } from '../mapCalculationQueryToFormContacts';

const EMAIL_QUERY = 'test@yandex.ru';
const PHONE_QUERY = '+79040000000';

const EMAIL_STORE = 'store@mail.ru';
const PHONE_STORE = '+799999999';

const STORE_DATA_EMPTY = {
  email: '',
  mobilePhone: '',
};
const STORE_DATA_EMAIL_EMPTY = {
  email: '',
  mobilePhone: PHONE_STORE,
};
const STORE_DATA = {
  email: EMAIL_STORE,
  mobilePhone: PHONE_STORE,
};

const QUERY_DATA_EMPTY = {
  email: '',
  phone: '',
};

const QUERY_DATA_EMAIL_EMPTY = {
  email: '',
  phone: PHONE_QUERY,
};

const QUERY_DATA = {
  email: EMAIL_QUERY,
  phone: PHONE_QUERY,
};

const EMPTY_RESULT = {
  email: '',
  mobilePhone: '',
  smsCode: '',
  userAgreement: false,
};

const RESULT_BASED_ON_QUERY = {
  email: EMAIL_QUERY,
  mobilePhone: PHONE_QUERY,
  smsCode: '',
};

const RESULT_BASED_ON_STORE = {
  email: EMAIL_STORE,
  mobilePhone: PHONE_STORE,
  smsCode: '',
};

describe('WHEN "mapCalculationQueryToFormContacts" is called', () => {
  it.each`
    queryData                 | storeData                 | result
    ${QUERY_DATA_EMPTY}       | ${STORE_DATA_EMPTY}       | ${EMPTY_RESULT}
    ${QUERY_DATA}             | ${STORE_DATA}             | ${RESULT_BASED_ON_STORE}
    ${QUERY_DATA}             | ${STORE_DATA_EMPTY}       | ${RESULT_BASED_ON_QUERY}
    ${QUERY_DATA_EMPTY}       | ${STORE_DATA}             | ${RESULT_BASED_ON_STORE}
    ${QUERY_DATA_EMAIL_EMPTY} | ${STORE_DATA_EMPTY}       | ${{ email: '', mobilePhone: PHONE_QUERY, smsCode: '' }}
    ${QUERY_DATA_EMAIL_EMPTY} | ${STORE_DATA}             | ${{ email: EMAIL_STORE, mobilePhone: PHONE_STORE, smsCode: '' }}
    ${QUERY_DATA}             | ${STORE_DATA_EMAIL_EMPTY} | ${{ email: EMAIL_QUERY, mobilePhone: PHONE_STORE, smsCode: '' }}
    ${QUERY_DATA_EMPTY}       | ${STORE_DATA_EMAIL_EMPTY} | ${{ email: '', mobilePhone: PHONE_STORE, smsCode: '' }}
  `('AND queryData - $queryData storeData - $storeData MUST return $result', ({ queryData, storeData, result }) => {
    const queryDataWithInsurer = {
      insurer: {
        ...queryData,
      },
    };
    expect(
      mapCalculationQueryToFormContacts(queryDataWithInsurer as Query.TRestoreCalculationQueryResponse, storeData),
    ).toEqual({ ...result, userAgreement: false });
  });

  it.each([[null], [undefined], [{}]])(
    'AND query and store data was not provided, MUST return default state',
    (input) => {
      // @ts-ignore
      expect(mapCalculationQueryToFormContacts(input as Query.TRestoreCalculationQueryResponse, input)).toEqual(
        EMPTY_RESULT,
      );
    },
  );
});
