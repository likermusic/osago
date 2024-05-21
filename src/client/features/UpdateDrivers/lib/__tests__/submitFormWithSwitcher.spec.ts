import type { UpdateDriversWithSwitchersForm } from 'entities/drivers';
import { PolicyHolderType } from 'entities/owner';

import { submitFormWithSwitcher } from '../submitFormWithSwitcher';

jest.mock('nanoid', () => ({
  nanoid: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockGetState = () =>
  ({
    insurer: {
      data: {},
    },
    owner: {
      data: {},
    },
    carInfo: {
      data: {
        carVinNumber: '1234123',
      },
    },
  } as Store);

beforeEach(() => {
  mockDispatch.mockReset();
});

describe('WHEN "submitFormWithSwitcher" is called', () => {
  const getPolicyInfoMock = jest.fn();
  it('AND is not multidrive MUST save values to driver entity', async () => {
    const actualData = { birthday: '123' };
    await submitFormWithSwitcher(
      actualData as UpdateDriversWithSwitchersForm,
      'driverId1',
      false,
      getPolicyInfoMock,
    )(mockDispatch, mockGetState, undefined);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { data: actualData, driverId: 'driverId1', isMultiDrive: false },
      type: 'drivers/updateDriver',
    });
  });

  it('AND it is multidrive, MUST save values to driver entity AND not save anything other', async () => {
    const actualData = { birthday: '123' };
    await submitFormWithSwitcher(
      actualData as UpdateDriversWithSwitchersForm,
      'driverId1',
      true,
      getPolicyInfoMock,
    )(mockDispatch, mockGetState, undefined);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { data: actualData, driverId: 'driverId1', isMultiDrive: true },
      type: 'drivers/updateDriver',
    });
  });

  describe('AND isDriverOwner', () => {
    it('AND data is presented, MUST save driver and update owner and update insurer status', async () => {
      const actualData = {
        birthday: '05.01.1999',
        fullName: 'Шестаков Андрей Романович',
        isDriverOwner: true,
        passportNumber: '45 20 123456',
        passportIssueDate: '01.01.2020',
        registrationAddress: 'ул. Пушкина, д. Колотушкина',
      };
      const mockGetStateWithOwnerPolicyHolder = (): Store => ({
        ...mockGetState(),
        owner: {
          data: {
            policyHolder: PolicyHolderType.Other,
          },
        } as Store['owner'],
      });

      await submitFormWithSwitcher(
        actualData as unknown as UpdateDriversWithSwitchersForm,
        'driverId1',
        false,
        getPolicyInfoMock,
      )(mockDispatch, mockGetStateWithOwnerPolicyHolder, undefined);
      expect(mockDispatch).toHaveBeenCalledTimes(4);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: {
          data: {
            birthday: '05.01.1999',
            fullName: 'Шестаков Андрей Романович',
            passportNumber: '45 20 123456',
            passportIssueDate: '01.01.2020',
            registrationAddress: 'ул. Пушкина, д. Колотушкина',
            policyHolder: PolicyHolderType.Other,
            registrationAddressFlat: '',
          },
          isFullFilled: true,
        },
        type: 'owner/setOwnerData',
      });
    });

    it('AND isDriverInsurer AND data is presented MUST save driver and insurer and update owner with new policy holder', async () => {
      const actualData = {
        birthday: '05.01.1999',
        fullName: 'Шестаков Андрей Романович',
        isDriverOwner: true,
        isDriverInsurer: true,
        passportNumber: '45 20 123456',
        passportIssueDate: '01.01.2020',
        registrationAddress: 'ул. Пушкина, д. Колотушкина',
      };
      const mockGetStateWithOwnerPolicyHolder = (): Store => ({
        ...mockGetState(),
        owner: {
          data: {
            policyHolder: PolicyHolderType.Other,
          },
        } as Store['owner'],
      });

      await submitFormWithSwitcher(
        actualData as unknown as UpdateDriversWithSwitchersForm,
        'driverId1',
        false,
        getPolicyInfoMock,
      )(mockDispatch, mockGetStateWithOwnerPolicyHolder, undefined);
      expect(mockDispatch).toHaveBeenCalledTimes(4);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: {
          data: {
            birthday: '05.01.1999',
            fullName: 'Шестаков Андрей Романович',
            passportNumber: '45 20 123456',
            passportIssueDate: '01.01.2020',
            registrationAddress: 'ул. Пушкина, д. Колотушкина',
            policyHolder: 'Owner',
            registrationAddressFlat: '',
          },

          isFullFilled: true,
        },
        type: 'owner/setOwnerData',
      });

      expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        payload: {
          isActive: false,

          values: {
            birthday: '05.01.1999',
            fullName: 'Шестаков Андрей Романович',
            passportNumber: '45 20 123456',
            passportIssueDate: '01.01.2020',
            registrationAddress: 'ул. Пушкина, д. Колотушкина',
            registrationAddressFlat: '',
          },
        },
        type: 'insurer/setInsurerData',
      });
    });

    it('MUST request recommended date from server', async () => {
      const actualData = {
        birthday: '05.01.1999',
        fullName: 'Шестаков Андрей Романович',
        isDriverOwner: true,
        passportNumber: '45 20 123456',
        passportIssueDate: '01.01.2020',
        registrationAddress: 'ул. Пушкина, д. Колотушкина',
      };
      const mockGetStateWithOwnerPolicyHolder = (): Store => ({
        ...mockGetState(),
        owner: {
          data: {
            policyHolder: PolicyHolderType.Other,
          },
        } as Store['owner'],
      });

      await submitFormWithSwitcher(
        actualData as unknown as UpdateDriversWithSwitchersForm,
        'driverId1',
        false,
        getPolicyInfoMock,
      )(mockDispatch, mockGetStateWithOwnerPolicyHolder, undefined);
      expect(getPolicyInfoMock).toHaveBeenCalledWith({
        ownerBirthDate: '05.01.1999',
        ownerFio: 'Шестаков Андрей Романович',
        vin: '1234123',
      });
    });
  });

  describe('AND isDriverOwner is "false"', () => {
    it('AND actually people are the same AND data is presented, MUST save driver and reset owner', async () => {
      const actualData = {
        birthday: '05.01.1999',
        fullName: {
          value: 'Шестаков Андрей Романович',
        },
        isDriverOwner: false,
        passportNumber: '45 20 123456',
        passportIssueDate: '01.01.2020',
        registrationAddress: 'ул. Пушкина, д. Колотушкина',
      };
      const mockGetStateWithOwnerPolicyHolder = (): Store => ({
        ...mockGetState(),
        owner: {
          data: {
            birthday: '05.01.1999',
            fullName: {
              value: 'Шестаков Андрей Романович',
            },
            policyHolder: PolicyHolderType.Other,
          },
        } as unknown as Store['owner'],
      });

      await submitFormWithSwitcher(
        actualData as unknown as UpdateDriversWithSwitchersForm,
        'driverId1',
        false,
        getPolicyInfoMock,
      )(mockDispatch, mockGetStateWithOwnerPolicyHolder, undefined);
      expect(mockDispatch).toHaveBeenCalledTimes(3);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, { payload: undefined, type: 'owner/resetOwner' });
    });

    it('AND isDriverInsurer AND data is presented MUST save driver and insurer', async () => {
      const actualData = {
        birthday: '05.01.1999',
        fullName: 'Шестаков Андрей Романович',
        isDriverOwner: false,
        isDriverInsurer: true,
        passportNumber: '45 20 123456',
        passportIssueDate: '01.01.2020',
        registrationAddress: 'ул. Пушкина, д. Колотушкина',
      };

      await submitFormWithSwitcher(
        actualData as unknown as UpdateDriversWithSwitchersForm,
        'driverId1',
        false,
        getPolicyInfoMock,
      )(mockDispatch, mockGetState, undefined);
      expect(mockDispatch).toHaveBeenCalledTimes(4);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        payload: {
          isActive: true,

          values: {
            birthday: '05.01.1999',
            fullName: 'Шестаков Андрей Романович',
            passportNumber: '45 20 123456',
            passportIssueDate: '01.01.2020',
            registrationAddress: 'ул. Пушкина, д. Колотушкина',
            registrationAddressFlat: '',
          },
        },
        type: 'insurer/setInsurerData',
      });
    });
  });
});
