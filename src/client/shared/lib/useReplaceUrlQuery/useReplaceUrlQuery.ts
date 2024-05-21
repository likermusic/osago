import { useEffect } from 'react';

import type { TReplacer } from 'shared/lib/useReplaceUrlQuery/types';

import { useGetUrlQueryReplacer } from './useGetUrlQueryReplacer';

export const useReplaceUrlQuery = (query?: TReplacer) => {
  const replaceUrlQuery = useGetUrlQueryReplacer();

  useEffect(() => {
    replaceUrlQuery(query);
  }, [query, replaceUrlQuery]);
};
