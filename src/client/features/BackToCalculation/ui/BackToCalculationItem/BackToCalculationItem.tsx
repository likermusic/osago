import { Typography, Card } from '@sravni/react-design-system';
import type { CardProps } from '@sravni/react-design-system/dist/types/components/Card';
import cn from 'classnames';
import React from 'react';

import type { IPreviousCalculations } from 'entities/previousCalculations';

import { getPrice } from '../../lib/getPrice';

import styles from './BackToCalculationItem.module.scss';
import { BackToCalculationItemTexts } from './BackToCalculationItem.texts';

const { Text } = Typography;

interface BackToCalculationItemProps {
  calculation: IPreviousCalculations;
  onClick: (calcHash: string, regNumber: Nullable<string>) => void;
  color?: CardProps['color'];
}

export const BackToCalculationItem: FC<BackToCalculationItemProps> = ({ calculation, onClick, color }) => (
  <Card
    className={cn(styles.container, styles.calculation)}
    onClick={() => onClick(calculation.calculationHash, calculation.regNumber)}
    key={calculation.calculationHash}
    color={color}
  >
    <div className={styles.textContainer}>
      <Text
        className="h-color-D100"
        size={14}
        strong
      >
        {calculation.auto}
      </Text>
      <Text
        className="h-color-D60"
        size={12}
        nowrap
      >
        {!!calculation.minPrice && `${getPrice(calculation.minPrice)}. `}
        <span className="h-color-B100">{BackToCalculationItemTexts.backLink}</span>
      </Text>
    </div>
  </Card>
);
