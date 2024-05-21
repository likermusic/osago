import { FormFields } from '@sravni/cosago-react-library/lib/constants';

export const MockedDrivers = {
  drivers: {
    first: {
      data: {
        isMultiDrive: true,
        prevLicenceNumber: '',
        prevLastName: 'Петров',
        licenceNumber: '3213123123',
        fullName: { value: `Ичетовкин Никита Валерьевич`, label: `Ичетовкин Никита Валерьевич` },
        hasPreviousLicence: FormFields.ConfirmChoice.no,
        birthday: '21.12.1312',
        experienceStartDate: '31.12.1231',
        rememberOnlyYear: false,
        kbm: { value: 0.46, status: 'success' as const },
      },
      isFullFilled: false,
    },
    seconds: {
      data: {
        isMultiDrive: true,
        prevLicenceNumber: '',
        hasPreviousLicence: FormFields.ConfirmChoice.no,
        prevLastName: 'Ичетовкин',
        licenceNumber: '3213123123',
        fullName: { value: `Ичетовкин Никита Сергеевич` },
        birthday: '21.12.1312',
        experienceStartDate: '31.12.1231',
        rememberOnlyYear: false,
        kbm: { value: 0.74, status: 'success' as const },
      },
      isFullFilled: false,
    },
  },
  isMultiDrive: false,
};

export const MockedInsurer = {
  fullName: MockedDrivers.drivers.first.data.fullName,
  birthday: MockedDrivers.drivers.first.data.birthday,
  passportNumber: '',
  passportIssueDate: '',
  registrationAddress: null,
  registrationAddressFlat: null,
  isSameAsOwner: false,
};
