import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { comparePeople } from 'shared/lib/comparePeopleWithFullNameAsObject';

import type { TPeopleState } from '../types';

import { queries } from './people.query';

const initialState: TPeopleState = {
  people: [],
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    updatePeopleData: (state, { payload }: PayloadAction<TPeopleState['people'][number]>) => {
      const { birthday, fullName } = payload;

      const personIndex = state.people.findIndex((item) =>
        comparePeople({ fullName: item.fullName, birthday: item.birthday }, { fullName, birthday }),
      );

      if (personIndex === -1) {
        state.people.push(payload);
      } else {
        state.people.splice(personIndex, 1, {
          ...state.people[personIndex],
          ...payload,
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(queries.endpoints.postPeople.matchFulfilled, (state, { payload }) => ({
      ...state,
      people: payload,
    }));
  },
});
export const { updatePeopleData } = peopleSlice.actions;
