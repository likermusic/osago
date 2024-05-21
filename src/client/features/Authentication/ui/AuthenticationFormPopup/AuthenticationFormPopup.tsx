import { UI } from '@sravni/cosago-react-library/lib/components';

import { AuthenticationFormWithDefaults } from '../AuthenticationForm';

import { AuthenticationFormPopupTexts } from './AuthenticationFormPopup.texts';
import styles from './AuthenticationPopup.module.scss';

type TAuthenticationLandingFormPopup = {
  onClose?: () => void;
  onAuthenticated: () => void;
  isVisible: boolean;
  title?: string;
  subtitle?: string;
};

export const AuthenticationFormPopup: FC<TAuthenticationLandingFormPopup> = ({
  onClose,
  onAuthenticated,
  isVisible,
  title = AuthenticationFormPopupTexts.caption,
  subtitle = AuthenticationFormPopupTexts.description,
}) => (
  <UI.Popup
    visible={isVisible}
    onClose={onClose}
    closable={!!onClose}
    title={title}
    subtitle={subtitle}
    className={styles.popup}
  >
    <div className="h-text-left">
      <AuthenticationFormWithDefaults onAuthenticated={onAuthenticated} />
    </div>
  </UI.Popup>
);
