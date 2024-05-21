import { UI, Widgets } from '@sravni/cosago-react-library/lib/components';
import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import { Button } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import React from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { selectAuthCredentials } from 'entities/authSms';
import { checkIsSmsCodeValid } from 'entities/authSms/lib';

import { useApplySmsCodeAuth } from '../../lib/useApplySmsCodeAuth';
import { useShowSmsCodeFieldEffect } from '../../lib/useShowSmsCodeFieldEffect';
import type { AuthenticateFormAdditionalProps, FormFields } from '../../types';

import styles from './AuthenticateForm.module.scss';
import { AuthenticationFormTexts } from './AuthenticationForm.texts';

type TAuthFormProps = Widgets.FormComponentProps<FormFields, AuthenticateFormAdditionalProps>;

const AuthenticateFormComponent: React.FC<TAuthFormProps> = ({
  isLoading,
  onSubmit,
  NAMES,
  FieldConstructor,
  additionalProps,
}) => {
  const { variant = 'modal' } = additionalProps || {};
  const { shouldShowSmsCode } = useAppSelector(selectAuthCredentials);
  const { watch } = useFormContext<FormFields>();
  const smsCode = watch(NAMES.smsCode);
  const isAuthBtnDisabled = !checkIsSmsCodeValid(smsCode);

  const isMobile = useIsMobile();

  const { handleFormSubmit, isSignInFetching } = useApplySmsCodeAuth({
    smsCodeName: NAMES.smsCode,
    phoneName: NAMES.mobilePhone,
    onSubmit,
    shouldUseHandleForce: true,
  });
  useShowSmsCodeFieldEffect(onSubmit);

  const SubmitFormButton = (
    <Button
      type="button"
      size={60}
      variant="primary"
      loading={isLoading || isSignInFetching}
      disabled={isAuthBtnDisabled}
      onClick={handleFormSubmit}
      block={isMobile}
    >
      {AuthenticationFormTexts.btnAuth}
    </Button>
  );

  // Вариант для пролы на лендосе(в общем там где формы)
  if (variant === 'form') {
    return (
      <form
        noValidate
        onSubmit={handleFormSubmit}
      >
        <UI.Form.Row colWidths={[4, 5, 3]}>
          <FieldConstructor
            type={NAMES.mobilePhone}
            isMobileFlow={isMobile}
          />

          {/** Два одинаковых условия, потому что иначе нужно оборачивать в фрагмент 2 элемента,
           * а в FormRow колонки выстраиваются по кол-ву чилдренов */}
          {shouldShowSmsCode && (
            <FieldConstructor
              // Исправить в задаче OS-10122
              // @ts-ignore
              shouldShowCountdownRight={!isMobile}
              type={NAMES.smsCode}
              isMobileFlow={isMobile}
            />
          )}

          {shouldShowSmsCode && SubmitFormButton}
        </UI.Form.Row>
      </form>
    );
  }

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={handleFormSubmit}
    >
      <UI.Form.Row colWidths={[12]}>
        <FieldConstructor
          type={NAMES.mobilePhone}
          isMobileFlow={isMobile}
        />
      </UI.Form.Row>

      {shouldShowSmsCode && (
        <>
          <UI.Form.Row colWidths={[12]}>
            <FieldConstructor
              type={NAMES.smsCode}
              isMobileFlow={isMobile}
            />
          </UI.Form.Row>

          {SubmitFormButton}
        </>
      )}
    </form>
  );
};

export const AuthenticationForm = Widgets.formProviderHOC<FormFields, AuthenticateFormAdditionalProps>(
  AuthenticateFormComponent,
);
