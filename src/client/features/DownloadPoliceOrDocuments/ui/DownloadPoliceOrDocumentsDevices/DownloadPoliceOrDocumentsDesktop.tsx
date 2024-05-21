import { Button, Space, Spinner, Typography } from '@sravni/react-design-system';
import cn from 'classnames';
import React from 'react';

import { DownloadPoliceOrDocumentsTexts } from '../DownloadPoliceOrDocuments.texts';
import { Step } from '../Step';
import type { DownloadPolicy } from '../types';

import styles from './DownloadPoliceOrDocuments.module.scss';

export const DownloadPoliceOrDocumentsDesktop: FC<DownloadPolicy> = ({
  title,
  subtitle,
  hasLoaded,
  children,
  href,
}) => (
  <Space
    justify="space-between"
    size={16}
    className={styles.downloadContainer}
  >
    <Step
      title={title}
      subtitle={subtitle}
    >
      {children}
    </Step>

    <Space
      size={12}
      align="center"
      justify="end"
    >
      {!hasLoaded && <Spinner />}

      <Typography.Link
        href={href}
        target="_blank"
        className={cn({ [styles.disableLink]: !hasLoaded })}
      >
        <Button
          variant="primary"
          color="gray"
          disabled={!hasLoaded}
        >
          {DownloadPoliceOrDocumentsTexts.btnText}
        </Button>
      </Typography.Link>
    </Space>
  </Space>
);
