import { Space } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import { useAppSelector } from 'shared/lib/redux';
import { sendEventRaffleBanner } from 'shared/lib/sendGAEvents';
import { TimingProgressBar } from 'shared/ui/TimingProgressBar';

import type { TMarketingInfoBanner } from 'entities/MarketingInfo';
import {
  isPropositionEmptySelector,
  propositionCalculationsSelector,
  PropositionCardLoading,
  propositionStatusSelector,
} from 'entities/propositionCalculations';

import { RaffleBanner } from 'features/RaffleBanner';

import { useGetTitleBasedOnCompaniesAmount } from '../../lib/useGetTitleBasedOnCompaniesAmount';
import { useSendEventPropositionAlerts } from '../../lib/useSendEventPropositionAlerts';
import { EmptyPropositionsResult } from '../EmptyPropositionsResult';
import { PropositionsError } from '../PropositionsError';
import { PropositionsSuccessList } from '../PropositionsSuccessList';

import styles from './Proposition.module.scss';
import { PropostionTexts } from './Propostion.texts';

export interface IPropositionProps {
  test?: string;
  banners: TMarketingInfoBanner[];
  onCheckDataBtnClick: () => void;
}

export const Proposition: FC<IPropositionProps> = ({ className, onCheckDataBtnClick }) => {
  const propositionStatus = useAppSelector(propositionStatusSelector);
  const isPropositionEmpty = useAppSelector(isPropositionEmptySelector);
  const propositionCalculationsData = useAppSelector(propositionCalculationsSelector);
  const { progressBarTitle } = useGetTitleBasedOnCompaniesAmount(propositionCalculationsData);

  useSendEventPropositionAlerts(propositionCalculationsData);
  const isMobile = useIsMobile();

  if (propositionStatus === 'empty' || (propositionStatus === 'error' && isPropositionEmpty)) {
    return (
      <EmptyPropositionsResult
        onCheckDataBtnClick={onCheckDataBtnClick}
        className={styles.error}
      />
    );
  }
  const contentGap = isMobile ? 24 : 40;

  return (
    <div className={className}>
      <RaffleBanner
        config={PropostionTexts}
        onBtnClick={() => sendEventRaffleBanner({ place: 'Расчет', actionType: 'Подробнее' })}
        variant="infoModal"
        className={isMobile ? 'h-ml-16 h-mr-16 h-mb-40' : 'h-mb-40'}
      />

      <Space
        justify="space-between"
        direction="vertical"
        size={isMobile ? 24 : 40}
        className={isMobile ? 'h-pl-16 h-pr-16' : ''}
      >
        <Space
          justify="space-between"
          direction="vertical"
          size={isPropositionEmpty ? 0 : contentGap}
        >
          <PropositionsSuccessList />

          {(propositionStatus === 'loading' || propositionStatus === 'initial') && <PropositionCardLoading />}

          {propositionStatus === 'error' && <PropositionsError />}

          {propositionStatus === 'loading' && (
            <TimingProgressBar
              text={progressBarTitle}
              className={styles.progressBarWrapper}
            />
          )}
        </Space>
      </Space>
    </div>
  );
};
