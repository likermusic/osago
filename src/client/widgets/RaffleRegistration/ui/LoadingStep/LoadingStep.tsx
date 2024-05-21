import { Space, Spinner } from '@sravni/react-design-system';

import styles from './LoadingStep.module.scss';

export const LoadingStep = () => (
  <Space
    className={styles.wrapper}
    justify="center"
    align="center"
  >
    <Spinner size={28} />
  </Space>
);
