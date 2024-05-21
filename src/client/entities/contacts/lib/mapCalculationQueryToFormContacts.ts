import type { TQuerySupportedForMapping } from 'shared/types/TQuerySupportedForMapping';

import type { ContactsCommonFields } from 'entities/contacts';

export const mapCalculationQueryToFormContacts = (
  query: TQuerySupportedForMapping,
  storeData: { email: string | undefined; mobilePhone: string | undefined },
): ContactsCommonFields => {
  const { insurer } = query || {};

  // если пользователь авторизован и там есть данные, то берем данные оттуда, если не авторизован, то берем из квери
  return {
    email: storeData?.email || insurer?.email || '',
    mobilePhone: storeData?.mobilePhone || insurer?.phone || '',
    smsCode: '',
    userAgreement: false,
  };
};
