import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { UserCommonFields, SliceStateFromReducer } from 'shared/types';

import type { InsurerEntityReducer } from '../types';

import { FormFieldsValidationSchemaInsurer } from './insurer.validationSchema';

const initialState: InsurerEntityReducer = {
  data: null,
  defaults: {
    fullName: null,
    birthday: '',
    passportNumber: '',
    passportIssueDate: '',
    registrationAddress: null,
    registrationAddressFlat: '',
  },
  isFullFilled: false,
  isActive: true,
};

export const insurerSlice = createSlice({
  name: 'insurer',
  initialState,
  reducers: {
    clearInsurerEsiaFlag: (state) => {
      state.isFilledByEsiaStatus = initialState.isFilledByEsiaStatus;
    },
    setInsurerData: (
      state,
      {
        payload,
      }: PayloadAction<{
        isActive: boolean;
        values?: UserCommonFields;
        isFullFilled?: boolean;
        isFilledByEsiaStatus?: boolean;
      }>,
    ) => {
      state.isActive = payload.isActive;
      state.isFilledByEsiaStatus = payload.isFilledByEsiaStatus;

      if (payload.values) {
        state.data = {
          ...state.data,
          ...payload.values,
        };
      }

      state.isFullFilled =
        payload.isFullFilled !== undefined
          ? payload.isFullFilled
          : FormFieldsValidationSchemaInsurer.isValidSync(payload.values);
    },
    mapInsurerData: (state, { payload }: PayloadAction<Partial<UserCommonFields>>) => {
      state.data = {
        ...state.defaults,
        ...payload,
      };

      state.isActive = true;

      // проверяем данные и если они полные, то не открываем пользователю шаг страхователя
      state.isFullFilled = FormFieldsValidationSchemaInsurer.isValidSync(payload);
    },
    setInsurerDefault: (state, { payload }: PayloadAction<UserCommonFields>) => {
      state.defaults = payload;
      state.isActive = true;
      state.isFullFilled = false;
    },
    resetInsurer: () => initialState,
  },
});

export type TInsurerState = SliceStateFromReducer<typeof insurerSlice>;

export const { clearInsurerEsiaFlag, setInsurerData, mapInsurerData, setInsurerDefault, resetInsurer } =
  insurerSlice.actions;
