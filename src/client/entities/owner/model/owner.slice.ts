import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Documents } from '@sravni/cosago-react-library/lib/constants';

import { PolicyHolderType } from '../policyHolderConfig';
import type { OwnerCommonFields, OwnerEntityReducer, TPolicyHolder } from '../types';

import { FormFieldsValidationSchemaCarOwner } from './owner.validationSchema';

const initialState: OwnerEntityReducer = {
  data: null,
  defaults: {
    policyHolder: PolicyHolderType.Default,
    fullName: null,
    birthday: '',
    passportNumber: '',
    passportIssueDate: '',
    registrationAddress: null,
    registrationAddressFlat: '',
  },
  prevPolicyHolder: PolicyHolderType.Default,
  isFullFilled: false,
  isActive: true,
};

export const ownerSlice = createSlice({
  name: 'owner',
  initialState,
  reducers: {
    clearOwnerEsiaFlag: (state) => {
      state.isFilledByEsiaStatus = initialState.isFilledByEsiaStatus;
    },
    setOwnerData: (
      state,
      {
        payload,
      }: PayloadAction<{
        data: OwnerCommonFields;
        isFullFilled?: boolean;
        isFilledByEsiaStatus?: boolean;
        carDocumentIssueDate?: string;
        carDocumentType?: Documents.ECarDocumentType;
      }>,
    ) => {
      state.prevPolicyHolder = state.data?.policyHolder || state.defaults.policyHolder;
      state.isFilledByEsiaStatus = payload.isFilledByEsiaStatus;

      state.data = {
        ...state.data,
        ...payload.data,
      };

      state.isFullFilled =
        payload.isFullFilled !== undefined
          ? payload.isFullFilled
          : FormFieldsValidationSchemaCarOwner({
              carDocumentType: payload.carDocumentType,
              carDocumentIssueDate: payload.carDocumentIssueDate,
            }).isValidSync(payload.data);
    },
    setOwnerDefault: (state, { payload }: PayloadAction<OwnerCommonFields>) => {
      state.defaults = payload;
      state.isFullFilled = false;
    },
    resetOwner: () => initialState,
    updatePolicyHolder: (state, { payload }: PayloadAction<TPolicyHolder>) => {
      if (state.data) {
        state.prevPolicyHolder = state.data.policyHolder;
        state.data.policyHolder = payload;
      } else {
        state.prevPolicyHolder = state.defaults.policyHolder;
        state.defaults.policyHolder = payload;
      }
    },
  },
});

export const { clearOwnerEsiaFlag, setOwnerData, setOwnerDefault, resetOwner, updatePolicyHolder } = ownerSlice.actions;
