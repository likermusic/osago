import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { StateInsuranceCompanies } from '../types';

const initialState: StateInsuranceCompanies = {
  fullCompaniesMap: {},
  idList: [],
  ratings: [],
};

export const insuranceCompaniesSlice = createSlice({
  name: 'insuranceCompanies',
  initialState,
  reducers: {
    saveInsuranceCompaniesFullMap: (state, { payload }: PayloadAction<StateInsuranceCompanies['fullCompaniesMap']>) => {
      state.fullCompaniesMap = payload;
    },
    saveInsuranceCompaniesIdList: (state, { payload }: PayloadAction<StateInsuranceCompanies['idList']>) => {
      state.idList = payload;
    },
    saveInsuranceCompaniesRatings: (state, { payload }: PayloadAction<StateInsuranceCompanies['ratings']>) => {
      state.ratings = payload;
    },
  },
});
