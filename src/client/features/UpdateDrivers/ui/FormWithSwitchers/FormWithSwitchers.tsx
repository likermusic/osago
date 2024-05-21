import type { FC } from 'react';
import { useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { sendEventDriversCarFieldsValueChange, sendEventSubmitDriverForm } from 'shared/lib/sendGAEvents';
import { SendEventWrapper } from 'shared/lib/sendGAEvents/SendEventWrapper';
import { useCopySelectorToState } from 'shared/lib/useCopySelectorToState';

import { selectCarInfoData, selectVehicleCategory } from 'entities/carInfo';
import type { UpdateDriversWithSwitchersForm } from 'entities/drivers';
import {
  FormFieldsValidationSchemaMultiDrive,
  FormWithSwitchersFieldsValidationSchemaLimitedUpdateDrivers,
  selectIsDriverFilledByEsia,
  selectMultiDrive,
} from 'entities/drivers';
import { useLazyGetPolicyInfoFromQuery } from 'entities/PolicyInfo';

import { selectFormWithSwitcherData } from '../../lib/selectFormWithSwitcherData';
import { submitFormWithSwitcher } from '../../lib/submitFormWithSwitcher';
import { DriversInfoMultiDriveViewHoc } from '../FormBodyMultidrive';
import { FormFieldsMultiDriveControls, FormWithSwitchersFieldsControls } from '../UpdateDrivers.config';
import { FormFieldsLabelsMultiDrive, FormFieldsWithSwitcher } from '../UpdateDrivers.texts';

import { DriversInfoWithSwitchersViewHoc } from './FormBodyWithSwitchers';

interface IDriverInfoForm extends IFormPopup {
  isFirstDriver?: boolean;
  driverId: Nullable<string>;
  onAddDriver?: () => void;
  onDeleteDriver?: (driverId: string) => void;
  isPossibleToAddDriver?: boolean;
  isPossibleToDeleteDriver?: boolean;
  driverIndex: number;
  driversAmount: number;
}

export const FormWithSwitchers: FC<IDriverInfoForm> = (props) => {
  const {
    isDialog = false,
    isLoading,
    onClose,
    driverId,
    onDeleteDriver,
    onAddDriver,
    isPossibleToAddDriver,
    isPossibleToDeleteDriver,
    isFirstDriver,
    driverIndex,
    isFormForceOpened,
    setHeader,
    onFormSubmit,
    driversAmount,
    shouldShowDriverKbm,
  } = props;
  const formData = useCopySelectorToState((state) => selectFormWithSwitcherData(state, driverId));
  const carInfo = useAppSelector(selectCarInfoData);
  const isFilledByEsia = useAppSelector(selectIsDriverFilledByEsia);
  const vehicleCategory = useAppSelector(selectVehicleCategory);
  const dispatch = useAppDispatch();
  const { getPolicyInfo, isPolicyInfoLoading } = useLazyGetPolicyInfoFromQuery();
  const [isCurrentMultiDrive, setCurrentMultiDrive] = useState(useAppSelector(selectMultiDrive));

  const handleDriversInfoData = async (actualData: UpdateDriversWithSwitchersForm, type: string) => {
    if (type === 'fullFilled') {
      await dispatch(submitFormWithSwitcher(actualData, driverId, isCurrentMultiDrive, getPolicyInfo));

      !isDialog && sendEventSubmitDriverForm([driverIndex, driversAmount === driverIndex ? 'Продолжить' : 'Водитель']);

      onFormSubmit?.(actualData, isDialog);
    }
    if (isDialog) {
      onClose?.();
    }
  };

  const handleDeleteDriver = () => {
    if (driverId) {
      onDeleteDriver?.(driverId);
    }
  };

  const formLabels = useMemo(() => FormFieldsWithSwitcher(vehicleCategory), [vehicleCategory]);

  return (
    <SendEventWrapper
      sendEvent={({ fieldName, previousValue, newValue }) => {
        sendEventDriversCarFieldsValueChange({
          // евент не знает о типе fieldName поэтому нужен as
          fieldName: FormFieldsWithSwitcher(vehicleCategory)[fieldName as keyof UpdateDriversWithSwitchersForm],
          previousValue,
          newValue,
          driverIndex,
          eventAction: 'Изменение данных о водителе',
        });
      }}
    >
      {isCurrentMultiDrive && isFirstDriver && (
        <DriversInfoMultiDriveViewHoc
          additionalProps={{
            onChangeMultiDrive: setCurrentMultiDrive,
            isFormForceOpened,
          }}
          isDialog={isDialog}
          onDataChanged={(_: {}, type: string) => handleDriversInfoData(formData, type)}
          defaultData={formData}
          isLoading={isLoading || isPolicyInfoLoading}
          formFieldsControls={FormFieldsMultiDriveControls}
          formLabels={FormFieldsLabelsMultiDrive}
          validationSchema={FormFieldsValidationSchemaMultiDrive}
        />
      )}

      <DriversInfoWithSwitchersViewHoc
        additionalProps={{
          driverId,
          isFormForceOpened,
          onDeleteDriver: handleDeleteDriver,
          onAddDriver,
          isPossibleToAddDriver,
          isPossibleToDeleteDriver,
          isFirstDriver,
          onChangeMultiDrive: setCurrentMultiDrive,
          isMultidrive: isCurrentMultiDrive,
          setHeader,
          driverIndex,
          isFilledByEsia: isFilledByEsia && isFirstDriver,
          shouldShowDriverKbm,
        }}
        isLoading={isLoading || isPolicyInfoLoading}
        isDialog={isDialog}
        onDataChanged={handleDriversInfoData}
        defaultData={formData}
        validationSchema={FormWithSwitchersFieldsValidationSchemaLimitedUpdateDrivers({
          carDocumentIssueDateValue: carInfo.documentIssueDate,
          carDocumentType: carInfo.documentType,
          category:
            carInfo.category?.value === undefined ? carInfo.category?.value : carInfo.category?.value.toString(),
        })}
        formLabels={formLabels}
        formFieldsControls={FormWithSwitchersFieldsControls}
      />
    </SendEventWrapper>
  );
};
