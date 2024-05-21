import { Space } from '@sravni/react-design-system';
import type { NextPage } from 'next';

import { HeaderPageFailureIcon } from 'shared/assets/icons/HeaderPageFailureIcon';
import { usePrefetchNextPages } from 'shared/lib/usePrefetchNextPages';
import { PageHeader } from 'shared/ui/PageHeader';
import { PageWrapper } from 'shared/ui/PageWrapper';

import { FailureCard } from 'widgets/FailurePageWidget';

import { FailurePageTexts } from './FailurePage.texts';

export type IFailurePageProps = {
  orderHash: string;
};

export const FailurePage: NextPage<IFailurePageProps> = ({ orderHash }) => {
  usePrefetchNextPages();

  return (
    <PageWrapper className="h-pt-16 h-pr-16 h-pb-36 h-pl-16">
      <Space
        direction="vertical"
        size={16}
      >
        <PageHeader
          title={FailurePageTexts.title}
          icon={<HeaderPageFailureIcon />}
        />

        <FailureCard orderHash={orderHash} />
      </Space>
    </PageWrapper>
  );
};
