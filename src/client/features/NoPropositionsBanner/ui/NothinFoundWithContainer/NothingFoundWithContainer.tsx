import { Space } from '@sravni/react-design-system';

import NothingFound from 'shared/assets/icons/nothingFoung.svg';

import styles from './NothingFoundWithContainer.module.scss';

export const NothingFoundWithContainer = () => (
  <Space
    align="center"
    className={styles.pictureContainer}
    justify="center"
  >
    <NothingFound
      width={100}
      height={79}
    />
  </Space>
);
