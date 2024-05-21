/**
 * @param value Значение, которое нужно проверить на существование
 * @param formatter Функция, которую нужно вызвать, если значение есть
 * @param undefinedValue Текст который вернет функция, если значения нет
 * @returns Если значение существует(value), вернет значение вызванной функции(formatter), иначе вернет переданный текст(undefinedText)
 */
export const formatExistValue = <ValueType, FormatterType, UndefinedType>(
  value: ValueType | undefined | null,
  formatter: (args: ValueType) => FormatterType,
  undefinedValue: UndefinedType,
): FormatterType | UndefinedType => {
  if (value === undefined || value === null) {
    return undefinedValue;
  }

  return formatter(value);
};
