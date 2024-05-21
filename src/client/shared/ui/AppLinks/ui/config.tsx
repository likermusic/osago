import React from 'react';

import { MOBILE_STORE_LINKS } from 'shared/config/mobileStoreLinks';

import { AppStore, GooglePlay, HuaweiAppGallery } from '../assets';

export const linksArray = [
  { href: MOBILE_STORE_LINKS.appStore, icon: <AppStore /> },
  { href: MOBILE_STORE_LINKS.googlePlay, icon: <GooglePlay /> },
  { href: MOBILE_STORE_LINKS.huaweiAppGallery, icon: <HuaweiAppGallery /> },
];
