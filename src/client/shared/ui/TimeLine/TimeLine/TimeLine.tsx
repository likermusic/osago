import { Card, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';
import React from 'react';

import { useTimerWithSteps } from 'shared/lib/useTimerWithSteps';

import { BodyTimeLine } from '../BodyTimeLine';
import { FooterTimeLine } from '../FooterTimeLine';

import styles from './TimeLine.module.scss';

const { Text } = Typography;

export type TContent = Array<{
  IconComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  description: string;
  durationInSeconds: number;
  bottomText: string;
}>;

interface ITimingProgressBar {
  /* Массив данных банера */
  content: TContent;
  /*  Сколько секунд держится каждый шаг */
  isInfinity?: boolean;
  /*  Извне можно стопнуть таймлайн когда заказ готов к оплате */
  isTimerStopped?: boolean;
}

export const TimeLine: FC<ITimingProgressBar> = ({
  content,
  isInfinity = false,
  isTimerStopped = false,
  className,
}) => {
  const { percent, activeStep } = useTimerWithSteps(content, isInfinity, isTimerStopped);
  const isMobile = useIsMobile();

  return (
    <Card
      size={16}
      className={cn(className, styles.card)}
      variant="primary"
      color="dark"
    >
      {isMobile && (
        <Text
          strong
          className="h-mb-12 h-text-center"
        >
          {content[activeStep].description}
        </Text>
      )}
      <BodyTimeLine
        isTimerStopped={isTimerStopped}
        percent={percent}
        isMobile={isMobile}
        content={content}
        activeStep={activeStep}
      />

      <FooterTimeLine
        isMobile={isMobile}
        content={content}
        activeStep={activeStep}
      />
    </Card>
  );
};
