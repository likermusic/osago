import type { Dayjs } from 'dayjs';

const isDateObject = (date: Dayjs): boolean => date && typeof date === 'object';

export const comparePolicyEndDates = (today: Dayjs) => (firstEndDate: Dayjs, secondEndDate: Dayjs) => {
  if (!isDateObject(today) || !isDateObject(firstEndDate) || !isDateObject(secondEndDate)) {
    return 0;
  }

  const isSecondDateInPast = today.diff(secondEndDate, 'day') > 0;
  const isFirstDateInFuture = today.diff(firstEndDate, 'day') < 0;

  const isFirstDateAfterToday = firstEndDate.diff(today, 'day') > 0;
  const isFirstDateBeforeSecondDate = firstEndDate.diff(secondEndDate, 'day') < 0;

  return (isSecondDateInPast && isFirstDateInFuture) || (isFirstDateAfterToday && isFirstDateBeforeSecondDate) ? -1 : 1;
};
