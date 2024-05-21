import { Dialog, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import React from 'react';

import { QrCode } from '../assets';

import styles from './AppLink.module.scss';
import { AppLinksTexts } from './AppLinks.texts';
import { linksArray } from './config';

const { Text, Link } = Typography;

interface IAppLinks {
  visible: boolean;
  handleClose: () => void;
}

export const AppLinks: FC<IAppLinks> = ({ visible, handleClose }) => {
  const isMobile = useIsMobile();

  return (
    <Dialog
      visible={visible}
      onClose={handleClose}
    >
      <Dialog.Header title={AppLinksTexts.title} />
      <Dialog.Content>
        <div className={styles.contentWrapper}>
          {!isMobile && (
            <Space
              size={16}
              className="h-mb-16"
            >
              <QrCode className={styles.qrCode} />

              <Text
                className="h-color-D100"
                size={14}
              >
                {AppLinksTexts.qrDescription}
              </Text>
            </Space>
          )}

          <Space
            justify={isMobile ? 'center' : 'space-between'}
            size={12}
            wrap={isMobile}
          >
            {linksArray.map((link) => (
              <Link
                href={link.href}
                target="_blank"
                className={styles.appLink}
                key={link.href}
              >
                {link.icon}
              </Link>
            ))}
          </Space>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
