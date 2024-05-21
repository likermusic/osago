import { Alert, Space, Typography } from '@sravni/react-design-system';
import { Cross } from '@sravni/react-icons';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import { DeviceSizedCard } from 'shared/ui/DeviceSizedCard';

import { NothingFoundWithContainer } from '../NothinFoundWithContainer/NothingFoundWithContainer';

import styles from './NoPropositionsCard.module.scss';
import { NoPropositionsCardTexts } from './NoPropositionsCard.texts';

interface INoPropositionsCard {
  onClick: () => void;
}

export const NoPropositionsCard: FC<INoPropositionsCard> = ({ className, children, onClick }) => {
  const isMobile = useIsMobile();
  return (
    <DeviceSizedCard
      className={cn(styles.card, className)}
      vertical
    >
      <Alert
        color="dark"
        icon={<Cross />}
        subtitle={
          <Typography.Text
            className="h-color-D60"
            size={12}
          >
            {NoPropositionsCardTexts.alert.subtitle}
          </Typography.Text>
        }
        title={NoPropositionsCardTexts.alert.title}
      />
      <Space
        align="center"
        direction={isMobile ? 'vertical' : 'horizontal'}
        size={24}
      >
        <NothingFoundWithContainer />
        <Space
          direction="vertical"
          size={16}
        >
          <Typography.Text className={cn('h-color-D60', { 'h-text-center': isMobile })}>
            {NoPropositionsCardTexts.detail}
            <Typography.Link onClick={onClick}>{NoPropositionsCardTexts.detailLink}</Typography.Link>
          </Typography.Text>
          {children}
        </Space>
      </Space>
    </DeviceSizedCard>
  );
};
