export const removeKeyFromObject = <TForm extends Record<string, unknown>, TKey extends keyof TForm>(
  obj: TForm,
  key: TKey,
): Omit<TForm, TKey> => (({ [key]: _key, ...objectWithoutKey }) => objectWithoutKey)(obj);
