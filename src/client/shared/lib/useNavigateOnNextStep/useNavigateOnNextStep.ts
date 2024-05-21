import type { UrlObject } from 'url';

import { useCallback, useState } from 'react';

import type { RouterPages } from 'shared/config/router';
import { CustomRouter } from 'shared/config/router';

export const useNavigateOnNextStep = () => {
  const [isNextStepLoading, setIsNextLoading] = useState(false);

  const next = useCallback((page: RouterPages, config?: UrlObject) => {
    CustomRouter.push(page, config);
    setIsNextLoading(true);
  }, []);

  return {
    next,
    isNextStepLoading,
  };
};
