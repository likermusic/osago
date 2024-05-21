import { generateProfilePersonMock } from 'mocks/helpers';

import type { UserCommonFields } from 'shared/types';

import type { OwnerEntityReducer } from 'entities/owner';
import type { TPeopleState } from 'entities/people';

import { selectFormWithSwitcherData } from '../selectFormWithSwitcherData';

jest.mock('nanoid', () => ({
  nanoid: jest.fn(),
}));

const driverId = 'driverId1';
const driverData = {
  drivers: {
    multipleFormsData: {
      [driverId]: {
        data: {
          fullName: {
            label: 'Иванов Иван Иванович',
            value: 'Иванов Иван Иванович',
          },
          birthday: '12.12.2000',
        },
      },
    },
  },
  insurer: {
    data: {
      fullName: {
        label: 'Петров Петр Петрович',
        value: 'Петров Петр Петрович',
      },
      birthday: '12.12.2000',
      passportNumber: '1234',
    },
  } as Form.Single<UserCommonFields>,
  owner: {
    data: {
      fullName: {
        label: 'Сидоров Сидр Сидорович',
        value: 'Сидоров Сидр Сидорович',
      },
      birthday: '12.12.2000',
      passportNumber: '1234',
    },
    prevPolicyHolder: '',
  } as OwnerEntityReducer,
  people: {
    people: [],
  } as TPeopleState,
};
describe('WHEN "selectFormWithSwitcherData" is mounted', () => {
  describe('AND only driver is provided', () => {
    it('MUST return drivers data', () => {
      expect(selectFormWithSwitcherData(driverData, driverId)).toEqual({
        fullName: {
          label: 'Иванов Иван Иванович',
          value: 'Иванов Иван Иванович',
        },
        birthday: '12.12.2000',
        isDriverInsurer: false,
        isDriverOwner: false,
      });
    });

    it('AND driver has record in profile service, MUST return drivers data with data from profile service', () => {
      const driverDataWithDriverOwner = {
        ...driverData,
        people: {
          people: [generateProfilePersonMock('Иванов Иван Иванович', { birthday: '12.12.2000' })],
        },
      };
      expect(selectFormWithSwitcherData(driverDataWithDriverOwner, driverId)).toEqual({
        fullName: {
          label: 'Иванов Иван Иванович',
          value: 'Иванов Иван Иванович',
        },
        birthday: '12.12.2000',
        isDriverInsurer: false,
        isDriverOwner: false,
        passportIssueDate: '2019-03-12T00:00:00',
        passportNumber: '4520123456',
        registrationAddressFlat: 'д 8Б',
      });
    });
  });

  it('AND driver is owner, MUST return driver data with owner data', () => {
    const driverDataWithDriverOwner = {
      ...driverData,
      owner: {
        data: {
          fullName: {
            label: 'Иванов Иван Иванович',
            value: 'Иванов Иван Иванович',
          },
          birthday: '12.12.2000',
          passportNumber: '1234',
        },
        prevPolicyHolder: '',
      } as OwnerEntityReducer,
    };
    expect(selectFormWithSwitcherData(driverDataWithDriverOwner, driverId)).toEqual({
      fullName: {
        label: 'Иванов Иван Иванович',
        value: 'Иванов Иван Иванович',
      },
      birthday: '12.12.2000',
      isDriverInsurer: false,
      isDriverOwner: true,
      passportNumber: '1234',
    });
  });

  it('AND driver is insurer MUST return driver data with insurers data', () => {
    const driverDataWithDriverOwner = {
      ...driverData,
      insurer: {
        data: {
          fullName: {
            label: 'Иванов Иван Иванович',
            value: 'Иванов Иван Иванович',
          },
          birthday: '12.12.2000',
          passportNumber: '1234',
        },
      } as Form.Single<UserCommonFields>,
    };
    expect(selectFormWithSwitcherData(driverDataWithDriverOwner, driverId)).toEqual({
      fullName: {
        label: 'Иванов Иван Иванович',
        value: 'Иванов Иван Иванович',
      },
      birthday: '12.12.2000',
      isDriverInsurer: true,
      isDriverOwner: false,
      passportNumber: '1234',
    });
  });

  it('AND driver both insurer and owner, MUST return driver data with owner data', () => {
    const driverDataWithDriverOwner = {
      ...driverData,
      people: {
        people: [generateProfilePersonMock('Иванов Иван Иванович', { birthday: '12.12.2000' })],
      },
      insurer: {
        data: {
          fullName: {
            label: 'Иванов Иван Иванович',
            value: 'Иванов Иван Иванович',
          },
          birthday: '12.12.2000',
          passportNumber: '1234',
        },
      } as Form.Single<UserCommonFields>,
      owner: {
        data: {
          birthday: '12.12.2000',
          fullName: {
            label: 'Иванов Иван Иванович',
            value: 'Иванов Иван Иванович',
          },
          passportNumber: '1234',
        },
        prevPolicyHolder: '',
      } as OwnerEntityReducer,
    };
    expect(selectFormWithSwitcherData(driverDataWithDriverOwner, driverId)).toEqual({
      fullName: {
        label: 'Иванов Иван Иванович',
        value: 'Иванов Иван Иванович',
      },
      birthday: '12.12.2000',
      isDriverInsurer: true,
      isDriverOwner: true,
      passportNumber: '1234',
      passportIssueDate: '2019-03-12T00:00:00',
      registrationAddressFlat: 'д 8Б',
    });
  });
});
