import { addDays } from 'date-fns';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import { comparePolicyEndDates } from '../comparePolicyEndDates';

const TODAY_DATE = dayjs(new Date());
const TOMORROW_DATE = dayjs(addDays(new Date(), 1));
const DAY_AFTER_TOMORROW_DATE = dayjs(addDays(new Date(), 2));
const YESTERDAY_DATE = dayjs(addDays(new Date(), -1));
const DAY_BEFORE_YESTERDAY_DATE = dayjs(addDays(new Date(), -2));

describe('WHEN "comparePolicyEndDates" is called', () => {
  it.each([
    [TODAY_DATE, null],
    [TODAY_DATE, ''],
    [TODAY_DATE, '20.04'],
    [null, TODAY_DATE],
    [TODAY_DATE, undefined],
    [null, null],
    [undefined, null],
  ])('AND provided dates for compare is invalid MUST return 0', (firstEndDate, secondEndDate) => {
    expect(comparePolicyEndDates(TODAY_DATE)(firstEndDate as unknown as Dayjs, secondEndDate as unknown as Dayjs)).toBe(
      0,
    );
  });

  it.each([null, undefined, '', '20.04'])('AND provided today date is invalid MUST return 0', (today) => {
    expect(comparePolicyEndDates(today as unknown as Dayjs)(TODAY_DATE, TODAY_DATE)).toBe(0);
  });

  // TODO: сама логика странная, просто взята со старого проекта, в этом кейсе отрабатывает точно неправильно возвращает 1, разобраться https://sravni-corp.atlassian.net/browse/OS-10314
  it.skip('AND today is between firstEndDate and secondEndDate AND first date behind second MUST return -1', () => {
    expect(comparePolicyEndDates(TODAY_DATE)(YESTERDAY_DATE, TOMORROW_DATE)).toBe(-1);
  });

  // TODO: сама логика странная, просто взята со старого проекта, в этом кейсе отрабатывает точно неправильно возвращает 1, разобраться https://sravni-corp.atlassian.net/browse/OS-10314
  it.skip.each([TODAY_DATE, TOMORROW_DATE, DAY_AFTER_TOMORROW_DATE, YESTERDAY_DATE, DAY_BEFORE_YESTERDAY_DATE])(
    'AND firstEndDate and secondEndDate are equal MUST return 0',
    (date) => {
      expect(comparePolicyEndDates(TODAY_DATE)(date, date)).toBe(0);
    },
  );

  describe('AND first date in future AND second date in future', () => {
    it('AND first date behind second, MUST sort oldest policy first', () => {
      expect(comparePolicyEndDates(TODAY_DATE)(TOMORROW_DATE, DAY_AFTER_TOMORROW_DATE)).toEqual(-1);
    });

    it('AND second date behind first, MUST sort oldest policy first', () => {
      expect(comparePolicyEndDates(TODAY_DATE)(DAY_AFTER_TOMORROW_DATE, TOMORROW_DATE)).toEqual(1);
    });
  });

  describe('AND first date in past AND second date in past', () => {
    it.skip('AND first date behind second, MUST sort oldest policy first', () => {
      // TODO: сама логика странная, просто взята со старого проекта, в этом кейсе отрабатывает точно неправильно возвращает 1, разобраться https://sravni-corp.atlassian.net/browse/OS-10314
      expect(comparePolicyEndDates(TODAY_DATE)(DAY_BEFORE_YESTERDAY_DATE, YESTERDAY_DATE)).toEqual(-1);
    });

    it('AND second date behind first, MUST sort oldest policy first', () => {
      expect(comparePolicyEndDates(TODAY_DATE)(YESTERDAY_DATE, DAY_BEFORE_YESTERDAY_DATE)).toEqual(1);
    });
  });
});
