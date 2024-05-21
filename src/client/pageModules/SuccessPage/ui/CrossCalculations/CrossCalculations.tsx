import { Space, Typography } from '@sravni/react-design-system';
import React, { useEffect } from 'react';

import { STANDARD_POLLING_PERIOD } from 'constants/pollingPeriod';

import { CrossSalesStatuses } from 'shared/config/cross';
import { useAppSelector } from 'shared/lib/redux';
import { TimingProgressBar } from 'shared/ui/TimingProgressBar';

import { crossCalculationsSelector, useGetCrossCalculations, usePostCrossCalculations } from 'entities/cross';
import { useIsCrossSalesShown } from 'entities/cross/lib/useIsCrossSalesShown';

import { CardSkeleton } from './CardSkeleton/CardSkeleton';
import { getLoaderText } from './config';
import { CrossCalculationsTexts } from './CrossCalculations.texts';
import styles from './CrossSales.module.scss';
import { CrossSalesCard } from './CrossSalesCard';

const { Heading } = Typography;

interface CrossCalculationsProps {
  crossHash?: string | string[];
  orderHash?: string | string[];
}

export const CrossCalculations: FC<CrossCalculationsProps> = ({ crossHash, orderHash }) => {
  const crossCalculations = useAppSelector(crossCalculationsSelector);
  const isFinishPolling =
    crossCalculations?.status === CrossSalesStatuses.finished || crossCalculations?.status === CrossSalesStatuses.error;

  const [postCrossCalculations] = usePostCrossCalculations();
  const [getCrossCalculations] = useGetCrossCalculations({
    pollingInterval: isFinishPolling ? 0 : STANDARD_POLLING_PERIOD,
  });

  useEffect(() => {
    const getData = async () => {
      let actualCrossHash = crossHash || '';
      if (!actualCrossHash && orderHash) {
        const request = (await postCrossCalculations(orderHash)) as { data: { hash: string } };
        actualCrossHash = request?.data?.hash;
      }
      getCrossCalculations(actualCrossHash);
    };

    getData();
  }, [crossHash, getCrossCalculations, orderHash, postCrossCalculations]);

  const shouldShowSkeleton = crossCalculations?.status !== CrossSalesStatuses.finished;
  const isCrossSalesShown = useIsCrossSalesShown(crossCalculations);

  return (
    <>
      {isCrossSalesShown && (
        <>
          <Heading level={4}>{CrossCalculationsTexts.buyTooTitle}</Heading>

          <Space
            wrap
            className="h-mt-16 h-mb-16"
          >
            {crossCalculations?.propositions?.map((proposition) => (
              <CrossSalesCard
                key={proposition.hash}
                companyName={proposition.companyName}
                icon={proposition.icon}
                proposition={proposition}
                className={styles.cardWrapper}
              />
            ))}
            {shouldShowSkeleton && <CardSkeleton />}
          </Space>
        </>
      )}
      {isCrossSalesShown && crossCalculations?.status !== CrossSalesStatuses.finished && (
        <TimingProgressBar
          text={getLoaderText(crossCalculations?.propositions?.length ?? 0)}
          className={styles.progressBarWrapper}
        />
      )}
    </>
  );
};
