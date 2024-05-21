import { Card, Space, Badge, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import type { TStepItem } from '../../types';

import styles from './Step.module.scss';

export const Step = ({ title, text, IconComponent }: TStepItem) => {
  const isMobile = useIsMobile();
  return (
    <Card
      size={isMobile ? 16 : 24}
      className={styles.stepWrapper}
    >
      <Space
        direction="vertical"
        justify="space-between"
      >
        <Space
          direction="vertical"
          justify="space-between"
          size={8}
        >
          <Badge
            text={title}
            color="gray"
          />

          <Typography.Text size={isMobile ? 12 : 14}>{text}</Typography.Text>
        </Space>

        <IconComponent
          className={styles.icon}
          width={80}
        />
      </Space>
    </Card>
  );
};
