import { Carousel, Space } from '@sravni/react-design-system';
import React from 'react';

import type { IComapny } from '../../configs';
import { CollectDocumentsStep } from '../CollectDocumentsStep';
import { KeepCalmStep } from '../KeepCalmStep';
import { ReportStep } from '../ReportStep';

import styles from './Steps.module.scss';

interface ISteps {
  isMobile: boolean;
  company: Pick<IComapny, 'phone' | 'email'>;
}

export const Steps: FC<ISteps> = ({ isMobile, company, className }) => (
  <Carousel className={styles.carousel}>
    <Space
      size={12}
      className={className}
    >
      <KeepCalmStep isMobile={isMobile} />
      <ReportStep
        isMobile={isMobile}
        phone={company.phone}
      />

      <CollectDocumentsStep
        isMobile={isMobile}
        email={company.email}
      />
    </Space>
  </Carousel>
);
