import type { IKbmDiscountDriver } from '../types';

import { getKbmAlertTextByStatus } from './getKbmAlertTextByStatus';
import { getKbmStatusAndDrivers } from './getKbmStatusAndDrivers';

export const getKbmAlert = (drivers: IKbmDiscountDriver[]) => {
  const selectedDrivers = drivers.filter((driver) => driver.isSelected);
  const status = getKbmStatusAndDrivers(selectedDrivers);
  return getKbmAlertTextByStatus(status);
};
