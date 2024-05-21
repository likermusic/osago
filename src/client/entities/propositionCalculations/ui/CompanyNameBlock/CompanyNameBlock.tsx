import { Skeleton, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import type { IPropositionHeaderMain } from '../../types';

import styles from './CompanyNameBlock.module.scss';

export const CompanyNameBlock: FC<Pick<IPropositionHeaderMain, 'company'>> = ({ company }) => {
  const { companyName } = company || {};
  const isMobile = useIsMobile();

  return companyName ? (
    <Typography.Text
      size={isMobile ? 14 : 16}
      strong
      className={styles.companyName}
      nowrap
      as="p"
    >
      {companyName}
    </Typography.Text>
  ) : (
    <Skeleton.Paragraph width={100} />
  );
};
