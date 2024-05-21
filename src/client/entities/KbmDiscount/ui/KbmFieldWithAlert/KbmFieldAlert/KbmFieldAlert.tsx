import { Alert, Typography } from '@sravni/react-design-system';
import { useBoolean } from '@sravni/react-utils';

import { sendEventKbmFieldDefaultModalClick } from 'shared/lib/sendGAEvents';

import { DefaultKbmModal } from '../DefaultKbmModal';
import type { IKbmFieldInfo } from '../KbmFieldWithAlert.texts';

import styles from './KbmFieldAlert.module.scss';

type KbmFieldAlert = {
  alertInfo: IKbmFieldInfo['alertInfo'];
  setPreviousLicenseYes: () => void;
};

export const KbmFieldAlert: FC<KbmFieldAlert> = ({ alertInfo, setPreviousLicenseYes }) => {
  const [isModalVisible, setModalVisible] = useBoolean();
  const onPreviousLicenseClick = () => {
    setModalVisible.off();
    setPreviousLicenseYes();
  };
  if (!alertInfo) return null;

  return (
    <>
      <Alert
        color={alertInfo.color}
        className={styles.alert}
      >
        {'link' in alertInfo ? (
          <Typography.Text size={14}>
            {alertInfo.text}{' '}
            <Typography.Link
              onClick={() => {
                setModalVisible.on();
                sendEventKbmFieldDefaultModalClick();
              }}
            >
              {alertInfo.link}
            </Typography.Link>
          </Typography.Text>
        ) : (
          alertInfo.text
        )}
      </Alert>

      <DefaultKbmModal
        visible={isModalVisible}
        onClose={setModalVisible.off}
        onPreviousLicenseClick={onPreviousLicenseClick}
      />
    </>
  );
};
