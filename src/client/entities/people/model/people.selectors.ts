import type { ICustomSelectValue } from '@sravni/cosago-react-library/lib/types';
import { createSelector } from 'reselect';

import { comparePeopleWithFullNameAsObject } from 'shared/lib/comparePeopleWithFullNameAsObject';
import { removeEmptyFields } from 'shared/lib/removeEmptyFields';
import type { SliceStateFromReducer } from 'shared/types';

import { convertPersonToFormFields } from 'entities/people/lib/convertPersonToFormFields';

import type { peopleSlice } from './people.slice';

type TPeopleState = SliceStateFromReducer<typeof peopleSlice>;

export const selectPeople = (state: TPeopleState) => state.people.people;

export const selectPersonByFullNameAndBirthday = (fullName: Nullable<ICustomSelectValue>, birthday: string) =>
  createSelector(selectPeople, (people) => {
    const person = people?.find((item) =>
      comparePeopleWithFullNameAsObject(
        { fullName: { value: item.fullName }, birthday: item.birthday },
        { fullName, birthday },
      ),
    );

    if (person) {
      return removeEmptyFields(convertPersonToFormFields(person));
    }

    return {};
  });

export const selectFioSuggestions = createSelector(
  selectPeople,
  (state: AppStore) => state.appConfig.analytics?.analyticsABTestStatistics?.statistics || '',
  (persons, statistics = '') =>
    persons.map(({ fullName, fromEsia }) => ({
      value: fullName,
      label: fullName,
      fromEsia: statistics.includes('a72011a5-9344-4bb8.1') ? fromEsia : false,
    })),
);

export const selectEsiaPerson = createSelector(selectPeople, (people) => {
  const esiaPerson = people?.find(({ fromEsia }) => fromEsia);

  if (!esiaPerson) {
    return null;
  }

  return convertPersonToFormFields(esiaPerson);
});
