/*
 * Необходимо жестко ограничивать длину серии и номера, иначе в форму сетится значение длиннее чем показывается в инпуте и пользователь видит валидные данные вроде бы, но по факту они не валидные
 * Для водительских прав и паспорта РФ, длина серии - 4, длина номера - 6
 * */
import { removeSpaces } from '@sravni/cosago-react-library/lib/utils';

export const getSeriesAndNumberFromFullNumber = (
  documentNumber: string | undefined,
  seriesLength = 4,
  numberLength?: number,
): {
  series: string | undefined;
  number: string | undefined;
} => {
  const documentNumberWithoutSpaces = documentNumber && removeSpaces(documentNumber);

  const series = documentNumberWithoutSpaces?.slice(0, seriesLength);
  const number = documentNumberWithoutSpaces?.slice(seriesLength, numberLength && numberLength + seriesLength);

  return { series, number };
};
