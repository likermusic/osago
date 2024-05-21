import type { ICustomSelectValue } from '@sravni/cosago-react-library/lib/types';

export type TPerson = {
  fullName: Nullable<ICustomSelectValue>;
  birthday: string | undefined;
};

type TPeople = {
  fullName: NonNullable<TPerson['fullName']>['value'] | undefined;
  birthday: string | undefined;
};

const mapPeopleWithFullNameAsObjectToString = (people: TPerson): TPeople => ({
  ...people,
  fullName: people?.fullName?.value,
});

export const comparePeople = (person1: TPeople, person2: TPeople) =>
  !!person1?.fullName &&
  !!person2?.fullName &&
  person1?.fullName?.toString().toLowerCase() === person2?.fullName?.toString().toLowerCase() &&
  person1.birthday === person2.birthday;

export const comparePeopleWithFullNameAsObject = (person1: TPerson, person2: TPerson) =>
  comparePeople(mapPeopleWithFullNameAsObjectToString(person1), mapPeopleWithFullNameAsObjectToString(person2));
