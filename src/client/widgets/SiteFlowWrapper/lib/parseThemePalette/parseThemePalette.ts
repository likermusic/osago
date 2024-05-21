import type { ThemeColors } from '@sravni/cosago-react-library/lib/types';

import { sendSentryClientError } from 'shared/lib/sendSentryClientError';

export const parseThemePalette = (parseThemeStr: string): ThemeColors => {
  try {
    const { color1, color2 } = JSON.parse(parseThemeStr || '{}');

    return {
      color1,
      color2,
    };
  } catch (e) {
    sendSentryClientError(e, { placement: 'parseThemePalette' });
    return {
      color1: 'rgb(0, 42, 58)',
      color2: 'rgb(239, 242, 249)',
    };
  }
};
