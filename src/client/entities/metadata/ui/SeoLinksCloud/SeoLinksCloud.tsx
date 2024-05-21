import { PreFooter } from '@sravni/react-pre-footer';
import { useMemo } from 'react';

import { selectors } from 'shared/lib/qa';
import { useAppSelector } from 'shared/lib/redux';

import { metadataSelector } from 'entities/metadata';

import styles from './SeoLinksCloud.module.scss';

export const SeoLinksCloud = () => {
  const metadata = useAppSelector(metadataSelector);

  const links = useMemo(() => {
    if (!metadata?.prefooter) {
      return [];
    }

    return metadata?.prefooter;
  }, [metadata?.prefooter]);

  if (!links?.length) {
    return null;
  }

  return (
    <div data-qa={selectors.seoLinksCloud}>
      <PreFooter
        columns={links.map((options) => ({
          ...options,
          links: options?.links.map(({ url, ...restOptions }) => ({
            url,
            ...restOptions,
          })),
        }))}
        className={styles.wrapper}
      />
    </div>
  );
};
