import React from 'react';

import { DownloadPoliceOrDocumentsDesktop, DownloadPoliceOrDocumentsMobile } from './DownloadPoliceOrDocumentsDevices';
import type { DownloadPolicy } from './types';

interface DownloadPolicyDevices extends DownloadPolicy {
  isMobile: boolean;
}

export const DownloadPoliceOrDocuments: FC<DownloadPolicyDevices> = ({ isMobile, ...props }) =>
  isMobile ? <DownloadPoliceOrDocumentsMobile {...props} /> : <DownloadPoliceOrDocumentsDesktop {...props} />;
