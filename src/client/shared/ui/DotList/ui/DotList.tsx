import { Typography } from '@sravni/react-design-system';
import React from 'react';

import styles from './DotList.module.scss';

const { Text } = Typography;

interface IDotList {
  texts: string[];
}

export const DotList: FC<IDotList> = ({ texts }) => (
  <Text
    size={12}
    className="h-color-D60"
  >
    <ul className={styles.subTitleList}>
      {texts.map((string) => (
        <li
          className={styles.subTitle}
          key={string}
        >
          {string}
        </li>
      ))}
    </ul>
  </Text>
);
