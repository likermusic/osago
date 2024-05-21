import { Typography } from '@sravni/react-design-system';
import React from 'react';

import { ExternalLinkIcon } from '../../assets/ExternalLinkIcon';
import { Links } from '../../configs';
import { Card } from '../Card';
import { LinkListItem } from '../LinkListItem';

import { KeepCalmStepTexts } from './KeepCalmStep.texts';

const { Text, Link } = Typography;

interface IKeepCalm {
  isMobile: boolean;
}

export const KeepCalmStep: FC<IKeepCalm> = ({ isMobile }) => (
  <Card
    isMobile={isMobile}
    stepNumber={KeepCalmStepTexts.stepNumber}
    title={KeepCalmStepTexts.title}
    subtitle={KeepCalmStepTexts.subtitle}
  >
    <LinkListItem icon={<ExternalLinkIcon />}>
      <Text>
        <Link
          href={Links.checkPolicyLink}
          target="_blank"
        >
          {KeepCalmStepTexts.text.link}
        </Link>
        {KeepCalmStepTexts.text.text}
      </Text>
    </LinkListItem>
  </Card>
);
