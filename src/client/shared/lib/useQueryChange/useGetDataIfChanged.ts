import { useCallback, useState } from 'react';

import { useAppDispatch } from '../redux';

export const useGetDataIfChanged = <T>(getData: () => ThunkResult<Promise<T>>) => {
  const [lastSearch, setLastSearch] = useState<string>('');
  const dispatch = useAppDispatch();

  /**
   * @param isForce - брать данные даже если ничего не менялось
   * */
  return useCallback(
    async (isForce?: boolean) => {
      const data = await dispatch(getData());
      const currentSearchData = JSON.stringify(data);

      if (!isForce && lastSearch === currentSearchData) {
        /**
         * В запросе ничего не менялось, то нет смысла перезапускать расчет
         * Просто возвращаем флаг, что расчет не запускался
         * */
        return false;
      }

      setLastSearch(currentSearchData);

      return data;
    },
    [dispatch, getData, lastSearch],
  );
};
