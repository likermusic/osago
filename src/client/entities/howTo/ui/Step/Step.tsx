import { Card, Space, Badge, Typography } from '@sravni/react-design-system';

import type { StepItem } from '../types';

import styles from './Step.module.scss';

export const Step = (props: StepItem & { vehicleTypeUi: VehicleType }) => {
  const {
    title,
    stepIndex,
    icon: { width, height, IconComponent },
    vehicleTypeUi,
  } = props;

  return (
    <Card
      size={16}
      className={styles.stepWrapper}
    >
      <Space
        direction="vertical"
        justify="space-between"
        align="center"
      >
        <Space
          direction="vertical"
          justify="space-between"
          size={16}
        >
          <Badge
            text={`Шаг ${stepIndex}`}
            variant="primary"
          />

          <Typography.Heading level={5}>{typeof title === 'string' ? title : title(vehicleTypeUi)}</Typography.Heading>
        </Space>

        <IconComponent
          width={width}
          height={height}
        />
      </Space>
    </Card>
  );
};
