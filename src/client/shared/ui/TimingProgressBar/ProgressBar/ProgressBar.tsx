import { Progress, Space, Typography } from '@sravni/react-design-system';
import React from 'react';

import styles from './ProgressBar.module.scss';

const { Text } = Typography;

interface IProgressBar {
  progressPercent: number;
  text: string;
}

export const ProgressBar: FC<IProgressBar> = ({ progressPercent, text, className }) => (
  <Space
    justify="center"
    className={`${styles.progressBarContainer} ${className} h-color-L100 h-pt-16 h-pr-16 h-pb-16 h-pl-16`}
  >
    <Text
      strong
      nowrap
    >
      {text}
    </Text>

    <div className={styles.progress}>
      <Progress percent={progressPercent} />
    </div>
  </Space>
);
