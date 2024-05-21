import { isArrayIncreaseFirstTimeByNumber } from '../isArrayIncreaseFirstTimeByNumber';

describe('WHEN "isArrayIncreaseFirstTimeByNumber" is called', () => {
  it('MUST return correct value with emptyArray', async () => {
    const arrayLengthNotIncreased = isArrayIncreaseFirstTimeByNumber(1, 1);
    const arrayLengthIncreasedByOne = isArrayIncreaseFirstTimeByNumber(0, 1);
    const arrayLengthIncreasedByThree = isArrayIncreaseFirstTimeByNumber(0, 3);

    expect(arrayLengthNotIncreased(0)).toBe(false);
    expect(arrayLengthNotIncreased(1)).toBe(false);

    expect(arrayLengthIncreasedByOne(1)).toBe(true);
    expect(arrayLengthIncreasedByOne(2)).toBe(false);

    expect(arrayLengthIncreasedByThree(1)).toBe(true);
    expect(arrayLengthIncreasedByThree(3)).toBe(true);
    expect(arrayLengthIncreasedByThree(4)).toBe(false);
  });

  it('MUST return correct value with notEmptyArray', async () => {
    const arrayLengthNotIncreased = isArrayIncreaseFirstTimeByNumber(1, 1);
    const arrayLengthIncreasedByOne = isArrayIncreaseFirstTimeByNumber(2, 3);
    const arrayLengthIncreasedByThree = isArrayIncreaseFirstTimeByNumber(1, 4);

    expect(arrayLengthNotIncreased(1)).toBe(false);
    expect(arrayLengthNotIncreased(2)).toBe(false);

    expect(arrayLengthIncreasedByOne(1)).toBe(false);
    expect(arrayLengthIncreasedByOne(2)).toBe(false);
    expect(arrayLengthIncreasedByOne(3)).toBe(true);

    expect(arrayLengthIncreasedByThree(1)).toBe(false);
    expect(arrayLengthIncreasedByThree(3)).toBe(true);
    expect(arrayLengthIncreasedByThree(4)).toBe(true);
  });
});
