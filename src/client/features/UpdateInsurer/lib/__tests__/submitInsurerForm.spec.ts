import type { UserCommonFields } from 'shared/types';

import { PolicyHolderType } from 'entities/owner';

import { submitInsurerForm } from '../submitInsurerForm';

jest.mock('nanoid', () => ({
  nanoid: jest.fn(),
}));

const mockDispatch = jest.fn();

beforeEach(() => {
  mockDispatch.mockReset();
});

describe('WHEN "submitInsurerForm" is called', () => {
  it('AND insurer is owner and driver MUST save insurer data and update owner policy holder to owner and set insurer isActive to false', () => {
    const mockStoreWithInsurerOwnerDriver = {
      drivers: {
        multipleFormsData: {
          data: {
            fullName: {
              label: 'Шестаков Андрей Романович',
              value: 'Шестаков Андрей Романович',
            },
            birthday: '05.01.1999',
          },
        },
      },
      owner: {
        data: {
          fullName: {
            label: 'Шестаков Андрей Романович',
            value: 'Шестаков Андрей Романович',
          },
          birthday: '05.01.1999',
        },
      },
    } as unknown as Store;
    const actualData = {
      fullName: {
        label: 'Шестаков Андрей Романович',
        value: 'Шестаков Андрей Романович',
      },
      birthday: '05.01.1999',
    };
    submitInsurerForm(actualData as UserCommonFields)(mockDispatch, () => mockStoreWithInsurerOwnerDriver, undefined);
    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      payload: { isActive: false, values: actualData },
      type: 'insurer/setInsurerData',
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(3, {
      payload: PolicyHolderType.Owner,
      type: 'owner/updatePolicyHolder',
    });
  });

  it('AND insurer is driver MUST save insurer data and update owner policy holder to driver and set insurer isActive to true', () => {
    const mockStoreWithInsurerDriver = {
      drivers: {
        multipleFormsData: {
          driverId1: {
            data: {
              fullName: {
                label: 'Шестаков Андрей Романович',
                value: 'Шестаков Андрей Романович',
              },
              birthday: '05.01.1999',
            },
          },
        },
      },
      owner: {
        data: {
          fullName: {
            label: 'Иванов Иван Иванович',
            value: 'Иванов Иван Иванович',
          },
          birthday: '05.01.1999',
        },
      },
    } as unknown as Store;
    const actualData = {
      fullName: {
        label: 'Шестаков Андрей Романович',
        value: 'Шестаков Андрей Романович',
      },
      birthday: '05.01.1999',
    };
    submitInsurerForm(actualData as UserCommonFields)(mockDispatch, () => mockStoreWithInsurerDriver, undefined);
    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      payload: { isActive: true, values: actualData },
      type: 'insurer/setInsurerData',
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(3, { payload: 'driverId1', type: 'owner/updatePolicyHolder' });
  });

  it('AND insurer is not driver and owner MUST save insurer data and update owner policy holder to other and set insurer isActive to true', () => {
    const mockStoreWithInsurerDriver = {
      drivers: {
        multipleFormsData: {
          driverId1: {
            data: {
              fullName: {
                label: 'Петров Петр Петрович',
                value: 'Петров Петр Петрович',
              },
              birthday: '05.01.1999',
            },
          },
        },
      },
      owner: {
        data: {
          fullName: {
            label: 'Иванов Иван Иванович',
            value: 'Иванов Иван Иванович',
          },
          birthday: '05.01.1999',
        },
      },
    } as unknown as Store;
    const actualData = {
      fullName: {
        label: 'Шестаков Андрей Романович',
        value: 'Шестаков Андрей Романович',
      },
      birthday: '05.01.1999',
    };
    submitInsurerForm(actualData as UserCommonFields)(mockDispatch, () => mockStoreWithInsurerDriver, undefined);
    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      payload: { isActive: true, values: actualData },
      type: 'insurer/setInsurerData',
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(3, {
      payload: PolicyHolderType.Other,
      type: 'owner/updatePolicyHolder',
    });
  });
});
