import { Space, Spinner, Typography } from '@sravni/react-design-system';
import cn from 'classnames';
import type { NextPage } from 'next';
import React from 'react';

import { CustomRouter, redirectToLandingWithReplaceAndClearQueryParams } from 'shared/config/router';
import { useAppDispatch } from 'shared/lib/redux';
import { PageWrapper } from 'shared/ui/PageWrapper';

import { useRestoreCalculation } from 'features/RestoreQueryFromUrl';

import { runAfterCheckFormReadyThunk } from 'widgets/AnketaWidget';

import styles from './TriggerCommunicationLoaderPage.module.scss';
import { TriggerCommunicationLoaderPageTexts } from './TriggerCommunicationLoaderPage.texts';

export type IFailurePageProps = {
  orderHash: string;
};

export const TriggerCommunicationLoaderPage: NextPage<IFailurePageProps> = () => {
  const dispatch = useAppDispatch();

  useRestoreCalculation({
    successCallback: () => {
      dispatch(
        runAfterCheckFormReadyThunk((isReady) => {
          CustomRouter.push(isReady ? 'propositions' : 'anketa');
        }),
      );
    },
    errorCallback: () => {
      // дропаем ссылку, чтобы с лендоса юзера снова не кинуло на лоадер
      redirectToLandingWithReplaceAndClearQueryParams();
    },
  });

  return (
    <PageWrapper className={cn('h-pt-16 h-pr-16 h-pb-36 h-pl-16', styles.pageWrapper)}>
      <Space
        direction="vertical"
        size={40}
        align="center"
        justify="center"
        className={styles.content}
      >
        <div className={styles.loader}>
          <Spinner size={28} />
        </div>

        <Typography.Heading
          level={3}
          className="h-text-center"
        >
          {TriggerCommunicationLoaderPageTexts.title}
        </Typography.Heading>
      </Space>
    </PageWrapper>
  );
};
