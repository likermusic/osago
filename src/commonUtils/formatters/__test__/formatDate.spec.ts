import dayjs from 'dayjs';

import { formatDate } from '../formatDate';

describe('WHEN "formatDate" is called', () => {
  it('WHEN run "toClientFromObject" with date different format, MUST return "DD.MM.YYYY" format', () => {
    const date = dayjs('2020-01-01');
    expect(formatDate.toClientFromObject(date)).toBe('01.01.2020');
  });
  it('WHEN run "toServerFromObject" with date different format, MUST return "YYYY-MM-DD" format', () => {
    const date = dayjs('2020-01-01');
    expect(formatDate.toServerFromObject(date)).toBe('2020-01-01');
  });

  it('WHEN run "toClientFromServer" with date different format, MUST return "DD.MM.YYYY" format', () => {
    const date = '2020-01-01';
    expect(formatDate.toClientFromServer(date)).toBe('01.01.2020');
  });

  it('WHEN run "toLocalizedClientFromServer" with date different format, MUST return "D MMMM YYYY" format', () => {
    const date = '2020-01-01';
    expect(formatDate.toLocalizedClientFromServer(date)).toBe('1 января 2020');
  });

  it('WHEN run "toLocalizedClientFromClient" with date different format, MUST return "D MMMM YYYY" format', () => {
    const date = '01.01.2020';
    expect(formatDate.toLocalizedClientFromClient(date)).toBe('1 января 2020');
  });

  it('WHEN run "toObjectFromClient" with date different format, MUST return "DayJS Object"', () => {
    const date = '01.01.2020';
    expect(formatDate.toObjectFromClient(date)).toBeInstanceOf(dayjs);
  });

  it('WHEN run "toObjectFromServer" with date different format, MUST return "DayJS Object"', () => {
    const date = '2020-01-01';
    expect(formatDate.toObjectFromServer(date)).toBeInstanceOf(dayjs);
  });

  it('WHEN run "toServerFromClient" with date different format, MUST return "YYYY-MM-DD" format', () => {
    const date = '01.01.2020';
    expect(formatDate.toServerFromClient(date)).toBe('2020-01-01');
  });

  it('WHEN run "toDateFromClient" with date different format, MUST return "Date" format', () => {
    const date = '01.01.2020';
    expect(formatDate.toDateFromClient(date)).toBeInstanceOf(Date);
  });

  it('WHEN run "toClientFromDate" with date different format, MUST return "DD.MM.YYYY" format', () => {
    const date = new Date('2020-01-01');
    expect(formatDate.toClientFromDate(date)).toBe('01.01.2020');
  });

  it('WHEN run "toDateInGenitiveCase" with date different format, MUST return "D MMMM" in genitive case format', () => {
    const date = dayjs('2020-01-01');
    expect(formatDate.toDateInGenitiveCase(date)).toBe('1 января');
  });

  it('WHEN run "toDateInGenitiveCase" with date different format, MUST return "D MMMM" in genitive case format', () => {
    const date = dayjs('2020-13-31');
    expect(formatDate.toDateInGenitiveCase(date)).toBe('31 января');
  });

  it('WHEN run "toDateInGenitiveCase" with date different format, MUST return "D MMMM" in genitive case format', () => {
    const date = dayjs('2020-01-31').add(1, 'M');
    expect(formatDate.toDateInGenitiveCase(date)).toBe('29 февраля');
  });

  it.each([
    { seconds: 20, expected: '00:20' },
    { seconds: 0, expected: '00:00' },
  ])(
    'WHEN run "fromSecondsToTimeMinutesAndSeconds" it MUST convert seconds ($seconds) in minutes:seconds ($expected)',
    ({ seconds, expected }) => {
      expect(formatDate.fromSecondsToTimeMinutesAndSeconds(seconds)).toBe(expected);
    },
  );
});
