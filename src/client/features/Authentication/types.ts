export type IAuthenticationForm = {
  mobilePhone: string;
  smsCode: string;
};

export type FormFields = Record<keyof IAuthenticationForm, string>;

export type AuthenticateFormWidgetProps = {
  onAuthenticated?: () => void;
  formLabels?: FormFields;
  variant?: AuthenticateFormAdditionalProps['variant'];
};

export type AuthenticateFormAdditionalProps = { variant?: 'modal' | 'form' };
