import { Widgets } from '@sravni/cosago-react-library/lib/components';
import type { ThemeNames } from '@sravni/design-system-theme';
import Head from 'next/head';

import { useAppSelector } from 'shared/lib/redux';

import { isWLSelector, whiteLabelThemeSelector } from 'entities/whiteLabels';

import { parseThemePalette } from '../lib';

import { AD_BLOCK_DETECTOR_SCRIPT_CDN, IFRAME_RESIZER_SCRIPT_CDN } from './SiteFlowWrapper.config';

interface IWLContentProps {
  dataThemeName: ThemeNames;
  children: Nullable<JSX.Element>;
}

export const SiteFlowWrapper: FC<IWLContentProps> = ({ children, dataThemeName }) => {
  const isWl = useAppSelector(isWLSelector);
  const themePalette = useAppSelector(whiteLabelThemeSelector);

  if (isWl) {
    return (
      <>
        <Head>
          <script src={AD_BLOCK_DETECTOR_SCRIPT_CDN} />
          <script src={IFRAME_RESIZER_SCRIPT_CDN} />
        </Head>

        {children}

        <Widgets.WLThemeStylesWidget
          dataThemeName={dataThemeName}
          // TODO: убрать игнор после мерджа в мастер https://github.com/sravni/osagoinsurance-frontend/pull/484
          // @ts-ignore*
          colors={parseThemePalette(themePalette)}
        />
      </>
    );
  }

  return children;
};
