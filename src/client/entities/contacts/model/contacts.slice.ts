import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ContactsCommonFields, ContactsEntityReducer } from '../types';

import { FormFieldsValidationSchemaAuthentication } from './contacts.validationSchema';

const initialState: ContactsEntityReducer = {
  data: null,
  defaults: {
    mobilePhone: '',
    email: '',
    smsCode: '',
    userAgreement: false,
  },
  isFullFilled: false,
  isActive: true,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    resetContacts: (state) => ({ ...initialState, defaults: state.defaults }),
    clearContactsEsiaFlag: (state) => {
      state.isFilledByEsiaStatus = initialState.isFilledByEsiaStatus;
    },
    setContactsData: (
      state,
      {
        payload,
      }: PayloadAction<{
        data: ContactsCommonFields;
        isFullFilled?: boolean;
        isFilledByEsiaStatus?: boolean;
      }>,
    ) => {
      state.isFilledByEsiaStatus = payload.isFilledByEsiaStatus;

      state.data = {
        ...state.data,
        ...payload.data,
      };

      state.isFullFilled =
        payload.isFullFilled !== undefined
          ? payload.isFullFilled
          : FormFieldsValidationSchemaAuthentication.isValidSync(payload.data);
    },
    setContactsDefault: (state, { payload }: PayloadAction<ContactsCommonFields>) => {
      state.defaults = payload;
      state.isFullFilled = state.data ? state.isFullFilled : false;
    },
    updateContactsIfNewValueTruthy: (
      state,
      {
        payload,
      }: PayloadAction<{
        data: Partial<ContactsCommonFields>;
        isFullFilled?: boolean;
      }>,
    ) => {
      const newData = {
        mobilePhone: payload.data.mobilePhone || state.data?.mobilePhone || state.defaults.mobilePhone,
        email: payload.data.email || state.data?.email || state.defaults.email,
        smsCode: payload.data.smsCode || state.data?.smsCode || state.defaults.smsCode,
        userAgreement: payload.data.userAgreement || state.data?.userAgreement || state.defaults.userAgreement,
      };

      state.data = newData;

      state.isFullFilled =
        payload.isFullFilled !== undefined
          ? payload.isFullFilled
          : FormFieldsValidationSchemaAuthentication.isValidSync(newData);
    },
  },
});

export const {
  clearContactsEsiaFlag,
  resetContacts,
  updateContactsIfNewValueTruthy,
  setContactsData,
  setContactsDefault,
} = contactsSlice.actions;
