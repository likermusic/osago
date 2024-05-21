import { Typography } from '@sravni/react-design-system';
import cn from 'classnames';
import React from 'react';

import type { TContent } from 'shared/ui/TimeLine';

import styles from './FooterTimeLine.module.scss';

const { Text } = Typography;

interface IFooterTimeLine {
  /* Версия приложения мобильная или десктопная */
  isMobile: boolean;
  /* Массив данных банера */
  content: TContent;
  /* Активный шаг таймлайна */
  activeStep: number;
}

export const FooterTimeLine: FC<IFooterTimeLine> = ({ isMobile, activeStep, content }) => {
  const footerText = content[activeStep]?.bottomText;

  if (isMobile) {
    return (
      <div className="h-mt-12 h-text-center h-color-D20">
        {footerText && (
          <Text
            size={12}
            className="h-color-D100 h-text-center"
          >
            {footerText}
          </Text>
        )}
      </div>
    );
  }

  return footerText ? (
    <Text
      size={12}
      strong
      className={cn('h-mt-16', styles.footerTextDesktop)}
    >
      {footerText}
    </Text>
  ) : null;
};
