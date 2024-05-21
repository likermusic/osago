import { MockedDrivers } from 'mocks/drivers';

import { PolicyHolderType } from 'entities/owner';

import { mapPolicyHolderList } from '../mapPolicyHolderList';

describe('WHEN "mapPolicyHolderList" is called', () => {
  it('AND currentOwner is equal driver, MUST NOT double option in list', () => {
    expect(mapPolicyHolderList(MockedDrivers.drivers, MockedDrivers.drivers.first.data.fullName.label)).toEqual([
      { label: MockedDrivers.drivers.first.data.fullName.label, value: PolicyHolderType.Owner },
      { label: MockedDrivers.drivers.seconds.data.fullName.value, value: 'seconds' },
      { label: 'Другой человек', value: PolicyHolderType.Other },
    ]);
  });

  it('AND currentOwner is NOT equal driver, MUST return "owner" in list', () => {
    expect(mapPolicyHolderList(MockedDrivers.drivers, 'Иванов Иван Иванович')).toEqual([
      { label: MockedDrivers.drivers.first.data.fullName.label, value: 'first' },
      { label: MockedDrivers.drivers.seconds.data.fullName.value, value: 'seconds' },
      { label: 'Иванов Иван Иванович', value: PolicyHolderType.Owner },
      { label: 'Другой человек', value: PolicyHolderType.Other },
    ]);
  });
});
