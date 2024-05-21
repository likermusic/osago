import { Space, Typography } from '@sravni/react-design-system';
import { Check } from '@sravni/react-icons';
import cn from 'classnames';
import React from 'react';

import { CustomProgressBar } from 'shared/ui/CustomProgressBar/CustomProgressBar';
import { IconCenter } from 'shared/ui/IconCenter';
import type { TContent } from 'shared/ui/TimeLine';

import styles from './BodyTimeLine.module.scss';

const { Text } = Typography;

interface IBodyTimeLine {
  /* Пройденное время на каждом шаге в процентном соотношении */
  percent: Record<number, number>;
  /* Версия приложения мобильная или десктопная */
  isMobile: boolean;
  /* Таймер остановился */
  isTimerStopped: boolean;
  /* Массив данных банера */
  content: TContent;
  /* Активный шаг таймлайна */
  activeStep: number;
}

export const BodyTimeLine: FC<IBodyTimeLine> = ({ percent, isMobile, activeStep, content, isTimerStopped }) => {
  const getStylesForIcon = (currentStep: number) =>
    cn({
      'h-color-D100': activeStep > currentStep,
      [styles.iconChecked]: activeStep > currentStep || isTimerStopped,
      [`${styles.iconActive} h-color-L100`]: activeStep === currentStep,
      [`${styles.icon} h-color-D100`]: activeStep !== currentStep,
      [styles.centeredIcon]: isMobile,
    });

  return (
    <Space
      justify="space-between"
      size={isMobile ? 12 : 24}
    >
      {content.map(({ IconComponent, description }, i) => (
        <Space
          key={description}
          direction={isMobile ? 'vertical' : 'column-reverse'}
          size={12}
        >
          <CustomProgressBar
            percent={percent[i]}
            backgroundColor="white"
            className={styles.progressBar}
          />
          <Space align="center">
            <IconCenter
              size={activeStep === i && isMobile ? 20 : 16}
              shape="round"
              className={getStylesForIcon(i)}
            >
              {activeStep > i || isTimerStopped ? (
                <Check />
              ) : (
                <IconComponent
                  width={20}
                  height={20}
                />
              )}
            </IconCenter>
            {!isMobile && (
              <Text
                size={12}
                className={cn('h-ml-8', { 'h-color-D20': activeStep > i })}
              >
                {description}
              </Text>
            )}
          </Space>
        </Space>
      ))}
    </Space>
  );
};
