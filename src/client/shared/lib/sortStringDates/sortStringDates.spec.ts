import { sortStringDates } from 'shared/lib/sortStringDates/sortStringDates';

describe('WHEN "sortStringDates" is called', () => {
  it('MUST sort dates correct', () => {
    expect(sortStringDates(['12.02.2023', '21.01.2023', '13.02.2023'])).toEqual([
      '21.01.2023',
      '12.02.2023',
      '13.02.2023',
    ]);
  });
});
