import { Card, Progress, Space, Typography } from '@sravni/react-design-system';
import { useIsPhone } from '@sravni/react-utils';
import cn from 'classnames';
import type { ReactNode } from 'react';

import { useTimerWithSteps } from 'shared/lib/useTimerWithSteps';

import { Timer } from '../Timer';

import styles from './BannersTimer.module.scss';

const { Heading } = Typography;

export type TContent = Array<{
  image: ReactNode;
  description: string[];
  durationInSeconds: number;
}>;

interface ITimingProgressBar {
  /* Массив данных банера */
  content: TContent;
  /* Время запуска таймера в секундах */
  timerSec?: number;
  /* Коллбек который вызывается когда таймер закончится */
  onExpired?: () => void;
  /* заголовок у таймера */
  timerTitle?: string;
  /* флаг на рендер таймера */
  isTimerVisible?: boolean;
  className?: string;
}

export const BannersWithTimer: FC<ITimingProgressBar> = (props) => {
  const isPhone = useIsPhone();

  const { content, onExpired, timerSec = 0, className, timerTitle = '', isTimerVisible = true } = props;

  const { percent, activeStep, onChangeActiveStep } = useTimerWithSteps(content, true);
  return (
    <Card className={cn(styles.card, className)}>
      {isTimerVisible && (
        <Timer
          timerSec={timerSec}
          onExpired={onExpired}
          timerTitle={timerTitle}
        />
      )}

      {content.length > 0 && (
        <div>
          <Space
            justify="center"
            size={12}
            className="h-mb-12"
          >
            {content.map(({ description }, i) => (
              <div
                key={description[0]}
                onClick={() => onChangeActiveStep(i)}
                className={styles.progressContainer}
              >
                <Progress percent={percent[i]} />
              </div>
            ))}
          </Space>

          <Space
            className={styles.descriptionContainer}
            size={24}
            align="center"
            direction={isPhone ? 'vertical' : 'horizontal'}
          >
            <div className={styles.img}>{content[activeStep].image}</div>
            <Space
              size={2}
              direction="vertical"
            >
              {content[activeStep].description.map((description) => (
                <Heading
                  key={description}
                  level={4}
                >
                  {description}
                </Heading>
              ))}
            </Space>
          </Space>
        </div>
      )}
    </Card>
  );
};
