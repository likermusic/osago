import type { DriversCommonFields } from 'entities/drivers';
import { PolicyHolderType } from 'entities/owner';

export const mapPolicyHolderList = (
  drivers: Form.Multi<DriversCommonFields>['multipleFormsData'],
  ownerName?: string,
) => {
  const result = [];

  if (drivers) {
    result.push(
      ...Object.keys(drivers).map((driverId) => ({
        value: driverId,
        label: drivers[driverId].data?.fullName?.value?.toString() ?? '',
      })),
    );
  }

  if (ownerName) {
    const ownerDriver = result.find(({ label }) => ownerName === label);
    if (!ownerDriver) {
      // если среди драйверов нет овнера, указываем овнера как отдельную опцию
      result.push({
        value: PolicyHolderType.Owner,
        label: ownerName,
      });
    } else {
      // если среди драйверов есть овнер, указываем этого драйвера как овнера
      ownerDriver.value = PolicyHolderType.Owner;
    }
  }

  result.push({
    value: PolicyHolderType.Other,
    label: 'Другой человек',
  });

  return result;
};
