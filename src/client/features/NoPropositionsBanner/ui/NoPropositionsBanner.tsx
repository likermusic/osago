import { useBoolean } from '@sravni/react-utils';

import { NoPropositionsCard } from './NoPropositionsCard/NoPropositionsCard';
import { NoPropositionsModal } from './NoPropositionsModal/NoPropositionsModal';

export const NoPropositionsBanner: FC = ({ className, children }) => {
  const [isVisible, setIsVisible] = useBoolean();
  return (
    <>
      <NoPropositionsCard
        className={className}
        onClick={setIsVisible.on}
      >
        {children}
      </NoPropositionsCard>
      <NoPropositionsModal
        isVisible={isVisible}
        onClose={setIsVisible.off}
      />
    </>
  );
};
