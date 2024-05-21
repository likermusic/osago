/**
 * @param value Значение, которое нужно проверить на существование
 * @param undefinedValue Значение которое вернет функция, если основного значения нет
 * @returns Если значение существует(value), вернет его, иначе вернет переданный текст(undefinedText)
 */
export const isValueExist = <A>(value: A | undefined | null, undefinedValue: A): A => {
  if (value === undefined || value === null) {
    return undefinedValue;
  }

  return value;
};
