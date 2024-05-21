import type { SliceStateFromReducer } from 'shared/types';

import type { contactsSlice } from './contacts.slice';

type TContactsState = SliceStateFromReducer<typeof contactsSlice>;

export const selectContacts = (state: TContactsState) => state.contacts;
export const contactsEmailSelector = (state: TContactsState) => state?.contacts?.data?.email;
export const selectIsContactsFilledByEsia = (state: TContactsState) => state.contacts.isFilledByEsiaStatus;

export const selectContactsData = (state: TContactsState) => {
  if (!state.contacts?.data) {
    return state.contacts?.defaults;
  }

  return state.contacts.data;
};
