import { Card, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import PresentCar from 'shared/assets/icons/presentCar.svg';

import styles from './PresentBanner.module.scss';

interface IPresentBanner {
  subtitle: string;
  title: string;
}

export const PresentBanner: FC<IPresentBanner> = ({ children, title, subtitle }) => {
  const isMobile = useIsMobile();
  return (
    <Card className={styles.card}>
      <Space
        align={isMobile ? 'start' : 'center'}
        direction={isMobile ? 'vertical' : 'horizontal'}
        size={12}
      >
        <div>
          <Typography.Text
            className="h-color-L100"
            size={16}
            strong
          >
            {title}
          </Typography.Text>
          <Typography.Text className="h-color-D10 h-mt-4">{subtitle}</Typography.Text>
        </div>
        {children}
      </Space>
      <PresentCar
        className={styles.img}
        width={95}
        height={68}
      />
    </Card>
  );
};
