import type { OwnerCommonFields } from 'entities/owner';
import { PolicyHolderType } from 'entities/owner';

import { setInsurerByOwnerDataThunk } from '../setInsurerByOwnerDataThunk';

jest.mock('nanoid', () => ({
  nanoid: jest.fn(),
}));

const mockDispatch = jest.fn();

beforeEach(() => {
  mockDispatch.mockReset();
});

describe('WHEN "setInsurerByOwnerData" is called', () => {
  describe('AND "policyHolder" is "owner"', () => {
    it('MUST copy data to insurer', async () => {
      const owner = {
        data: {
          birthday: '123',
          policyHolder: PolicyHolderType.Owner,
        },
        prevPolicyHolder: PolicyHolderType.Default,
      };

      const mockGetStateWithOwnerPolicyHolder = () =>
        ({
          carInfo: {
            data: {},
          },
          owner,
        } as Store);

      await setInsurerByOwnerDataThunk({
        newOwnerData: owner.data as unknown as OwnerCommonFields,
        currentPolicyHolder: owner.prevPolicyHolder,
      })(mockDispatch, mockGetStateWithOwnerPolicyHolder, undefined);

      expect(mockDispatch).toHaveBeenCalledWith({
        payload: { isActive: false, values: { birthday: '123' } },
        type: 'insurer/setInsurerData',
      });
    });
  });

  it('AND policyHolder is other AND previous policy holder was owner MUST reset insurer', async () => {
    const owner = {
      data: {
        birthday: '123',
        policyHolder: PolicyHolderType.Other,
      },
      prevPolicyHolder: PolicyHolderType.Owner,
    };

    const mockGetStateWithOwnerPolicyHolder = () =>
      ({
        carInfo: {
          data: {},
        },
        owner,
      } as Store);

    await setInsurerByOwnerDataThunk({
      newOwnerData: owner.data as unknown as OwnerCommonFields,
      currentPolicyHolder: owner.prevPolicyHolder,
    })(mockDispatch, mockGetStateWithOwnerPolicyHolder, undefined);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'insurer/resetInsurer' });
  });

  it('AND policyHolder is other AND previous policy holder was driver MUST reset insurer', async () => {
    const owner = {
      data: { birthday: '123', policyHolder: PolicyHolderType.Other },
      prevPolicyHolder: 'driverId',
    };

    const mockGetStateWithOwnerPolicyHolder = () =>
      ({
        carInfo: {
          data: {},
        },
        owner,
      } as Store);

    await setInsurerByOwnerDataThunk({
      newOwnerData: owner.data as unknown as OwnerCommonFields,
      currentPolicyHolder: owner.prevPolicyHolder,
    })(mockDispatch, mockGetStateWithOwnerPolicyHolder, undefined);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'insurer/resetInsurer' });
  });

  it('AND policyHolder is other AND previous policy holder was other MUST not reset insurer', async () => {
    const owner = {
      data: { birthday: '123', policyHolder: PolicyHolderType.Other },
      prevPolicyHolder: PolicyHolderType.Other,
    };

    const mockGetStateWithOwnerPolicyHolder = () =>
      ({
        carInfo: {
          data: {},
        },
        owner,
      } as Store);

    await setInsurerByOwnerDataThunk({
      newOwnerData: owner.data as unknown as OwnerCommonFields,
      currentPolicyHolder: owner.prevPolicyHolder,
    })(mockDispatch, mockGetStateWithOwnerPolicyHolder, undefined);
    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });

  it('AND policyHolder is driver AND last policy holder is different driver MUST copy driver data to insurer', async () => {
    const owner = {
      data: { birthday: '123', policyHolder: 'driverId1' },
      prevPolicyHolder: 'driverId2',
    };

    const mockGetStateWithOwnerPolicyHolder = () =>
      ({
        carInfo: {
          data: {},
        },
        drivers: {
          multipleFormsData: {
            driverId1: {
              data: {
                birthday: '05.01.1999',
              },
            },
          },
        },
        people: {
          people: [],
        },
        owner,
      } as unknown as Store);

    await setInsurerByOwnerDataThunk({
      newOwnerData: owner.data as unknown as OwnerCommonFields,
      currentPolicyHolder: owner.prevPolicyHolder,
    })(mockDispatch, mockGetStateWithOwnerPolicyHolder, undefined);

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { birthday: '05.01.1999' },
      type: 'insurer/mapInsurerData',
    });
  });

  it('AND policyHolder is driver AND it is driver from profile service, MUST copy driver data to insurer with additional data', async () => {
    const driverData = {
      fullName: { value: 'Ivanov' },
      birthday: '05.01.1999',
    };

    const owner = {
      data: { birthday: driverData.birthday, fullName: driverData.fullName, policyHolder: 'driverId1' },
      prevPolicyHolder: 'driverId2',
    };

    const mockGetStateWithOwnerPolicyHolder = () =>
      ({
        carInfo: {
          data: {},
        },
        drivers: {
          multipleFormsData: {
            driverId1: {
              data: driverData,
            },
          },
        },
        people: {
          people: [
            {
              fullName: driverData.fullName.value,
              birthday: driverData.birthday,
              passportNumber: '12345',
            },
          ],
        },
        owner,
      } as unknown as Store);

    await setInsurerByOwnerDataThunk({
      newOwnerData: owner.data as unknown as OwnerCommonFields,
      currentPolicyHolder: owner.prevPolicyHolder,
    })(mockDispatch, mockGetStateWithOwnerPolicyHolder, undefined);

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        ...driverData,
        passportNumber: '12345',
        hasPreviousLicence: 'no',
      },
      type: 'insurer/mapInsurerData',
    });
  });
});
