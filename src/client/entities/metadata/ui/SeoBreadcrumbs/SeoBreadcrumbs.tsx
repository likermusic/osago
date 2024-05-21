import { Breadcrumbs } from '@sravni/react-seo';
import type { FC } from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { metadataSelector } from 'entities/metadata';

export const SeoBreadcrumbs: FC = () => {
  const metadata = useAppSelector(metadataSelector);

  if (!metadata?.breadcrumbs?.length) {
    return null;
  }

  return <Breadcrumbs items={metadata.breadcrumbs} />;
};
