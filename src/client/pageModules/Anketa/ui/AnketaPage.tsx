import { Card, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import { useAppSelector } from 'shared/lib/redux';
import { usePrefetchNextPages } from 'shared/lib/usePrefetchNextPages';
import { useReplaceUrlQuery } from 'shared/lib/useReplaceUrlQuery';
import { NoSSR } from 'shared/ui';

import { useRestoreCalculation } from 'features/RestoreQueryFromUrl';

import { Anketa, formReadyForSendingSelector } from 'widgets/AnketaWidget';

import styles from './AnketaPage.module.scss';
import { AnketaPageTexts } from './AnketaPage.texts';

export const AnketaPage: FC = () => {
  const isSummaryReady = useAppSelector(formReadyForSendingSelector);
  const { isLoading } = useRestoreCalculation({ shouldUseStoreFirst: isSummaryReady });
  useReplaceUrlQuery();
  usePrefetchNextPages();

  const isMobile = useIsMobile();

  return (
    <div className={styles.wrapper}>
      <Typography.Heading
        level={3}
        className={styles.header}
      >
        {AnketaPageTexts.title}
      </Typography.Heading>

      <NoSSR>
        <Space direction="vertical">
          {isMobile ? (
            <Anketa isLoading={isLoading} />
          ) : (
            <Card size={24}>
              <Anketa isLoading={isLoading} />
            </Card>
          )}
        </Space>
      </NoSSR>
    </div>
  );
};
