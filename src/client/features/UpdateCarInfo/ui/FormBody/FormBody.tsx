import { UI, Widgets } from '@sravni/cosago-react-library/lib/components';
import {
  useFormContext,
  useIsMobileOnly,
  useMobileFlowSequenceControl,
  useNavigateOnEmptyFieldBeforeSubmit,
  useNavigateToErrorField,
  useResetCarDocumentNumber,
} from '@sravni/cosago-react-library/lib/hooks';
import type { FC } from 'react';
import { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { useFormTriggerWhenFormForcedOpen } from 'shared/lib/useFormTriggerWhenFormForcedOpen/useFormTriggerWhenFormForcedOpen';
import type { TCommonAdditionalFormProps } from 'shared/types';

import {
  type CarInfoCommonFields,
  CarInfoLoadedAlert,
  carInfoSlice,
  selectShouldShowCarInfoCarNumberField,
  useCarInfoFieldsControl,
} from 'entities/carInfo';

import { useAccordionHeaderParams } from '../../lib/useAccordionHeaderParams/useAccordionHeaderParams';
import { useCategoryType } from '../../lib/useCategoryType';
import { useCurrentMobileFields } from '../../lib/useCurrentMobileFields';
import { useIsCarModificationsAvailable } from '../../lib/useIsCarModificationsAvailable';
import { useUpdateCarNumberField } from '../../lib/useUpdateCarNumberField';
import { useUpdateModificationsValue } from '../../lib/useUpdateModificationsValue';
import { useUpdateVehicleTypeBasedOnCategory } from '../../lib/useUpdateVehicleTypeBasedOnCategory';
import { CategoryTypeAlert } from '../CategoryTypeAlert/CategoryTypeAlert';
import { CarNumberButton } from '../fields';

type TCarInfoFormView = TCommonAdditionalFormProps & {
  shouldRestoreAdditionalData: boolean;
};

type Props = Widgets.FormComponentProps<CarInfoCommonFields, TCarInfoFormView>;

const CarInfoFormView: FC<Props> = ({
  isDialog,
  onSubmit,
  NAMES,
  submitButtonText,
  FieldConstructor,
  isLoading,
  additionalProps,
}) => {
  const { setHeader, isFormForceOpened, shouldRestoreAdditionalData } = additionalProps || {};

  const shouldShowCarNumber = useAppSelector(selectShouldShowCarInfoCarNumberField);
  const dispatch = useAppDispatch();
  const handleShowCarNumberField = () => {
    dispatch(carInfoSlice.actions.setShoudShowCarNumberField(true));
  };

  const isCarModificationAvailable = useIsCarModificationsAvailable();
  const currentMobileFields = useCurrentMobileFields();

  const controls = useMobileFlowSequenceControl(currentMobileFields, undefined, undefined, false);
  const isMobile = useIsMobileOnly();
  const { isCarInfoLoading, runUpdateCarNumberOnBlur, runUpdateCarNumberOnMobile } = useUpdateCarNumberField(
    NAMES.carNumber,
    // не тянем данные для саммари из локал стораджа
    !!shouldRestoreAdditionalData,
  );
  const { watch } = useFormContext<CarInfoCommonFields>();

  useFormTriggerWhenFormForcedOpen(isFormForceOpened);
  useResetCarDocumentNumber(NAMES.documentNumber, NAMES.documentType);

  useNavigateToErrorField(!!controls.currentField);

  useNavigateOnEmptyFieldBeforeSubmit(currentMobileFields, controls.nextField, onSubmit);

  useCarInfoFieldsControl();
  useUpdateModificationsValue();
  useUpdateVehicleTypeBasedOnCategory();

  const currentControls = useMemo(
    () => ({
      ...controls,
      nextField: () => {
        if (controls.currentField?.fieldName === NAMES.carNumber) {
          runUpdateCarNumberOnMobile(controls.nextField);
          return;
        }

        controls.nextField();
      },
    }),
    [controls, NAMES.carNumber, runUpdateCarNumberOnMobile],
  );

  const [title, icon, description] = useAccordionHeaderParams(watch(), false);
  useEffect(() => {
    setHeader?.({ title, icon, subtitle: description });
  }, [description, icon, setHeader, title]);

  const categoryType = useCategoryType();

  return (
    <Widgets.FormWithMobileFlowWidget
      onSubmit={onSubmit}
      controlElement={FieldConstructor}
      mobileFlowTitle=""
      isDialog={isDialog}
      isLoading={isLoading || isCarInfoLoading}
      mobileFlowControls={currentControls}
      submitButtonText={submitButtonText}
    >
      <UI.Form.Block>
        <UI.Form.Row colWidths={[12, 12]}>
          <CarInfoLoadedAlert />
          {categoryType === 'alert' && <CategoryTypeAlert />}
        </UI.Form.Row>

        <UI.Form.Row>
          {(shouldShowCarNumber || isMobile) && (
            <FieldConstructor
              type={NAMES.carNumber}
              onBlur={runUpdateCarNumberOnBlur}
              onEnterPressed={runUpdateCarNumberOnBlur}
            />
          )}

          {!isMobile && !shouldShowCarNumber && (
            <CarNumberButton
              isCarInfoLoading={isCarInfoLoading}
              handleShowCarNumberField={handleShowCarNumberField}
            />
          )}

          <FieldConstructor type={NAMES.carBrand} />

          <FieldConstructor type={NAMES.carModel} />
        </UI.Form.Row>

        <UI.Form.Row>
          <FieldConstructor type={NAMES.carManufactureYear} />

          <FieldConstructor type={NAMES.enginePower} />

          {isCarModificationAvailable && <FieldConstructor type={NAMES.carModification} />}
        </UI.Form.Row>

        <UI.Form.Row>
          <FieldConstructor type={NAMES.documentType} />

          <FieldConstructor type={NAMES.documentNumber} />

          <FieldConstructor type={NAMES.documentIssueDate} />
        </UI.Form.Row>

        <UI.Form.Row>
          <FieldConstructor type={NAMES.identifyType} />

          <FieldConstructor type={NAMES.carVinNumber} />

          {categoryType === 'field' && <FieldConstructor type={NAMES.category} />}
        </UI.Form.Row>
      </UI.Form.Block>
    </Widgets.FormWithMobileFlowWidget>
  );
};

export const CarInfoViewHoc = Widgets.formProviderHOC<CarInfoCommonFields, TCarInfoFormView>(CarInfoFormView);
