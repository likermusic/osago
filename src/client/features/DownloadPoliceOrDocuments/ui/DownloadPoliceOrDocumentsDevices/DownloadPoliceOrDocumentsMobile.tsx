import { Button, Space, Typography, Spinner } from '@sravni/react-design-system';
import cn from 'classnames';
import React from 'react';

import { DownloadPoliceOrDocumentsTexts } from '../DownloadPoliceOrDocuments.texts';
import { Step } from '../Step';
import type { DownloadPolicy } from '../types';

import styles from './DownloadPoliceOrDocuments.module.scss';

const { Link } = Typography;

export const DownloadPoliceOrDocumentsMobile: FC<DownloadPolicy> = ({ title, subtitle, hasLoaded, children, href }) => (
  <Space
    direction="vertical"
    size={16}
    className={styles.downloadContainer}
  >
    <Step
      title={title}
      subtitle={subtitle}
    >
      {children}
    </Step>

    {hasLoaded ? (
      <Link
        href={href}
        target="_blank"
        className={cn({ [styles.disableLink]: !hasLoaded })}
      >
        <Button
          variant="primary"
          color="gray"
          block
          disabled={!hasLoaded}
        >
          {DownloadPoliceOrDocumentsTexts.btnText}
        </Button>
      </Link>
    ) : (
      <Spinner className={styles.spinner} />
    )}
  </Space>
);
