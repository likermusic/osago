import { readClientIdFromCookie } from '../readUtmId';

describe('WHEN "readClientIdFromCookie" is called', () => {
  it.each([
    [undefined, undefined],
    ['', ''],
    ['GA1.2.336507246.1695029970', '336507246.1695029970'],
  ])('AND cookie was %p, MUST return %p', (input?: string, output?: string) => {
    expect(readClientIdFromCookie(() => input)).toEqual(output);
  });
});
