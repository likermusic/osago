import { UI } from '@sravni/cosago-react-library/lib/components';
import type { FC } from 'react';
import React from 'react';

export interface IAnketaFormPopup extends IFormPopup {
  isOpen: boolean;
  title?: string;
  FormElement: FC<IFormPopup>;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const AnketaFormPopup: FC<IAnketaFormPopup> = (props) => {
  const {
    isOpen,
    onClose,
    title = 'Проверьте данные',
    FormElement,
    isFormForceOpened,
    onFormSubmit,
    setHeader,
    subtitle,
    icon,
    isLoading,
  } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <UI.Form.EditPopup
      title={title}
      subtitle={subtitle}
      icon={icon}
      onPopupClose={onClose}
      className="h-preline"
    >
      <FormElement
        isFormForceOpened={isFormForceOpened}
        onFormSubmit={onFormSubmit}
        onClose={onClose}
        isDialog
        isLoading={isLoading}
        setHeader={setHeader}
      />
    </UI.Form.EditPopup>
  );
};
