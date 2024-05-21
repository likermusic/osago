import { Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import React from 'react';

import AppStore from '../assets/AppStore.svg';
import GooglePlay from '../assets/GooglePlay.svg';
import HuaweiAppGallery from '../assets/HuaweiAppGallery.svg';

import { appStoresConstants } from './AppStores.constants';
import styles from './AppStores.module.scss';

const { Link } = Typography;

export const AppStores = () => {
  const isMobile = useIsMobile();

  return (
    <Space
      justify={isMobile ? 'center' : 'space-between'}
      size={12}
      wrap={isMobile}
    >
      <Link
        href={appStoresConstants.appStore}
        target="_blank"
        className={styles.link}
      >
        <AppStore />
      </Link>

      <Link
        href={appStoresConstants.googlePlay}
        target="_blank"
        className={styles.link}
      >
        <GooglePlay />
      </Link>

      <Link
        href={appStoresConstants.huaweiAppGallery}
        target="_blank"
        className={styles.link}
      >
        <HuaweiAppGallery />
      </Link>
    </Space>
  );
};
