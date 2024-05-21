import { DesktopHeader, MobileHeader } from '@sravni/react-header';
import { useIsMobile } from '@sravni/react-utils';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { centersSelector, currentLocationSelector } from 'entities/locations';
import { selectSiteSettingsHeader } from 'entities/siteSettings';
import { accountSelector } from 'entities/user';

import { getFormatPathBuilder } from '../../lib/getFormatPathBuilder';

export function MainSiteHeader() {
  const domains = getConfig().publicRuntimeConfig.headerDomains;
  const { pathname, asPath } = useRouter();
  const isMobile = useIsMobile();
  const regions = useAppSelector(centersSelector);
  const currentRegion = useAppSelector(currentLocationSelector);
  const settings = useAppSelector(selectSiteSettingsHeader);
  const user = useAppSelector(accountSelector);

  const getFormatPath = getFormatPathBuilder(pathname, currentRegion.alias);

  if (isMobile) {
    return (
      <MobileHeader
        enableTheme
        domains={domains}
        serviceURL={asPath}
        regions={regions}
        currentRegion={currentRegion}
        settings={settings}
        user={user || undefined}
        formatPath={getFormatPath}
      />
    );
  }

  return (
    <DesktopHeader
      enableTheme
      domains={domains}
      serviceURL={asPath}
      regions={regions}
      currentRegion={currentRegion}
      settings={settings}
      user={user || undefined}
      formatPath={getFormatPath}
    />
  );
}
