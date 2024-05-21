import type { ICommonHeadProps } from '@sravni/next-common-head';
import { CommonHead } from '@sravni/next-common-head';
import React from 'react';
import Helmet from 'react-helmet';

type TCustomCommonHead = {
  userId?: string;
  googleTmId: string;
  withWebVisor?: boolean;
  isProduction: boolean;
};
export const CustomCommonHead: FC<TCustomCommonHead> = ({ googleTmId, isProduction, userId, withWebVisor = false }) => {
  const analyticsOptions: ICommonHeadProps['analyticsOptions'] = {
    enabled: isProduction,
    userId,
    googleTmId,
    yandexMetricsOptions: {
      webvisor: withWebVisor,
    },
  };

  return (
    <>
      <CommonHead analyticsOptions={analyticsOptions} />
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no"
        />
      </Helmet>
    </>
  );
};
