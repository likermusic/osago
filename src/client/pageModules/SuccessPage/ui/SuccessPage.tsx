import { Card, Divider } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import React from 'react';

import { DocumentIcon, PolicyIcon } from 'shared/assets';
import { useAppSelector } from 'shared/lib/redux';
import { useSendAnalytics } from 'shared/lib/sendAnalyticsEvents';
import { sendEventRaffleBanner } from 'shared/lib/sendGAEvents';
import { PageHeader } from 'shared/ui/PageHeader';
import { PageWrapper } from 'shared/ui/PageWrapper';

import { policyLinkSelector, useLoadPolicyLink, usePurchasedPolicyInfo } from 'entities/purchasedPolicy';

import { AuthenticationPopupSuccessPage } from 'features/Authentication';
import { DownloadPoliceOrDocuments } from 'features/DownloadPoliceOrDocuments';
import { InviteFriend } from 'features/InviteFriend';
import { RaffleBanner } from 'features/RaffleBanner';

import { HeaderPageSuccessIcon } from '../assets/HeaderPageSuccessIcon';

import { getSubtitleText } from './config';
import { CrossCalculations } from './CrossCalculations';
import { PromoInfo } from './PromoInfo';
import styles from './SuccessPage.module.scss';
import { SuccessPageTexts } from './SuccessPage.texts';

interface SuccessPageProps {
  crossHash?: string | string[];
  orderHash?: string | string[];
}

export const SuccessPage = ({ orderHash, crossHash }: SuccessPageProps) => {
  const { policyInfo } = usePurchasedPolicyInfo(orderHash);
  const policy = useAppSelector(policyLinkSelector);

  useSendAnalytics('osago_contact_typ');

  useLoadPolicyLink(orderHash);

  const isMobile = useIsMobile();

  return (
    <>
      <PageWrapper>
        <PageHeader
          title={SuccessPageTexts.title}
          subtitle={getSubtitleText(policy?.policyNumber, policyInfo?.email)}
          icon={<HeaderPageSuccessIcon />}
        />

        <Card className={styles.stepsWrapper}>
          <DownloadPoliceOrDocuments
            title={SuccessPageTexts.downloadPolicy.title}
            subtitle={SuccessPageTexts.downloadPolicy.subtitle}
            isMobile={isMobile}
            hasLoaded={!!policy?.policyLink}
            href={policy?.policyLink ? policy.policyLink : '#'}
          >
            <PolicyIcon className={styles.iconColor} />
          </DownloadPoliceOrDocuments>
          <Divider />
          <DownloadPoliceOrDocuments
            title={SuccessPageTexts.downloadArchive.title}
            subtitle={SuccessPageTexts.downloadArchive.subtitle}
            isMobile={isMobile}
            hasLoaded={!!policy?.archiveLink}
            href={policy?.archiveLink ? policy.archiveLink : '#'}
          >
            <DocumentIcon className={styles.iconColor} />
          </DownloadPoliceOrDocuments>
        </Card>

        <RaffleBanner
          config={SuccessPageTexts.config}
          onLinkClick={() => sendEventRaffleBanner({ place: 'Сенкью', actionType: 'Зарегистрировать' })}
          variant="fixPosition"
        />

        <InviteFriend
          className={styles.inviteFriend}
          orderHash={orderHash}
        />

        {policyInfo?.cashBackSuccess?.map((alert) => (
          <PromoInfo
            className="h-mb-32"
            key={alert.title}
            subtitle={alert.subtitle ?? ''}
            title={alert.title ?? ''}
            withAppLinks
          />
        ))}

        <CrossCalculations
          crossHash={crossHash}
          orderHash={orderHash}
        />
      </PageWrapper>

      <AuthenticationPopupSuccessPage />
    </>
  );
};

SuccessPage.getInitialProps = async (ctx: App.ReduxAppContext): Promise<SuccessPageProps> => ({
  crossHash: ctx.query.crossHash,
  orderHash: ctx.query.orderHash,
});
