import { Card, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import UnExpectedError from 'shared/assets/icons/UnExpectedError.svg';

import { collectCalculationQuery } from 'features/CollectQuery';
import { RestartCalculationButton } from 'features/RestartCalculation';

import styles from './PropositionsError.module.scss';
import { PropositionsErrorTexts } from './PropositionsError.texts';

export const PropositionsError: FC = ({ className }) => {
  const isMobile = useIsMobile();

  return (
    <Card
      size={24}
      className={cn(styles.card, className)}
    >
      <UnExpectedError width={142} />

      <Space
        direction="vertical"
        justify="start"
        align={isMobile ? 'center' : 'start'}
        size={0}
      >
        <Typography.Heading
          level={4}
          className="h-mb-4 h-text-center"
        >
          {PropositionsErrorTexts.title}
        </Typography.Heading>
        <Typography.Text
          size={14}
          className="h-mb-16 h-text-center"
        >
          {PropositionsErrorTexts.subtitle}
        </Typography.Text>
        <RestartCalculationButton
          block={isMobile}
          size={isMobile ? 52 : 44}
          getQuery={collectCalculationQuery}
          btnText={PropositionsErrorTexts.btnText}
        />
      </Space>
    </Card>
  );
};
