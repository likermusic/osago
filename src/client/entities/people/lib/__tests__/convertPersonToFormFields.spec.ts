import type { FormFields } from '@sravni/cosago-react-library/lib/constants';

import type { TPerson } from 'entities/people';

import { convertPersonToFormFields } from '../convertPersonToFormFields';

describe('WHEN "convertPersonToFormFields" is called', () => {
  it('AND incoming data is driver, MUST return mapped data for driver', () => {
    const BASE_PERSON: TPerson = {
      birthday: '05.01.1999',
      experienceStartDate: '21.03.2017',
      fullName: 'Иванов Иван Иванович',
      phone: '79272123456',
      licenceNumber: '1234567890',
      email: 'test@yandex.ru',
    };

    const NORMALIZED_BASE_PERSON = {
      birthday: '05.01.1999',
      experienceStartDate: '21.03.2017',
      fullName: {
        label: 'Иванов Иван Иванович',
        value: 'Иванов Иван Иванович',
      },
      email: 'test@yandex.ru',
      hasPreviousLicence: 'no' as FormFields.ConfirmChoice,
      licenceNumber: '1234567890',
      passportIssueDate: '',
      passportNumber: '',
      registrationAddressFlat: '',
      registrationAddress: null,
      phone: '79272123456',
    };

    expect(convertPersonToFormFields(BASE_PERSON)).toEqual(NORMALIZED_BASE_PERSON);
  });

  it('AND incoming data is owner or insurer, MUST return mapped data for that person', () => {
    const BASE_PERSON: TPerson = {
      addressFlat: '3a',
      address: {
        value: 'Самарская обл, г Тольятти, ул Фрунзе, д 8Б',
        source: {
          data: {
            fias_level: '8',
            region: 'Самарская',
          },
        },
      },
      birthday: '05.01.1999',
      fullName: 'Иванов Иван Иванович',
      passportNumber: '1234567890',
      email: 'test@yandex.ru',
      phone: '79272123456',
    };

    const NORMALIZED_BASE_PERSON = {
      birthday: '05.01.1999',
      phone: '79272123456',
      fullName: {
        label: 'Иванов Иван Иванович',
        value: 'Иванов Иван Иванович',
      },
      passportNumber: '1234567890',
      experienceStartDate: '',
      registrationAddress: {
        label: 'Самарская обл, г Тольятти, ул Фрунзе, д 8Б',
        value: 'Самарская обл, г Тольятти, ул Фрунзе, д 8Б',
        data: {
          fias_level: '8',
          region: 'Самарская',
        },
      },
      registrationAddressFlat: '3a',
      hasPreviousLicence: 'no',
      licenceNumber: '',
      passportIssueDate: '',
      email: 'test@yandex.ru',
    };

    expect(convertPersonToFormFields(BASE_PERSON)).toEqual(NORMALIZED_BASE_PERSON);
  });
});
