import { normalizeDriversCount } from '../normalizeDriversCount';

describe('WHEN "normalizeDriversCount" is called', () => {
  it.each([
    [undefined, 'Без ограничений'],
    [0, 'Без ограничений'],
    [1, '1 водитель'],
    [2, '2 водителя'],
    [3, '3 водителя'],
    [4, '4 водителя'],
    [5, '5 водителей'],
  ])('AND quantity of drivers is equal %p, MUST return %p', (quantity: number | undefined, result: string) => {
    expect(normalizeDriversCount(quantity)).toEqual(result);
  });
});
