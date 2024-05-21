type Primitive = number | string | boolean | bigint | symbol | null | undefined;

export const isPrimitiveValuesStrictTheSame = (val1: Primitive, val2: Primitive) => {
  if (!val1 || !val2 || typeof val1 !== typeof val2) {
    return false;
  }

  return val1 === val2;
};
