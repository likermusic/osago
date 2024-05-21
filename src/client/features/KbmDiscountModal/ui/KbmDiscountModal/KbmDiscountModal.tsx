import { UI } from '@sravni/cosago-react-library/lib/components';
import { Button } from '@sravni/react-design-system';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib/redux';

import { selectVehicleType } from 'entities/carInfo';
import { driversSlice } from 'entities/drivers';

import { kbmDiscountDriversSelector, maxDriversKbmSelector } from '../../model/KbmDiscountModal.selectors';
import type { IKbmDiscountDriver } from '../../types';
import { ModalContent } from '../ModalContent/ModalContent';

import styles from './KbmDiscountModal.module.scss';
import { KbmDiscountModalTexts } from './KbmDiscountModal.texts';

interface PolicyStartDateModalProps {
  // Флаг отвечающий за отображение модального окна
  isDialogOpen: boolean;
  // Флаг указывает, что kbm отображено для мульти драйва
  isMultiDrive: boolean;
  // Функция для закрытия модального окна
  onDialogClose: () => void;
  // Вызывается для оповещения клиентского кода о том что количество водителей изменилось
  onDataChanged: () => void;
}

export const KbmDiscountModal: FC<PolicyStartDateModalProps> = ({
  isDialogOpen,
  onDialogClose,
  onDataChanged,
  isMultiDrive,
}) => {
  const dispatch = useAppDispatch();

  const initialSelectedDrivers = useAppSelector(kbmDiscountDriversSelector);
  const defaultKbm = useAppSelector(maxDriversKbmSelector);
  const vehicleType = useAppSelector(selectVehicleType);
  const [kbmDrivers, setKbmDrivers] = useState<IKbmDiscountDriver[]>(initialSelectedDrivers);

  const onApplyDriversClick = () => {
    kbmDrivers.forEach(({ keyInDrivers, isSelected }) => {
      if (!isSelected) dispatch(driversSlice.actions.removeDriver({ driverId: keyInDrivers }));
    });
    onDialogClose();
    onDataChanged();
  };

  return (
    <UI.Popup
      desktopSize="small"
      visible={isDialogOpen}
      onClose={onDialogClose}
      title={!isMultiDrive ? KbmDiscountModalTexts.title : KbmDiscountModalTexts.multiDriveTitle}
      subtitle={!isMultiDrive ? KbmDiscountModalTexts.subtitle : KbmDiscountModalTexts.multiDriveSubtitle(vehicleType)}
      controls={
        <div className={styles.buttonsWrapper}>
          <Button
            variant="primary"
            onClick={onApplyDriversClick}
          >
            {KbmDiscountModalTexts.applyButton}
          </Button>
        </div>
      }
    >
      <ModalContent
        isMultiDrive={isMultiDrive}
        defaultKmb={defaultKbm}
        className="h-text-left"
        kbmDrivers={kbmDrivers}
        setKbmDrivers={setKbmDrivers}
      />
    </UI.Popup>
  );
};
