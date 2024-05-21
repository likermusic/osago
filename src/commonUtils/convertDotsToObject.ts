/**
 * Эта утилита конвертирует тип объекта с вложенными полями с ключами, которые содержат символ ".", в тип объекта с соответствующими вложенными объектами.
 * Пример работы:
 * { a: 1; b: 2; 'c.d': 3 }
 * =>
 * { a: 1, b: 2, c: { d: 3 } }
 */

export type ConvertDotsToObj<TObj> = {
  [TKey in keyof TObj as TKey extends `${infer TBeforeDot}.${string}` ? TBeforeDot : TKey]: [TKey] extends [
    `${string}.${infer TAfterDot}`,
  ]
    ? {
        [key in TAfterDot]?: TObj[TKey];
      }
    : TObj[TKey];
};
