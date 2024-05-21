import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { propositionCalculationsHashSelector, propositionStatusSelector } from 'entities/propositionCalculations';

// TODO: оставлено на будущее когда будем делать https://sravni-corp.atlassian.net/browse/OS-7901
export const useCompaniesVisibility = () => {
  const propositionCalculationsHash = useAppSelector(propositionCalculationsHashSelector);
  const propositionStatus = useAppSelector(propositionStatusSelector);

  const [isCompaniesVisible, setCompaniesVisible] = useState(false);

  useEffect(() => {
    if (propositionStatus === 'loading') {
      setCompaniesVisible(false);
    } else {
      setCompaniesVisible(true);
    }
  }, [propositionStatus, propositionCalculationsHash]);

  const onExpired = useCallback(() => {
    setCompaniesVisible(true);
  }, []);

  return {
    isCompaniesVisible,
    onExpired,
  };
};
