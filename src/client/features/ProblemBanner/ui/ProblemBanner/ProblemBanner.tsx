import { Button, Space, Typography } from '@sravni/react-design-system';
import { useIsPhone } from '@sravni/react-utils';
import cn from 'classnames';

import { useAppSelector } from 'shared/lib/redux';

import { isWLSelector } from 'entities/whiteLabels';

import CatImg from '../assets/catMaster.svg';

import styles from './ProblemBanner.module.scss';
import { ProblemBannerTexts } from './ProblemBanner.texts';

interface IBannerProps {
  onButtonClick?: () => void;
}

export const ProblemBanner: FC<IBannerProps> = ({ onButtonClick }) => {
  const isPhone = useIsPhone();
  const isWl = useAppSelector(isWLSelector);

  return (
    <Space
      direction={isPhone ? 'vertical' : 'horizontal'}
      justify={isPhone ? 'center' : 'space-between'}
      size={isPhone ? 0 : [12, 0]}
      className={cn(isPhone ? 'h-mb-32 h-mt-32 h-p-16' : 'h-p-24', styles.wrapper)}
    >
      <Space direction="vertical">
        <Typography.Heading
          level={4}
          className={styles.title}
        >
          {ProblemBannerTexts.title}
        </Typography.Heading>
        <Typography.Text
          size={14}
          className={cn(isPhone ? 'h-mb-12' : '', styles.message)}
        >
          {isWl ? ProblemBannerTexts.message.wl : ProblemBannerTexts.message.main}
        </Typography.Text>

        {!isWl && (
          <Button
            onClick={onButtonClick}
            block={isPhone}
            variant="primary"
            size={36}
            className={cn(isPhone && 'h-mb-12', 'h-pt-8 h-pb-8 h-pr-12 h-pl-12', 'h-br-8', styles.button)}
          >
            {ProblemBannerTexts.button}
          </Button>
        )}
      </Space>

      {!isWl && (
        <CatImg
          height={isPhone ? '100px' : '104px'}
          width={isPhone ? '154px' : '160px'}
          className={styles.img}
        />
      )}
    </Space>
  );
};
