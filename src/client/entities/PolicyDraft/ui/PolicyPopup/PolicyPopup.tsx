import { UI } from '@sravni/cosago-react-library/lib/components';
import { Spinner } from '@sravni/react-design-system';
import { useBoolean } from '@sravni/react-utils';
import React from 'react';

import styles from './PolicyPopup.module.scss';

interface PolicyPopupProps {
  policyHref: string;
  title: string;
  isVisible: boolean;
  onClose: () => void;
}

export const PolicyPopup: FC<PolicyPopupProps> = ({ policyHref, title, isVisible, onClose, children }) => {
  const [isReadyToShow, setIsReadyToShow] = useBoolean(false);

  return (
    <UI.Popup
      visible={isVisible}
      title={title}
      onClose={onClose}
      closable
      className={styles.popupPolicy}
      fullscreen
      controls={isReadyToShow ? children : undefined}
    >
      {policyHref && (
        <div className={styles.imagePolicyWrapper}>
          <img
            onLoad={setIsReadyToShow.on}
            src={policyHref}
            className={styles.imagePolicy}
            alt={title}
          />

          {!isReadyToShow && <Spinner className={styles.spinner} />}
        </div>
      )}
    </UI.Popup>
  );
};
