import Router from 'next/router';
import { useCallback } from 'react';

import { removeEmptyFields } from 'shared/lib/removeEmptyFields';
import type { TReplacer } from 'shared/lib/useReplaceUrlQuery/types';

export const useGetUrlQueryReplacer = () =>
  useCallback(async (query: TReplacer = {}): Promise<void> => {
    const notEmptyQuery = removeEmptyFields(query);

    // используем replace чтобы явно переписать историю, иначе кнопка назад срабатывает только со второго раза
    await Router.replace(
      {
        pathname: Router.pathname,
        query: notEmptyQuery,
      },
      undefined,
      {
        shallow: true,
      },
    );
  }, []);
