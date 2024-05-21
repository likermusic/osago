import type { UserCommonFields } from 'shared/types';

export const comparePeopleWithAddressAndPassport = (person1: UserCommonFields, person2: UserCommonFields) =>
  person1.fullName?.value === person2.fullName?.value &&
  person1.birthday === person2.birthday &&
  person1.passportNumber === person2.passportNumber &&
  person1.passportIssueDate === person2.passportIssueDate &&
  person1.registrationAddress?.value === person2.registrationAddress?.value &&
  person1.registrationAddressFlat === person2.registrationAddressFlat;
