import { useEffect, useState } from 'react';

import { useAppSelector } from 'shared/lib/redux';

export const useCopySelectorToState = <T>(selector: (state: Store) => T) => {
  const data = useAppSelector(selector);
  const [state, setState] = useState({ ...data });

  useEffect(() => {
    setState({ ...data });
    // Прибрал лишние ререндеры, если пересоздался объект а данные не поменялись
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)]);

  return state;
};
