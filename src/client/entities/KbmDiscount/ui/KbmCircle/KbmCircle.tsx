import { Space, Typography } from '@sravni/react-design-system';
import cn from 'classnames';

import styles from './KbmCircle.module.scss';
import { KbmCircleTexts } from './KbmCircle.texts';

interface RatingProps {
  kbmValue: number;
  circumference: number;
  offset: number;
  statusBarClassName?: string;
}

export const KbmCircle: FC<RatingProps> = ({ className, statusBarClassName, kbmValue, circumference, offset }) => (
  <Space
    align="center"
    justify="center"
    className={cn(className, styles.container)}
  >
    <svg
      className={styles.circle}
      width="64"
      height="64"
      viewBox="0 0 50 50"
    >
      <circle
        className={styles.emptyBar}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="#F1F5F9"
      />
      <circle
        className={cn(styles.statusBar, statusBarClassName)}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        stroke="currentColor"
      />
    </svg>

    <Space
      className={styles.text}
      direction="vertical"
      align="center"
    >
      <Typography.Text strong>{kbmValue.toLocaleString()}</Typography.Text>
      <Typography.Text size={10}>{KbmCircleTexts.title}</Typography.Text>
    </Space>
  </Space>
);
