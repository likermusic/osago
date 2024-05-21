import { Space } from '@sravni/react-design-system';
import type { CardProps } from '@sravni/react-design-system/dist/types/components/Card';
import React from 'react';

import type { IPreviousCalculations } from 'entities/previousCalculations';

import { BackToCalculationItem } from '../BackToCalculationItem';
import { BackToCalculationSkeleton } from '../BackToCalculationSkeleton/BackToCalculationSkeleton';

import styles from './BackToCalculation.module.scss';

interface IBackToCalculation {
  isMobile: boolean;
  calculations: IPreviousCalculations[];
  isLoading: boolean;
  onClick: (calcHash: string, regNumber: Nullable<string>) => void;
  color?: CardProps['color'];
}

export const BackToCalculation: FC<IBackToCalculation> = ({ calculations, isMobile, isLoading, onClick, color }) =>
  calculations.length > 0 || isLoading ? (
    <Space
      className={styles.slider}
      size={12}
      wrap={!isMobile}
    >
      {calculations.map((calculation) => (
        <BackToCalculationItem
          key={calculation.calculationHash}
          calculation={calculation}
          onClick={onClick}
          color={color}
        />
      ))}
      {isLoading && <BackToCalculationSkeleton />}
    </Space>
  ) : null;
