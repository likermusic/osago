import { FormFields, Documents } from '@sravni/cosago-react-library/lib/constants';
import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from 'shared/config/Storybook/StoreDecorator';

import { getPowerOptionsKey } from 'entities/carInfo';
import { PolicyHolderType } from 'entities/owner';

import { UserDataSummary } from './UserDataSummary';

const meta: Meta<typeof UserDataSummary> = {
  title: 'Widgets/UserDataSummaryWidget',
  component: UserDataSummary,
  decorators: [
    StoreDecorator({
      drivers: {
        isMultiDrive: false,
        multipleFormsData: {
          first: {
            isFullFilled: true,
            data: {
              experienceStartDate: '31.12.2022',
              fullName: { value: 'Иванов Иван Иванович', label: 'Иванов Иван Иванович' },
              birthday: '31.12.1987',
              prevLastName: 'Петров',
              licenceNumber: '1234567890',
              prevLicenceNumber: '1234567890',
              hasPreviousLicence: FormFields.ConfirmChoice.no,
              kbm: { value: 1.17, status: 'success' },
            },
          },
        },
        isActive: true,
      },
      carInfo: {
        dictionaries: {
          brands: [{ value: '342', label: 'BRAND' }],
          models: { '342': [{ value: '33', label: 'MODEL' }] },
          years: { '33': [{ value: '2021', label: '2021' }] },
          powers: {
            [getPowerOptionsKey({ modelId: '342', year: '33', brandId: '342' })]: [{ value: '59', label: '59 лс' }],
          },
        },
        data: {
          bodyNumber: '1234',
          carBrand: { value: '342', data: { alias: 'kia' } },
          carManufactureYear: { value: '2021' },
          carModel: { value: '33' },
          carNumber: '',
          carVinNumber: 'X4XCY69470Y805657',
          chassisNumber: '',
          documentIssueDate: '',
          documentNumber: '',
          documentType: Documents.ECarDocumentType.STS,
          enginePower: { value: '59' },
          carModification: { value: '2021' },
          identifyType: Documents.CarIdentifyType.VIN,
        },
        isFullFilled: true,
        isActive: true,
      },
      owner: {
        data: {
          fullName: { value: 'Иванов Иван Иванович', label: 'Иванов Иван Иванович' },
          policyHolder: PolicyHolderType.Owner,
          birthday: '31.12.1297',
          passportNumber: '',
          registrationAddress: { value: '' },
          registrationAddressFlat: '',
          passportIssueDate: '',
        },
        isFullFilled: true,
        isActive: true,
      },
      insurer: {
        data: {
          fullName: { value: 'Иванов Иван Иванович', label: 'Иванов Иван Иванович' },
          birthday: '31.12.1297',
          passportNumber: '',
          registrationAddress: { value: '' },
          registrationAddressFlat: '',
          passportIssueDate: '',
        },
        isFullFilled: true,
        isActive: true,
      },
      contacts: {
        isActive: true,
        isFullFilled: true,
        data: {
          mobilePhone: '+79042513838',
          smsCode: '',
          email: 'Test@yandex.ru',
          userAgreement: false,
        },
      },
    }),
  ],
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof UserDataSummary>;

export const BasicUsage: Story = {
  args: {},
};
