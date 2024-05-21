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

import { sendEventCarFieldsValueChange } from 'shared/lib/sendGAEvents';
import { useFormTriggerWhenFormForcedOpen } from 'shared/lib/useFormTriggerWhenFormForcedOpen/useFormTriggerWhenFormForcedOpen';
import type { TCommonAdditionalFormProps, UserCommonFields } from 'shared/types';

import type { TSendEventType } from 'entities/people';
import { useApplyProfile } from 'entities/people';

import { useAccordionHeaderParams } from '../../lib/useAccordionHeaderParams';
import { useIsTheSameAsOwner } from '../../lib/useIsTheSameAsOwner';
import { InsurerAlert } from '../InsurerAlert/InsurerAlert';
import { FormFieldsMobileSequence } from '../UpdateInsurer.config';
import { FormFields } from '../UpdateInsurer.texts';

type TUpdateInsurerFormView = TCommonAdditionalFormProps & {
  isFilledByEsia?: boolean;
};

const InsurerFormView: FC<Widgets.FormComponentProps<UserCommonFields, TUpdateInsurerFormView>> = ({
  isDialog,
  onSubmit,
  NAMES,
  submitButtonText,
  FieldConstructor,
  isLoading,
  additionalProps,
}) => {
  const { setHeader, isFormForceOpened, isFilledByEsia } = additionalProps || {};
  const isSameAsOwner = useIsTheSameAsOwner();
  const controls = useMobileFlowSequenceControl(FormFieldsMobileSequence, undefined, undefined, false);

  useNavigateToErrorField(!!controls.currentField);

  useNavigateOnEmptyFieldBeforeSubmit(FormFieldsMobileSequence, controls.nextField, onSubmit as (e?: unknown) => void);

  useFormTriggerWhenFormForcedOpen(isFormForceOpened);

  const sendAutoApplyProfileEvent: TSendEventType = (newValue, previousValue, fieldName) => {
    sendEventCarFieldsValueChange({
      eventAction: 'Заполнение данных о страхователе',
      // евент не знает о типе fieldName поэтому нужен as
      fieldName: FormFields[fieldName as keyof UserCommonFields],
      previousValue: String(previousValue),
      newValue: String(newValue),
    });
  };

  const applyProfile = useApplyProfile(sendAutoApplyProfileEvent);
  const handleFioSelect = (_action: string, fio: unknown) => applyProfile(fio as string);

  const { watch } = useFormContext<UserCommonFields>();
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
          <Space
            direction="vertical"
            size={4}
          >
            <Widgets.AuthenticationESIAFilledAlert isActive={!!isFilledByEsia} />

            {!isSameAsOwner && <InsurerAlert />}
          </Space>
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
      </UI.Form.Block>
    </Widgets.FormWithMobileFlowWidget>
  );
};

export const InsurerFormViewHoc = Widgets.formProviderHOC<UserCommonFields, TUpdateInsurerFormView>(InsurerFormView);
