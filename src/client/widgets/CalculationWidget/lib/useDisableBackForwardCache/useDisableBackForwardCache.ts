import { identity } from 'lodash/fp';
import { useEffect } from 'react';

// Хук отрубает в хроме back/forward cache, который заставляет залипать дизайн
export const useDisableBackForwardCache = () => {
  useEffect(() => {
    window.addEventListener('unload', identity, true);

    return () => {
      window.removeEventListener('unload', identity, false);
    };
  }, []);
};
