import { UI, Widgets } from '@sravni/cosago-react-library/lib/components';
import {
  useFormContext,
  useMobileFlowSequenceControl,
  useNavigateOnEmptyFieldBeforeSubmit,
  useNavigateToErrorField,
} from '@sravni/cosago-react-library/lib/hooks';
import { Divider, Icon, Space, Tooltip } from '@sravni/react-design-system';
import { Tooltip as IconTooltip } from '@sravni/react-icons';
import type { FC } from 'react';
import { useEffect } from 'react';

import { useAppSelector } from 'shared/lib/redux';
import { sendEventDriversCarFieldsValueChange } from 'shared/lib/sendGAEvents';
import { useFormTriggerWhenFormForcedOpen } from 'shared/lib/useFormTriggerWhenFormForcedOpen/useFormTriggerWhenFormForcedOpen';

import { selectVehicleCategory, selectVehicleType } from 'entities/carInfo';
import type { UpdateDriversWithSwitchersForm } from 'entities/drivers';
import type { TSendEventType } from 'entities/people';

import { generateTitle } from '../../../lib/generateTitle';
import { handleGenerateDescription } from '../../../lib/handleGenerateDescription';
import { useCurrentFields } from '../../../lib/useCurrentFields';
import { useHandleFioSelectWithSwitchers } from '../../../lib/useHandleFioSelectWithSwitchers';
import { useSetDriverKbm } from '../../../lib/useSetDriverKbm';
import { useSubmitDrivers } from '../../../lib/useSubmitDrivers';
import { useSwitchersControl } from '../../../lib/useSwitchersControl';
import AddDriverButton from '../../AddDriverButton/AddDriverButton';
import { MultiDrive } from '../../fields';
import RemoveDriverButton from '../../RemoveDriverButton/RemoveDriverButton';
import {
  FormWithSwitchersFieldsMobileSequence,
  FormWithSwitchersFieldsMobileSequenceShort,
} from '../../UpdateDrivers.config';
import { FormFieldsWithSwitcher, IsDriverInsurerTooltipText } from '../../UpdateDrivers.texts';
import type { TDriversAdditionalFields } from '../../UpdateDrivers.types';

import styles from './FormBodyWithSwitchers.module.scss';

type Props = Widgets.FormComponentProps<UpdateDriversWithSwitchersForm, TDriversAdditionalFields>;

const DriversFormView: FC<Props> = ({
  isDialog,
  onSubmit,
  NAMES,
  submitButtonText,
  FieldConstructor,
  isLoading,
  additionalProps,
}) => {
  const { trigger, watch } = useFormContext<UpdateDriversWithSwitchersForm>();
  const {
    driverId,
    isPossibleToDeleteDriver,
    isPossibleToAddDriver,
    onAddDriver,
    onDeleteDriver,
    isFirstDriver,
    isMultidrive,
    onChangeMultiDrive,
    setHeader,
    driverIndex = 0,
    isFormForceOpened,
    isFilledByEsia,
    shouldShowDriverKbm,
  } = additionalProps || {};

  const handleSubmitDriver = useSubmitDrivers(driverId, onSubmit);
  const vehicleCategory = useAppSelector(selectVehicleCategory);

  const { shouldShowAdditionalFields } = useSwitchersControl();
  const vehicleType = useAppSelector(selectVehicleType);

  const { hasPreviousLicence, currentMobileFields } = useCurrentFields(
    shouldShowAdditionalFields
      ? FormWithSwitchersFieldsMobileSequence(vehicleCategory)
      : FormWithSwitchersFieldsMobileSequenceShort(vehicleCategory),
  );

  const controls = useMobileFlowSequenceControl(currentMobileFields, undefined, undefined, false);

  useNavigateToErrorField(!!controls.currentField);

  useFormTriggerWhenFormForcedOpen(isFormForceOpened);

  useSetDriverKbm(shouldShowDriverKbm);

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
    }
  };
  const sendAutoApplyProfileEvent: TSendEventType = (newValue, previousValue, fieldName) => {
    sendEventDriversCarFieldsValueChange({
      eventAction: 'Заполнение данных о водителе',
      fieldName: FormFieldsWithSwitcher(vehicleCategory)[fieldName as keyof UpdateDriversWithSwitchersForm],
      previousValue,
      newValue,
      driverIndex: driverIndex ?? 0,
    });
  };

  const handleFioSelect = useHandleFioSelectWithSwitchers(NAMES, sendAutoApplyProfileEvent);

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
        <Space
          className={styles.actionBtns}
          justify={isPossibleToDeleteDriver ? 'space-between' : 'end'}
        >
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

        <UI.Form.Row colWidths={[12]}>
          <Widgets.AuthenticationESIAFilledAlert isActive={!!isFilledByEsia} />
        </UI.Form.Row>

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

        {shouldShowDriverKbm ? (
          <>
            <Divider className="h-mt-16 h-mb-16" />

            <UI.Form.Row colWidths={[6]}>
              <FieldConstructor
                className={styles.switchers}
                type={NAMES.isDriverOwner}
              />
            </UI.Form.Row>

            <UI.Form.Row colWidths={[6]}>
              <Space
                size={8}
                align="center"
                direction="horizontal"
              >
                <div className={styles.switchWrapper}>
                  <FieldConstructor
                    className={styles.switchers}
                    type={NAMES.isDriverInsurer}
                  />
                </div>
                <Tooltip
                  placement="bottom"
                  content={IsDriverInsurerTooltipText}
                >
                  <Icon icon={<IconTooltip className="h-color-D30" />} />
                </Tooltip>
              </Space>
            </UI.Form.Row>
          </>
        ) : (
          <UI.Form.Row colWidths={[6, 6]}>
            <FieldConstructor
              className={styles.switchers}
              type={NAMES.isDriverOwner}
            />

            <FieldConstructor
              className={styles.switchers}
              type={NAMES.isDriverInsurer}
            />
          </UI.Form.Row>
        )}

        {shouldShowAdditionalFields && (
          <UI.Form.Row>
            <FieldConstructor type={NAMES.passportNumber} />

            <FieldConstructor type={NAMES.passportIssueDate} />
          </UI.Form.Row>
        )}

        {shouldShowAdditionalFields && (
          <UI.Form.Row colWidths={[8, 4]}>
            <FieldConstructor type={NAMES.registrationAddress} />

            <FieldConstructor type={NAMES.registrationAddressFlat} />
          </UI.Form.Row>
        )}
      </UI.Form.Block>
    </Widgets.FormWithMobileFlowWidget>
  );
};

export const DriversInfoWithSwitchersViewHoc = Widgets.formProviderHOC<
  UpdateDriversWithSwitchersForm,
  TDriversAdditionalFields
>(DriversFormView);
