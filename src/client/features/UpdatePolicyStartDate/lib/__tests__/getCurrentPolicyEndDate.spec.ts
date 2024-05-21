import { getCurrentPolicyEndDate } from '../getCurrentPolicyEndDate';

describe('WHEN "getCurrentPolicyEndDate" is called', () => {
  it('AND date was nor provided MUST return empty string', () => {
    expect(getCurrentPolicyEndDate(undefined)).toBe('');
  });
  it('AND date was provided MUST return one year after', () => {
    expect(getCurrentPolicyEndDate(new Date('2022-07-20'))).toBe('19.07.2023');
  });
  it('AND provided date was 29 february MUST return one year after leap year', () => {
    expect(getCurrentPolicyEndDate(new Date('2024-02-29'))).toBe('28.02.2025');
  });
});
