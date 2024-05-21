import { doSort } from 'shared/lib/doSort/doSort';

describe('WHEN "sort" is called', () => {
  it('AND one of comparing arguments was not provided, MUST return 0', () => {
    expect(doSort('ASC', undefined, 2)).toEqual(0);
  });

  describe('AND first argument is "ASC"(from small to big)', () => {
    it('AND "a" more then "b", MUST return value less then ', () => {
      expect(doSort('ASC', 1, 2)).toEqual(-1);
    });

    it('AND "a" less then "b", MUST return value more then 0', () => {
      expect(doSort('ASC', 5, 2)).toEqual(3);
    });
  });

  describe('AND first argument is "DESC"(from big to small)', () => {
    it('AND "a" more then "b", MUST return value more then ', () => {
      expect(doSort('DESC', 1, 2)).toEqual(1);
    });

    it('AND "a" less then "b", MUST return value less then 0', () => {
      expect(doSort('DESC', 5, 2)).toEqual(-3);
    });
  });
});
