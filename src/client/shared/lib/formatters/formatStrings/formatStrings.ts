export const removeUnderscores = (value = '') => value?.replace(/_/g, '');

export const removeDashes = (value = '') => value?.replace(/-/g, '');

export const removeMaskSymbols = (value = '') => value?.replace(/[\s_.]/g, '');

export const trim = (val = '') => val.trim();

export const replaceSpacesToUnbreakableGap = (value: Nullable<string | undefined>) =>
  value ? value.replace(/\s/g, '\u00A0') : '';
export const capitalizeFirstLetter = <T extends string>(value: T): Capitalize<T> => {
  if (value?.[0]) {
    return (value[0].toUpperCase() + value.slice(1)) as Capitalize<T>;
  }

  return '' as Capitalize<T>;
};
