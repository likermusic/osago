export const replaceValueInObject = <T extends Record<string, any>>(
  obj: T,
  keyWhereToReplace: keyof T,
  oldValue: T[keyof T],
  newValue: T[keyof T],
) => ({
  ...obj,
  [keyWhereToReplace]: obj[keyWhereToReplace] === oldValue ? newValue : obj[keyWhereToReplace],
});
