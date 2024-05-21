import type { ReactNode } from 'react';

import { SmsCode } from 'entities/authSms';

import type { FormFields } from '../../types';
import { PhoneNumber } from '../fields/PhoneNumber';

export const AuthenticationFormFields: Record<keyof FormFields, ReactNode> = {
  mobilePhone: PhoneNumber,
  smsCode: SmsCode,
};
