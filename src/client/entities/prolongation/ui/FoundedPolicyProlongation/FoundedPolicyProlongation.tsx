import { useAppSelector } from 'shared/lib/redux';

import { normalizedProlongationInfoSelector } from '../../model/prolongation.selectors';
import { FoundedPolicyProlongationCard } from '../FoundedPolicyProlongationCard/FoundedPolicyProlongationCard';

type TFoundedPolicyProlongation = {
  isAuthorized: boolean;
};

export const FoundedPolicyProlongation: FC<TFoundedPolicyProlongation> = ({ isAuthorized, className }) => {
  const prolongation = useAppSelector(normalizedProlongationInfoSelector);

  if (!prolongation) {
    return null;
  }

  return (
    <FoundedPolicyProlongationCard
      className={className}
      info={isAuthorized ? prolongation.infoAuth : prolongation.infoUnAuth}
    />
  );
};
