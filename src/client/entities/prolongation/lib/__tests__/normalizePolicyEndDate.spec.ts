import { addDays, subDays } from 'date-fns';
import dayJs from 'dayjs';

import { formatDate } from 'commonUtils/formatters';

import { normalizePolicyEndDate } from '../normalizePolicyEndDate';

describe('WHEN "normalizePolicyEndDate" is called', () => {
  it('AND data is not provided, MUST return empty string', () => {
    expect(normalizePolicyEndDate()).toEqual('');
  });

  it('AND data is not valid, MUST return empty string', () => {
    expect(normalizePolicyEndDate('invalid')).toEqual('');
  });

  describe('AND data is valid', () => {
    const date = new Date().toISOString();

    it('AND data is before today, MUST return policy was expired string', () => {
      const yesterday = subDays(new Date(date), 1).toISOString();
      expect(normalizePolicyEndDate(yesterday)).toEqual(
        `Закончился ${formatDate.toDateInGenitiveCase(dayJs(yesterday))}`,
      );
    });

    it('AND data is before equal today, MUST return policy will be expired string', () => {
      expect(normalizePolicyEndDate(date)).toEqual('Закончится сегодня');
    });

    it('AND data is before today, MUST return policy will be expired string', () => {
      const tomorrow = addDays(new Date(date), 1).toISOString();
      expect(normalizePolicyEndDate(tomorrow)).toEqual(
        `Закончится ${formatDate.toDateInGenitiveCase(dayJs(tomorrow))}`,
      );
    });
  });
});
