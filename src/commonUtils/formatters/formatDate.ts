import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';

// eslint-disable-next-line import/no-unassigned-import
import 'dayjs/locale/ru';

import { dateFormats } from '../../constants/dateFormats';

import { monthNameInGenitiveCase } from './monthNameInGenitiveCase';

dayjs.locale('ru');
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);

const toDateInGenitiveCase = (date: Dayjs) => `${date.date()} ${monthNameInGenitiveCase[date.month()]}`;
const toObjectFromClient = (date: string) => dayjs(date, dateFormats.client).startOf('date');

export const formatDate = {
  // DayJS Object -> "DD.MM.YYYY"
  toClientFromObject: (date: Dayjs) => date.format(dateFormats.client),
  // DayJS Object -> "YYYY-MM-DD"
  toServerFromObject: (date: Dayjs) => date.format(dateFormats.server),
  // "YYYY-MM-DD" -> "DD.MM.YYYY"
  toClientFromServer: (date: string) => dayjs(date).startOf('date').format(dateFormats.client),
  // "YYYY-MM-DD" -> "D MMMM YYYY"
  toLocalizedClientFromServer: (date: string) => dayjs(date).startOf('date').format(dateFormats.localizedClient),
  // "YYYY-MM-DD" -> "D MMMM YYYY"
  toLocalizedClientFromClient: (date: string) =>
    dayjs(date, dateFormats.client).startOf('date').format(dateFormats.localizedClient),
  // "DD.MM.YYYY" -> DayJS Object
  toObjectFromClient,
  // "YYYY-MM-DD" -> DayJS Object
  toObjectFromServer: (date: string) => dayjs(date, dateFormats.server).startOf('date'),
  // "DD.MM.YYYY" -> "YYYY-MM-DD"
  toServerFromClient: (date: string) => dayjs(date, dateFormats.client).startOf('date').format(dateFormats.server),
  // "DD.MM.YYYY" -> "YYYY-MM-DD"
  toDateFromClient: (date: string) => dayjs(date, dateFormats.client).startOf('date').toDate(),
  toClientFromDate: (date: Date) => dayjs(date).format('DD.MM.YYYY'),
  // DayJS Object -> "D MMMM" месяц в родительском падеже
  toDateInGenitiveCase,
  // Seconds -> "minutes:seconds"
  fromSecondsToTimeMinutesAndSeconds: (seconds: number) => dayjs(seconds * 1000).format('mm:ss'),
  // DayJS Object -> "D MMMM" месяц в родительском падеже YYYY
  fromClientToDateInGenitiveCaseWithYear: (dateStr: Nullable<string>) => {
    if (!dateStr) {
      return '';
    }

    const date = toObjectFromClient(dateStr);

    return `${toDateInGenitiveCase(date)} ${date.year()}`;
  },
};
