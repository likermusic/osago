import { Skeleton, Space } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import { CompanyLogo } from 'shared/ui/CompanyLogo';
import { DeviceSizedCard } from 'shared/ui/DeviceSizedCard';

import type { IPropositionCardLoading } from '../../types';

import styles from './PropositionCardLoading.module.scss';

export const PropositionCardLoading: FC<IPropositionCardLoading> = ({ companyName, logoLink }) => {
  const isMobile = useIsMobile();

  const Advantage = (
    <Space
      direction="vertical"
      size={4}
    >
      <Skeleton.Paragraph width={60} />
      <Skeleton.Paragraph width={80} />
    </Space>
  );

  const Advantages = (
    <Space size={32}>
      {Advantage}
      {Advantage}
      {Advantage}
    </Space>
  );

  const Company =
    companyName && logoLink ? (
      <CompanyLogo
        className={styles.companyInfo}
        companyName={companyName}
        companyIconUrl={logoLink}
      />
    ) : (
      <Space
        align="center"
        size={12}
      >
        <Skeleton.Avatar />
        <Skeleton.Paragraph width={30} />
      </Space>
    );

  const Price = <Skeleton.Paragraph width={24} />;

  const PriceBtnBlock = (
    <Space
      align="center"
      justify="end"
      size={12}
    >
      {Price}
      <Skeleton.Button />
      <Skeleton.Avatar />
    </Space>
  );

  return (
    <DeviceSizedCard
      className={styles.card}
      vertical
    >
      <Skeleton className={styles.skeleton}>
        {isMobile ? (
          <>
            <Space align="center">
              {Company}
              {Price}
            </Space>
            {Advantages}
            <Space
              justify="space-between"
              size={16}
            >
              <Skeleton.Button className={styles.growBtn} />
              <Skeleton.Button className={styles.growBtn} />
            </Space>
          </>
        ) : (
          <>
            {Company}
            {Advantages}
            {PriceBtnBlock}
          </>
        )}
      </Skeleton>
    </DeviceSizedCard>
  );
};
