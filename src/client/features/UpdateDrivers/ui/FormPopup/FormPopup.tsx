import { UI } from '@sravni/cosago-react-library/lib/components';
import type { FC } from 'react';

import { Form } from '../Form';
import { FormWithSwitchers } from '../FormWithSwitchers';

import { FormPopupTexts } from './FormPopup.texts';

interface IDriverInfoPopup extends IFormPopup {
  icon?: React.ReactNode;
  isOpen: boolean;
  isFirstDriver: boolean;
  multipartFormId: Nullable<string>;
  isPossibleToDeleteDriver: boolean;
  onDeleteDriver?: (driverId: string) => void;
  shouldShowSwitchers: boolean;
  driverIndex: number;
  driversAmount: number;
  title?: string;
  subtitle?: string;
  shouldShowDriverKbm?: boolean;
}

export const FormPopup: FC<IDriverInfoPopup> = (props) => {
  const {
    icon,
    isOpen,
    onClose,
    multipartFormId,
    isPossibleToDeleteDriver,
    onDeleteDriver,
    isFirstDriver,
    shouldShowSwitchers,
    driverIndex,
    setHeader,
    title,
    isFormForceOpened,
    subtitle,
    isLoading,
    onFormSubmit,
    driversAmount,
    shouldShowDriverKbm,
  } = props;

  if (!isOpen) {
    return null;
  }

  const FormToRender = shouldShowSwitchers ? FormWithSwitchers : Form;

  return (
    <UI.Form.EditPopup
      title={title || FormPopupTexts.title}
      subtitle={subtitle}
      icon={icon}
      onPopupClose={onClose}
    >
      <FormToRender
        isFormForceOpened={isFormForceOpened}
        onFormSubmit={onFormSubmit}
        isDialog
        driverId={multipartFormId}
        onClose={onClose}
        isPossibleToDeleteDriver={isPossibleToDeleteDriver}
        onDeleteDriver={onDeleteDriver}
        isFirstDriver={isFirstDriver}
        isLoading={isLoading}
        driverIndex={driverIndex}
        setHeader={setHeader}
        driversAmount={driversAmount}
        shouldShowDriverKbm={shouldShowDriverKbm}
      />
    </UI.Form.EditPopup>
  );
};
