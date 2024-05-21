import cn from 'classnames';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { isMobileAppRaffleSelector } from 'entities/appConfig';
import { isWLSelector } from 'entities/whiteLabels';

import { MainPageFooter } from 'widgets/Footer';
import { MainSiteHeader } from 'widgets/Header';

import { PAGES_WITHOUT_FOOTER, PAGES_WITH_WHITE_BG } from './PageWrapper.constants';
import styles from './PageWrapper.module.scss';

/** Отвечает за показ хедера и футера */
export const PageWrapper: FC = ({ children }) => {
  const nextRouter = useRouter();
  const isWl = useAppSelector(isWLSelector);

  const isMobileAppRaffle = useAppSelector(isMobileAppRaffleSelector);

  const isWhiteBg = useMemo(() => PAGES_WITH_WHITE_BG.includes(nextRouter.pathname), [nextRouter.pathname]);
  const isShowHeader = !isMobileAppRaffle && !isWl;
  const isShowFooter = useMemo(
    () => !PAGES_WITHOUT_FOOTER.includes(nextRouter.pathname) && !isMobileAppRaffle && !isWl,
    [isMobileAppRaffle, isWl, nextRouter.pathname],
  );

  return (
    <div className={cn({ [styles.whiteWrapper]: isWhiteBg })}>
      {/** TODO: Выпилить стили сверху ↑ в рамках OS-8190, ну или не выпилить если нужно)) */}
      {isShowHeader && <MainSiteHeader />}

      {children}

      {isShowFooter && (
        <div className={styles.footer}>
          <MainPageFooter />
        </div>
      )}
    </div>
  );
};
