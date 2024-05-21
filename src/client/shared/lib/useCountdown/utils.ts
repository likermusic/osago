import { pluralizeByUnit } from '@sravni/utils/lib/pluralize';

interface IGenerateCountdownOptions {
  isShort?: boolean;
  endsTitle?: string;
  isWithoutMinutes?: boolean;
  isWithoutColon?: boolean;
}

const getPluralDays = (days: number, isShort?: boolean, isWithoutColon?: boolean) =>
  days > 0
    ? `${days}\u00A0${isShort ? 'д' : pluralizeByUnit(days, 'day')}${isWithoutColon ? ' ' : `\u00A0:\u00A0`}`
    : '';

const getPluralHours = (hours: number, isShort?: boolean, isWithoutMinutes?: boolean, isWithoutColon?: boolean) =>
  hours > 0
    ? `${hours}\u00A0${isShort ? 'ч' : pluralizeByUnit(hours, 'hour')}${
        isWithoutMinutes || isWithoutColon ? ' ' : '\u00A0:\u00A0'
      }`
    : '';

const getPluralMins = (minutes: number, isShort?: boolean) =>
  `${minutes}\u00A0${isShort ? 'м' : pluralizeByUnit(minutes, 'minute')}`;

export const generateCountdownString = (
  days: number,
  hours: number,
  minutes: number,
  options: IGenerateCountdownOptions,
) => {
  const { isShort, isWithoutMinutes, isWithoutColon, endsTitle } = options;
  return `${endsTitle}${getPluralDays(days, isShort, isWithoutColon)}${getPluralHours(
    hours,
    isShort,
    isWithoutMinutes,
    isWithoutColon,
  )}${isWithoutMinutes ? '' : getPluralMins(minutes, isShort)}`;
};
