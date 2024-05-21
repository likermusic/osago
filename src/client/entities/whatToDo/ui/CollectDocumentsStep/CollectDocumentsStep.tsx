import { Space, Typography } from '@sravni/react-design-system';
import { Download, Email } from '@sravni/react-icons';
import React from 'react';

import { Links } from '../../configs';
import { Card } from '../Card';
import { LinkListItem } from '../LinkListItem';

import { CollectDocumentsStepTexts } from './CollectDocumentsStep.texts';

const { Text, Link } = Typography;

interface IKeepCalm {
  isMobile: boolean;
  email?: string;
}

export const CollectDocumentsStep: FC<IKeepCalm> = ({ isMobile, email }) => (
  <Card
    isMobile={isMobile}
    stepNumber={CollectDocumentsStepTexts.stepNumber}
    title={CollectDocumentsStepTexts.title}
    subtitle={CollectDocumentsStepTexts.subtitle}
  >
    <Space
      direction="vertical"
      size={16}
    >
      <LinkListItem icon={<Download />}>
        <Text>
          <Link
            href={Links.paymentApplicationLink}
            target="_blank"
          >
            {CollectDocumentsStepTexts.text1.link}
          </Link>
          {CollectDocumentsStepTexts.text1.text}
        </Text>
      </LinkListItem>
      <LinkListItem icon={<Email />}>
        <Text>
          {email ? CollectDocumentsStepTexts.text2.text : CollectDocumentsStepTexts.text2.noEmailtext}
          {email && (
            <Link
              href={`mailto:${email}`}
              target="_blank"
            >
              {email}
            </Link>
          )}
        </Text>
      </LinkListItem>
    </Space>
  </Card>
);
