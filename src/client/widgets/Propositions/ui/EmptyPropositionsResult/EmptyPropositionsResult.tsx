import { Button, Space } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import { collectCalculationQuery } from 'features/CollectQuery';
import { NoPropositionsBanner } from 'features/NoPropositionsBanner';
import { RestartCalculationButton } from 'features/RestartCalculation';

import { EmptyPropositionsResultTexts } from './EmptyPropositionsResult.texts';

interface IPropositionsError {
  onCheckDataBtnClick: () => void;
}

export const EmptyPropositionsResult: FC<IPropositionsError> = ({ onCheckDataBtnClick, className }) => {
  const isMobile = useIsMobile();
  return (
    <NoPropositionsBanner className={className}>
      <Space
        direction={isMobile ? 'vertical' : 'horizontal'}
        size={12}
      >
        <Button
          onClick={onCheckDataBtnClick}
          variant="primary"
        >
          {EmptyPropositionsResultTexts.btnText}
        </Button>
        <RestartCalculationButton getQuery={collectCalculationQuery} />
      </Space>
    </NoPropositionsBanner>
  );
};
