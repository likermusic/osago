import type { Dayjs } from 'dayjs';

// Сервер не хочет в алиасы
import { dateFormats } from '../../constants/dateFormats';

export const formatDateServer = {
  // DayJS Object -> "YYYY-MM-DD"
  toServerFromObject: (date: Dayjs) => date.format(dateFormats.server),
};
