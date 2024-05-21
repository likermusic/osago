import { Icon, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile, useIsPhone } from '@sravni/react-utils';
import cn from 'classnames';

import { WLLandingStep } from './WLLandingStep/WLLandingStep';
import styles from './WLLandingSteps.module.scss';
import { WLLandingTexts } from './WLLandingSteps.texts';

export const WLLandingSteps = () => {
  const isMobile = useIsMobile();
  const isPhone = useIsPhone();

  return (
    <>
      <Typography.Heading
        level={isMobile ? 2 : 3}
        className={cn(isPhone ? 'h-mb-16' : 'h-mb-32', {
          'h-text-center': !isPhone,
        })}
      >
        {WLLandingTexts.title}
      </Typography.Heading>

      <Space
        justify="space-between"
        direction={isPhone ? 'vertical' : 'horizontal'}
        align={isPhone ? 'start' : 'center'}
        size={12}
      >
        {WLLandingTexts.steps.map(({ text, IconComponent }) => (
          <WLLandingStep
            text={text}
            key={text}
          >
            <Icon
              size={28}
              color="gray"
              className={styles.iconWrapper}
            >
              <IconComponent className={styles.icon} />
            </Icon>
          </WLLandingStep>
        ))}
      </Space>
    </>
  );
};
