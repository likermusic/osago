import { getMaxKbm } from '../getMaxKbm';

const getMockedDriversWithKbm = (kbms: number[]) => [
  {
    fullName: 'Ичетовкин Никита Сергеевич',
    isInsurer: false,
    kbm: kbms[0],
    isSelected: false,
    keyInDrivers: '123',
  },
  {
    fullName: 'Ичетовкин Никита Сергеевич2',
    isInsurer: false,
    kbm: kbms[1],
    isSelected: false,
    keyInDrivers: '1223',
  },
];

describe('WHEN getMaxKbm is called', () => {
  it('AND driver kbm is equal 3, MUST return 3', () => {
    const drivers = getMockedDriversWithKbm([3, 3]).slice(1);
    expect(getMaxKbm(drivers)).toEqual(3);
  });

  it('AND drivers kbm is equal(1, 1), MUST return 1', () => {
    const drivers = getMockedDriversWithKbm([1, 1]);
    expect(getMaxKbm(drivers)).toEqual(1);
  });

  it('AND drivers kbm is equal(0, 0), MUST return 0', () => {
    const drivers = getMockedDriversWithKbm([0, 0]);
    expect(getMaxKbm(drivers)).toEqual(0);
  });

  it('AND ones driver kbm is more than another(2, 1), MUST return his kbm(2)', () => {
    const drivers = getMockedDriversWithKbm([2, 1]);
    expect(getMaxKbm(drivers)).toEqual(2);
  });
});
