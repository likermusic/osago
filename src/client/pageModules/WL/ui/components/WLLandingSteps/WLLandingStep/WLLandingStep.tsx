import { Space, Typography } from '@sravni/react-design-system';
import { useIsPhone } from '@sravni/react-utils';
import cn from 'classnames';

import styles from './WLLandingStep.module.scss';

interface IWLLandingSteps {
  text: string;
}
export const WLLandingStep: FC<IWLLandingSteps> = ({ text, children, className }) => {
  const isPhone = useIsPhone();

  return (
    <Space
      direction={isPhone ? 'horizontal' : 'vertical'}
      justify={isPhone ? 'start' : 'space-between'}
      align="center"
      className={cn(className, styles.cardWrapper)}
      key={text}
      size={12}
    >
      {children}

      <Typography.Text
        size={isPhone ? 14 : 16}
        strong
        className={cn(styles.text, { 'h-text-center': !isPhone })}
      >
        {text}
      </Typography.Text>
    </Space>
  );
};
