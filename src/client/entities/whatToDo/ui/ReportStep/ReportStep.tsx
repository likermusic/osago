import { Typography } from '@sravni/react-design-system';
import { Phone } from '@sravni/react-icons';
import React from 'react';

import { Card } from '../Card';
import { LinkListItem } from '../LinkListItem';

import { ReportStepTexts } from './ReportStep.texts';

const { Link } = Typography;

interface IKeepCalm {
  isMobile: boolean;
  phone: string;
}

export const ReportStep: FC<IKeepCalm> = ({ isMobile, phone }) => (
  <Card
    isMobile={isMobile}
    stepNumber={ReportStepTexts.stepNumber}
    title={ReportStepTexts.title}
    subtitle={ReportStepTexts.subtitle}
  >
    <LinkListItem icon={<Phone />}>
      <Link href={`tel: ${phone}`}>{phone}</Link>
    </LinkListItem>
  </Card>
);
