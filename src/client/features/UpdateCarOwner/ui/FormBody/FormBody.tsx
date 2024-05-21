import { UI, Widgets } from '@sravni/cosago-react-library/lib/components';
import {
  useFormContext,
  useMobileFlowSequenceControl,
  useNavigateOnEmptyFieldBeforeSubmit,
  useNavigateToErrorField,
} from '@sravni/cosago-react-library/lib/hooks';
import type { FC } from 'react';
import { useEffect } from 'react';

import { sendEventCarFieldsValueChange } from 'shared/lib/sendGAEvents';
import { useFormTriggerWhenFormForcedOpen } from 'shared/lib/useFormTriggerWhenFormForcedOpen/useFormTriggerWhenFormForcedOpen';
import type { TCommonAdditionalFormProps, UserCommonFields } from 'shared/types';

import type { OwnerCommonFields } from 'entities/owner';
import type { TSendEventType } from 'entities/people';
import { useApplyProfile } from 'entities/people';

import { useAccordionHeaderParams } from '../../lib/useAccordionHeaderParams';
import { FormFieldsMobileSequence } from '../UpdateCarOwner.config';
import { FormFields } from '../UpdateCarOwner.texts';

type TUpdateOwnerFormView = TCommonAdditionalFormProps & {
  isFilledByEsia?: boolean;
};

type Props = Widgets.FormComponentProps<OwnerCommonFields, TUpdateOwnerFormView>;

const CarOwnerFormView: FC<Props> = ({
  isDialog,
  onSubmit,
  NAMES,
  submitButtonText,
  FieldConstructor,
  isLoading,
  additionalProps,
}) => {
  const { setHeader, isFormForceOpened, isFilledByEsia } = additionalProps || {};
  const controls = useMobileFlowSequenceControl(FormFieldsMobileSequence, undefined, undefined, false);
  const { watch } = useFormContext<OwnerCommonFields>();

  useNavigateToErrorField(!!controls.currentField);

  useNavigateOnEmptyFieldBeforeSubmit(FormFieldsMobileSequence, controls.nextField, onSubmit as (e?: unknown) => void);

  useFormTriggerWhenFormForcedOpen(isFormForceOpened);

  const sendAutoApplyProfileEvent: TSendEventType = (newValue, previousValue, fieldName) => {
    sendEventCarFieldsValueChange({
      eventAction: 'Заполнение данных о собственнике',
      // евент не знает о типе fieldName поэтому нужен as
      fieldName: FormFields[fieldName as keyof UserCommonFields],
      previousValue: String(previousValue),
      newValue: String(newValue),
    });
  };

  const applyProfile = useApplyProfile(sendAutoApplyProfileEvent);
  const handleFioSelect = (_action: string, fio: unknown) => applyProfile(fio as string);

  const [title, description] = useAccordionHeaderParams(watch(), false);
  useEffect(() => {
    setHeader?.({
      title,
      subtitle: description,
    });
  }, [description, setHeader, title]);

  return (
    <Widgets.FormWithMobileFlowWidget
      onSubmit={onSubmit}
      controlElement={FieldConstructor}
      mobileFlowTitle=""
      isDialog={isDialog}
      isLoading={isLoading}
      mobileFlowControls={controls}
      submitButtonText={submitButtonText}
      handleFieldAction={handleFioSelect}
    >
      <UI.Form.Block>
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
          <FieldConstructor type={NAMES.passportNumber} />

          <FieldConstructor type={NAMES.passportIssueDate} />
        </UI.Form.Row>

        <UI.Form.Row colWidths={[8, 4]}>
          <FieldConstructor type={NAMES.registrationAddress} />

          <FieldConstructor type={NAMES.registrationAddressFlat} />
        </UI.Form.Row>

        <UI.Form.Row colWidths={[8, 4]}>
          <FieldConstructor type={NAMES.policyHolder} />
        </UI.Form.Row>
      </UI.Form.Block>
    </Widgets.FormWithMobileFlowWidget>
  );
};

export const CarOwnerFormViewHoc = Widgets.formProviderHOC<OwnerCommonFields, TUpdateOwnerFormView>(CarOwnerFormView);
