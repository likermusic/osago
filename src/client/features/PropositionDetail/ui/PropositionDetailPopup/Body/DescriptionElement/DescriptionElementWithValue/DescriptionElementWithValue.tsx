import { Typography } from '@sravni/react-design-system';
import cn from 'classnames';
import React from 'react';

import { DescriptionElement } from '../DescriptionElement';
import type { IDescriptionElement } from '../DescriptionElement';

import styles from './DescriptionElementWithValue.module.scss';

const { Heading } = Typography;

interface IDescriptionElementWithPrice extends IDescriptionElement {
  value: string;
}

export const DescriptionElementWithValue: FC<IDescriptionElementWithPrice> = ({ value, ...props }) => (
  <DescriptionElement {...props}>
    <Heading
      className={cn({
        [styles.invisible]: !value,
      })}
      level={6}
    >
      {value}
    </Heading>
  </DescriptionElement>
);
