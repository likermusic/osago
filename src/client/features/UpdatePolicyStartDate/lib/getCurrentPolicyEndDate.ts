import dayjs from 'dayjs';

export const getCurrentPolicyEndDate = (startDate: Date | undefined) => {
  if (!startDate) return '';

  const dayjsDate = dayjs(startDate);
  let dayjsNextYearDate = dayjsDate.add(1, 'year');

  if (!(dayjsDate.month() === 1 && dayjsDate.date() === 29)) {
    dayjsNextYearDate = dayjsNextYearDate.subtract(1, 'day');
  }

  return dayjsNextYearDate.format('DD.MM.YYYY');
};
