export const isArrayIncreaseFirstTimeByNumber = (prevArrayLength: number, newArrayLength: number) => (num: number) =>
  prevArrayLength < num && newArrayLength >= num;
