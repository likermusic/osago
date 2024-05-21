import { UI, Widgets } from '@sravni/cosago-react-library/lib/components';
import {
  useFormContext,
  useMobileFlowSequenceControl,
  useNavigateOnEmptyFieldBeforeSubmit,
  useNavigateToErrorField,
} from '@sravni/cosago-react-library/lib/hooks';
import { Space } from '@sravni/react-design-system';
import type { FC } from 'react';
import React, { useEffect, useMemo } from 'react';

import { useAppSelector } from 'shared/lib/redux';
import { useFormTriggerWhenFormForcedOpen } from 'shared/lib/useFormTriggerWhenFormForcedOpen/useFormTriggerWhenFormForcedOpen';
import type { TCommonAdditionalFormProps } from 'shared/types';

import { shouldShowUserAgreementSelector } from 'entities/authSms';
import type { ContactsCommonFields } from 'entities/contacts';

import { useAccordionHeaderParams } from '../../lib/useAccordionHeaderParams';
import { useApplySmsCodeAuth } from '../../lib/useApplySmsCodeAuth';
import { useShowSmsCodeFieldEffect } from '../../lib/useShowSmsCodeFieldEffect';
import { AuthAlert } from '../AuthAlert/AuthAlert';

import { FormFieldsMobileSequence } from './FormBody.config';

type TContactsFormView = TCommonAdditionalFormProps & {
  isContactsFilledByEsia?: boolean;
};

type Props = Widgets.FormComponentProps<ContactsCommonFields, TContactsFormView>;

const ContactsFormView: FC<Props> = ({
  isDialog,
  onSubmit,
  NAMES,
  submitButtonText,
  FieldConstructor,
  isLoading,
  additionalProps,
}) => {
  const { setHeader, isFormForceOpened, isContactsFilledByEsia } = additionalProps || {};
  useFormTriggerWhenFormForcedOpen(isFormForceOpened);

  const shouldShowUserAgreement = useAppSelector(shouldShowUserAgreementSelector);

  const { handleFormSubmit, shouldShowSmsCode, isDisableSubmitButton, isSignInFetching, smsSubmitButtonTitle } =
    useApplySmsCodeAuth({
      smsCodeName: NAMES.smsCode,
      phoneName: NAMES.mobilePhone,
      onSubmit,
    });

  const actualFieldsSequence = useMemo(() => {
    if (shouldShowSmsCode) {
      return FormFieldsMobileSequence;
    }

    return FormFieldsMobileSequence.filter(({ fieldName }) => fieldName !== 'smsCode');
  }, [shouldShowSmsCode]);

  const controls = useMobileFlowSequenceControl(actualFieldsSequence, undefined, undefined, false);
  useShowSmsCodeFieldEffect();
  useNavigateToErrorField(!!controls.currentField);

  useNavigateOnEmptyFieldBeforeSubmit(FormFieldsMobileSequence, controls.nextField, onSubmit as (e?: unknown) => void);

  const { watch, formState } = useFormContext<ContactsCommonFields>();

  const [title, description] = useAccordionHeaderParams(watch(), false);
  useEffect(() => {
    setHeader?.({
      title,
      subtitle: description,
    });
  }, [description, setHeader, title]);

  return (
    <Widgets.FormWithMobileFlowWidget
      onSubmit={handleFormSubmit}
      controlElement={FieldConstructor}
      mobileFlowTitle=""
      isDialog={isDialog}
      isLoading={isLoading || isSignInFetching}
      mobileFlowControls={{
        ...controls,
        nextField: () => {
          controls.nextField();
          // если форма валидная и шаг смсКода, то полностью сабмитим ее
          controls.currentField?.fieldName === 'smsCode' && formState.isValid && handleFormSubmit();
        },
      }}
      submitButtonText={smsSubmitButtonTitle ?? submitButtonText}
      isSubmitDisabled={isDisableSubmitButton}
    >
      <UI.Form.Block>
        <UI.Form.Row colWidths={[12]}>
          <Space
            direction="vertical"
            size={4}
          >
            <Widgets.AuthenticationESIAFilledAlert isActive={!!isContactsFilledByEsia} />
            <AuthAlert />
          </Space>
        </UI.Form.Row>

        <UI.Form.Row>
          <FieldConstructor type={NAMES.email} />

          <FieldConstructor type={NAMES.mobilePhone} />

          {shouldShowSmsCode && <FieldConstructor type={NAMES.smsCode} />}
        </UI.Form.Row>

        {shouldShowUserAgreement && (
          <UI.Form.Block>
            <FieldConstructor
              type={NAMES.userAgreement}
              className="h-mt-8"
            />
          </UI.Form.Block>
        )}
      </UI.Form.Block>
    </Widgets.FormWithMobileFlowWidget>
  );
};

export const ContactsFormViewHoc = Widgets.formProviderHOC<ContactsCommonFields, TContactsFormView>(ContactsFormView);
