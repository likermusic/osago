import { sendSentryClientError } from '../sendSentryClientError';

/**
 * @param value Значение, которое нужно проверить на существование
 * @param errorText Текст ошибки, если значение отсутствует
 * @param sentryInfo Дополнительная информация об ошибке для сентри(если не передано, то ошибка не отправится в сентри)
 * @returns Если значение существует(value), вернет его, иначе выкинет ошибку с переданным текстом(errorText)
 */
export const isValueExistStrict = <A>(
  value: A | undefined | null,
  errorText: string,
  sentryInfo?: {
    place: string;
    [key: string]: unknown;
  },
): A | never => {
  if (value === undefined || value === null) {
    if (sentryInfo) {
      sendSentryClientError(errorText, {
        value,
        ...sentryInfo,
      });
    }
    throw new Error(errorText);
  }

  return value;
};
