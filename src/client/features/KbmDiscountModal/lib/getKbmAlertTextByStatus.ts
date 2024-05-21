import { pluralizeDriversGenitive } from 'shared/lib/pluralize';

import type { TStatusesAndDrivers } from '../types';

import { IStatuses } from './driversKbmStatuses';

export type TTextsByStatuses = Record<
  IStatuses,
  (
    driversGenitive: string,
    names: string,
    driverCount: number,
  ) => { firstText: string; names?: string; secondText?: string } | null
>;

const textsByStatuses: TTextsByStatuses = {
  [IStatuses.ThereAreDriversWithDefaultKbm]: (driversGenitive, names) => ({
    firstText: `Для ${driversGenitive} `,
    names,
    secondText: ` применен базовый КБМ – это значит, что не найдена история вождения или водитель только получил права – проверьте данные еще раз`,
  }),
  [IStatuses.ThereAreDriversWithAccidents]: (driversGenitive, names, driverCount) => ({
    firstText: `У ${driversGenitive} `,
    names,
    secondText: ` в прошлом были аварии. Если не добавлять ${
      driverCount === 1 ? 'его' : 'их'
    }, полис будет намного дешевле`,
  }),
  [IStatuses.ThereAreDriversWithMaxKbm]: (driversGenitive, names, driverCount) => ({
    firstText: `У ${driversGenitive} `,
    names,
    secondText: ` чуть хуже история безаварийности. Если не добавлять ${
      driverCount === 1 ? 'его' : 'их'
    }, то полис будет дешевле`,
  }),
  [IStatuses.TotalMinKbm]: (_, __, driverCount) => ({
    firstText: `${driverCount > 1 ? 'У всех ' : ''}КБМ 0,46 - применена максимальная скидка за безаварийность`,
  }),
  [IStatuses.TheOnlyDriverLeftOrNoInsurer]: () => null,
  [IStatuses.DefaultStatus]: (_, names) => ({
    firstText: `Вы не можете исключить водителя `,
    names,
    secondText: `, так как он является страхователем`,
  }),
  [IStatuses.LoadingStatus]: () => ({
    firstText: 'Рассчитываем историю безаварийности водителей',
  }),
};

export const getKbmAlertTextByStatus = (data: TStatusesAndDrivers) => {
  const [status, drivers] = data;

  const driversGenitive = pluralizeDriversGenitive(drivers.length);
  const names = drivers.map((driver) => driver.fullName).join(', ');
  const getText = textsByStatuses[status];

  return getText(driversGenitive, names, drivers.length);
};
