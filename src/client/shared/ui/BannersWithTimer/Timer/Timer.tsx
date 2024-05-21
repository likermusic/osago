import { Card, Space, Spinner, Typography } from '@sravni/react-design-system';
import React from 'react';

import { formatDate } from 'commonUtils/formatters';

import { useTime } from 'shared/lib/useTime';

const { Text } = Typography;

export interface ITimer {
  timerSec: number;
  onExpired?: () => void;
  timerTitle: string;
}

export const Timer: FC<ITimer> = ({ timerSec, onExpired, timerTitle }) => {
  const timer = useTime(timerSec, false, onExpired);
  const timerText = formatDate.fromSecondsToTimeMinutesAndSeconds(timer);

  return (
    <Card
      color="dark"
      size={16}
    >
      <Space
        size={12}
        align="center"
      >
        <Spinner size={28} />

        <div>
          <Text
            size={12}
            strong
          >
            {timerTitle}
          </Text>

          <Text
            size={12}
            className="h-color-D60"
          >
            {timerText}
          </Text>
        </div>
      </Space>
    </Card>
  );
};
