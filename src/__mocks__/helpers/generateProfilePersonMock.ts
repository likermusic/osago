import { parseFullName } from '@sravni/cosago-react-library/lib/utils';

type GenerateProfilePersonOptions = {
  addressFlat: string;
  address: string;
  isFromEsia: boolean;
  birthday: string;
  experienceStartDate: string;
  hasPreviousLicence: boolean;
  licenceNumber: string;
  passportNumber: string;
  passportIssueDate: string;
  email: string;
};
export const generateProfilePersonMock = (fullName: string, options?: Partial<GenerateProfilePersonOptions>) => {
  const { firstName, middleName, lastName } = parseFullName({ value: fullName });
  const {
    birthday = '1999-01-05T00:00:00',
    address = 'Самарская обл, г Тольятти, ул Фрунзе',
    addressFlat = 'д 8Б',
    passportNumber = '4520123456',
    passportIssueDate = '2019-03-12T00:00:00',
    isFromEsia = false,
    email,
  } = options ?? {};

  return {
    birthday,
    firstName,
    fullName,
    lastName,
    middleName,
    address,
    addressFlat,
    passportNumber,
    passportIssueDate,
    fromEsia: isFromEsia,
    email,
  };
};
