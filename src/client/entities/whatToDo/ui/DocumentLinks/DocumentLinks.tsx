import { Button, Space, Icon } from '@sravni/react-design-system';
import { Calculations } from '@sravni/react-icons';
import React from 'react';

interface IDocumentLinks {
  documents: Array<{
    text: string;
    href: string;
  }>;
  isMobile: boolean;
}

export const DocumentLinks: FC<IDocumentLinks> = ({ documents, isMobile, className }) => (
  <Space
    size={16}
    direction={isMobile ? 'vertical' : 'horizontal'}
    className={className}
  >
    {documents.map((document) => (
      <Button
        variant="text"
        color="blue"
        key={document.href}
        onClick={() => window.open(document.href, '_blank')?.focus()}
      >
        <Icon
          icon={<Calculations />}
          color="blue"
        />
        {document.text}
      </Button>
    ))}
  </Space>
);
