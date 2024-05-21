import { UI, Widgets } from '@sravni/cosago-react-library/lib/components';
import {
  useFormContext,
  useMobileFlowSequenceControl,
  useNavigateOnEmptyFieldBeforeSubmit,
  useNavigateToErrorField,
} from '@sravni/cosago-react-library/lib/hooks';
import { Space } from '@sravni/react-design-system';
import type { FC } from 'react';
import { useEffect } from 'react';

import { useAppSelector } from 'shared/lib/redux';
import { sendEventAddDriverForm, sendEventDriversCarFieldsValueChange } from 'shared/lib/sendGAEvents';
import { useFormTriggerWhenFormForcedOpen } from 'shared/lib/useFormTriggerWhenFormForcedOpen/useFormTriggerWhenFormForcedOpen';

import { selectVehicleCategory, selectVehicleType } from 'entities/carInfo';
import type { DriversCommonFields, UpdateDriversWithSwitchersForm } from 'entities/drivers';
import type { TSendEventType } from 'entities/people';

import { generateTitle } from '../../../lib/generateTitle';
import { handleGenerateDescription } from '../../../lib/handleGenerateDescription';
import { useCurrentFields } from '../../../lib/useCurrentFields';
import { useHandleFioSelect } from '../../../lib/useHandleFioSelect';
import { useSetDriverKbm } from '../../../lib/useSetDriverKbm';
import { useSubmitDrivers } from '../../../lib/useSubmitDrivers';
import AddDriverButton from '../../AddDriverButton/AddDriverButton';
import { MultiDrive } from '../../fields';
import RemoveDriverButton from '../../RemoveDriverButton/RemoveDriverButton';
import { FormFieldsMobileSequence } from '../../UpdateDrivers.config';
import { FormFieldsWithSwitcher } from '../../UpdateDrivers.texts';
import type { TDriversAdditionalFields } from '../../UpdateDrivers.types';

type Props = Widgets.FormComponentProps<DriversCommonFields, TDriversAdditionalFields>;

const DriversFormView: FC<Props> = ({
  isDialog,
  onSubmit,
  NAMES,
  submitButtonText,
  FieldConstructor,
  isLoading,
  additionalProps,
}) => {
  const { trigger, watch } = useFormContext<DriversCommonFields>();
  const {
    driverId,
    isPossibleToDeleteDriver,
    isPossibleToAddDriver,
    onAddDriver,
    onDeleteDriver,
    isFirstDriver,
    isMultidrive,
    onChangeMultiDrive,
    driverIndex = 0,
    setHeader,
    isFormForceOpened,
    shouldShowDriverKbm,
  } = additionalProps || {};

  useSetDriverKbm(shouldShowDriverKbm);

  const handleSubmitDriver = useSubmitDrivers(driverId, onSubmit);

  const vehicleType = useAppSelector(selectVehicleType);
  const vehicleCategory = useAppSelector(selectVehicleCategory);

  const { hasPreviousLicence, currentMobileFields } = useCurrentFields(FormFieldsMobileSequence(vehicleCategory));

  useFormTriggerWhenFormForcedOpen(isFormForceOpened);

  const sendAutoApplyProfileEvent: TSendEventType = (newValue, previousValue, fieldName) => {
    sendEventDriversCarFieldsValueChange({
      eventAction: 'Заполнение данных о водителе',
      fieldName: FormFieldsWithSwitcher(vehicleCategory)[fieldName as keyof UpdateDriversWithSwitchersForm],
      previousValue,
      newValue,
      driverIndex: driverIndex ?? 0,
    });
  };

  const handleFioSelect = useHandleFioSelect(NAMES, sendAutoApplyProfileEvent);

  const controls = useMobileFlowSequenceControl(currentMobileFields, undefined, undefined, false);

  useNavigateToErrorField(!!controls.currentField);

  useNavigateOnEmptyFieldBeforeSubmit(
    currentMobileFields,
    controls.nextField,
    handleSubmitDriver as (e?: unknown) => void,
  );

  const handleAddDriverWithValidation = async () => {
    const isValid = await trigger();

    if (isValid) {
      onAddDriver?.();
      handleSubmitDriver();

      sendEventAddDriverForm(driverIndex + 1);
    }
  };

  const title = generateTitle(!!isMultidrive, watch());
  const description = handleGenerateDescription({
    driverIndex: driverIndex + 1,
    isMultiDrive: !!isMultidrive,
    birthday: watch('birthday'),
    experienceStartDate: watch('experienceStartDate'),
    shouldShowDriverKbm,
    kbm: watch('kbm.value'),
    vehicleType,
  });
  useEffect(() => {
    setHeader?.({
      title,
      subtitle: description,
    });
  }, [description, setHeader, title]);

  if (isMultidrive) {
    return null;
  }

  return (
    <Widgets.FormWithMobileFlowWidget
      onSubmit={handleSubmitDriver}
      controlElement={FieldConstructor}
      mobileFlowTitle=""
      isDialog={isDialog}
      isLoading={isLoading}
      mobileFlowControls={controls}
      submitButtonText={submitButtonText}
      handleFieldAction={handleFioSelect}
      additionalButton={
        <Space justify={isPossibleToDeleteDriver ? 'space-between' : 'end'}>
          {isPossibleToDeleteDriver && onDeleteDriver && <RemoveDriverButton onClick={onDeleteDriver} />}
          {isPossibleToAddDriver && !isDialog && <AddDriverButton onClick={handleAddDriverWithValidation} />}
        </Space>
      }
    >
      <UI.Form.Block>
        {isFirstDriver && (
          <UI.Form.Row colWidths={[12]}>
            <MultiDrive
              isMultiDrive={false}
              onChangeMultiDrive={onChangeMultiDrive}
            />
          </UI.Form.Row>
        )}

        <UI.Form.Row colWidths={[8, 4]}>
          <FieldConstructor
            type={NAMES.fullName}
            onSideActionComplete={handleFioSelect}
          />

          <FieldConstructor type={NAMES.birthday} />
        </UI.Form.Row>

        <UI.Form.Row>
          <FieldConstructor type={NAMES.licenceNumber} />

          <FieldConstructor type={NAMES.experienceStartDate} />

          <FieldConstructor type={NAMES.hasPreviousLicence} />
        </UI.Form.Row>

        {hasPreviousLicence && (
          <UI.Form.Row colWidths={[8, 4]}>
            <FieldConstructor type={NAMES.prevLastName} />

            <FieldConstructor type={NAMES.prevLicenceNumber} />
          </UI.Form.Row>
        )}

        {shouldShowDriverKbm && (
          <FieldConstructor
            isMobileFlow
            type={NAMES.kbm}
          />
        )}
      </UI.Form.Block>
    </Widgets.FormWithMobileFlowWidget>
  );
};

export const DriversInfoViewHoc = Widgets.formProviderHOC<DriversCommonFields, TDriversAdditionalFields>(
  DriversFormView,
);
