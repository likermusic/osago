import MockDate from 'mockdate';

import { preparePolicyDate } from '../preparePolicyDate';

beforeEach(() => {
  MockDate.set('2021-01-01'); // 1 Jan 2021
});

describe('WHEN "preparePolicyDate" is called', () => {
  it.each([[''], [undefined], [null], ['2020.2020.12020']])(
    'AND date provided as falsy value - %p, MUST return null',
    (date) => {
      expect(preparePolicyDate(date as string)).toEqual(null);
    },
  );

  it('WHEN provided date was expired 41 days ago, MUST return negative archive status', () => {
    expect(preparePolicyDate('2020-11-21T00:00:00')).toEqual({
      description: 'Архивный',
      status: 'negative',
      endDate: '21.11.2020',
      remainingDays: -41,
    });
  });

  it('WHEN provided date was expired 1 age ago, MUST return negative archive status', () => {
    expect(preparePolicyDate('2020-01-01T00:00:00')).toEqual({
      description: 'Архивный',
      status: 'negative',
      endDate: '01.01.2020',
      remainingDays: -366,
    });
  });

  it('WHEN provided date was expired yesterday, MUST return negative status and remaining day', () => {
    expect(preparePolicyDate('2020-12-31T00:00:00')).toEqual({
      description: 'Закончился 31.12.2020',
      status: 'negative',
      endDate: '31.12.2020',
      remainingDays: -1,
    });
  });

  it('WHEN provided date was expired one month, MUST return negative status and remaining day', () => {
    expect(preparePolicyDate('2020-12-1T00:00:00')).toEqual({
      description: 'Закончился 01.12.2020',
      status: 'negative',
      endDate: '01.12.2020',
      remainingDays: -31,
    });
  });

  it('WHEN provided date was expired 40 days ago, MUST return negative status and remaining day', () => {
    expect(preparePolicyDate('2020-11-22T00:00:00')).toEqual({
      description: 'Закончился 22.11.2020',
      status: 'negative',
      endDate: '22.11.2020',
      remainingDays: -40,
    });
  });

  it('WHEN provided date is today, MUST return negative status and remaining day', () => {
    expect(preparePolicyDate('2021-01-01T00:00:00')).toEqual({
      description: 'Заканчивается 01.01.2021',
      status: 'negative',
      endDate: '01.01.2021',
      remainingDays: 0,
    });
  });

  it('WHEN provided date is tomorrow, MUST return negative status and remaining day', () => {
    expect(preparePolicyDate('2021-01-02T00:00:00')).toEqual({
      description: 'Заканчивается 02.01.2021',
      status: 'negative',
      endDate: '02.01.2021',
      remainingDays: 1,
    });
  });

  it('WHEN provided date is expired 20 day, after MUST return negative status and remaining day', () => {
    expect(preparePolicyDate('2021-01-20T00:00:00')).toEqual({
      description: 'Заканчивается 20.01.2021',
      status: 'negative',
      endDate: '20.01.2021',
      remainingDays: 19,
    });
  });

  it('WHEN provided date is expired 1 age, minus 1 day, after, MUST return positive status and remaining day', () => {
    expect(preparePolicyDate('2021-12-31T00:00:00')).toEqual({
      description: 'Начнётся 01.01.2021',
      status: 'positive',
      endDate: '31.12.2021',
      remainingDays: 364,
    });
  });

  it('WHEN provided date is expired 1 age, after, MUST return positive status and remaining day', () => {
    expect(preparePolicyDate('2022-01-01T00:00:00')).toEqual({
      description: 'Начнётся 02.01.2021',
      status: 'positive',
      endDate: '01.01.2022',
      remainingDays: 365,
    });
  });

  it('WHEN provided date is expired one month after, MUST return positive status and remaining day', () => {
    expect(preparePolicyDate('2021-03-01T00:00:00')).toEqual({
      description: 'Действует до 01.03.2021',
      status: 'positive',
      endDate: '01.03.2021',
      remainingDays: 59,
    });
  });

  it('WHEN provided date is expired three month after, MUST return positive status and remaining day', () => {
    expect(preparePolicyDate('2021-05-01T00:00:00')).toEqual({
      description: 'Действует до 01.05.2021',
      status: 'positive',
      endDate: '01.05.2021',
      remainingDays: 120,
    });
  });
});
