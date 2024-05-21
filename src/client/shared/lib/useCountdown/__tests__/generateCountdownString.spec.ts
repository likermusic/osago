import { generateCountdownString } from '../utils';

const TITLE = 'Акция закончится через ';

describe('WHEN "generateCountdownString" is called', () => {
  it.each([
    /* eslint-disable no-irregular-whitespace */
    [1, 1, 1, false, `${TITLE}1 день : 1 час : 1 минута`],
    [1, 1, 1, true, `${TITLE}1 д : 1 ч : 1 м`],
    [10, 12, 14, false, `${TITLE}10 дней : 12 часов : 14 минут`],
    [0, 12, 14, false, `${TITLE}12 часов : 14 минут`],
    [0, 0, 14, false, `${TITLE}14 минут`],
    [0, 0, 14, true, `${TITLE}14 м`],
    /* eslint-enable no-irregular-whitespace */
  ])(
    'AND provided attributes are equal: days(%p), $hours(%p), $mins(%p), $isShort(%p), MUST return (%p)',
    // eslint-disable-next-line max-params
    (days: number, hours: number, mins: number, isMobile: boolean, result: string) => {
      expect(generateCountdownString(days, hours, mins, { isShort: isMobile, endsTitle: TITLE })).toEqual(result);
    },
  );
});
