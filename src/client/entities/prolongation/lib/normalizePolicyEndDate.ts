import { concatWithPrefix } from '@sravni/cosago-react-library/lib/utils';
import { differenceInCalendarDays, isValid, startOfDay } from 'date-fns';
import dayJs from 'dayjs';

import { formatDate } from 'commonUtils/formatters';

export const normalizePolicyEndDate = (policyEndDate?: Nullable<string>): string => {
  if (!policyEndDate) {
    return '';
  }

  const dateObj = startOfDay(new Date(policyEndDate));

  if (!isValid(dateObj)) {
    return '';
  }

  const currentDate = startOfDay(new Date());
  const dateBeforeExpiration = differenceInCalendarDays(currentDate, dateObj);

  if (dateBeforeExpiration === 0) {
    return 'Закончится сегодня';
  }

  const textConstant = dateBeforeExpiration > 0 ? 'Закончился' : 'Закончится';
  return concatWithPrefix(textConstant, formatDate.toDateInGenitiveCase(dayJs(policyEndDate)), ' ');
};
