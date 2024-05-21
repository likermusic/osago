import { Typography } from '@sravni/react-design-system';
import React from 'react';

import { DotList } from 'shared/ui/DotList';

interface IAccordionTitle {
  title: string;
  subtitles: string[];
}

export const AccordionTitle: FC<IAccordionTitle> = ({ title, subtitles, className }) => (
  <div className={className}>
    <Typography.Text
      size={16}
      strong
      className="h-mb-2"
    >
      {title}
    </Typography.Text>
    <DotList texts={subtitles} />
  </div>
);
