import type { ContactsCommonFields } from 'entities/contacts';
import type { TFormHintsNullable } from 'entities/hintNotification';

export const FormFieldsText: Record<keyof ContactsCommonFields, string> = {
  email: 'Email для получения полиса',
  mobilePhone: 'Номер телефона',
  smsCode: 'Введите код из СМС',
  userAgreement: '',
};

export const FormBodyTexts = {
  sendOtp: 'Применить код',
};

export const userAgreementText = {
  text: 'Даю согласие на ',
  link: 'обработку персональных данных',
  mobileTitle: 'Обработка персональных данных',
};

export const FormHints: TFormHintsNullable<ContactsCommonFields, 'smsCode' | 'userAgreement'> = {
  email: {
    text: 'На эту почту, после оформления, придет письмо с самим полисом и подарки от нас',
  },
  mobilePhone: {
    text: 'На номер телефона мы направим проверочный код, а после покупки пришлем ссылку на скачивание полиса, чтобы он всегда был под рукой',
  },
  smsCode: null,
  userAgreement: null,
};
