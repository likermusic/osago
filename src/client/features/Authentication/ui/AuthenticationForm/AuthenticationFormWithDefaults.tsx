import { identity } from 'lodash/fp';
import React from 'react';

import { DEFAULTS_FORM_DATA } from 'entities/authSms';

import type { AuthenticateFormWidgetProps } from '../../types';
import { FormFieldsText } from '../FormBody/FormBody.texts';

import { AuthenticationForm } from './AuthenticationForm';
import { AuthenticationFormFields } from './AuthenticationForm.fields';
import { authenticateFormSchema } from './AuthenticationForm.validationScheme';

export const AuthenticationFormWithDefaults: FC<AuthenticateFormWidgetProps> = ({
  onAuthenticated = identity,
  variant,
}) => (
  <AuthenticationForm
    onDataChanged={(_, type) => {
      if (type === 'fullFilled') {
        onAuthenticated();
      }
    }}
    defaultData={DEFAULTS_FORM_DATA}
    additionalProps={{ variant }}
    formFieldsControls={AuthenticationFormFields}
    formLabels={FormFieldsText}
    validationSchema={authenticateFormSchema}
  />
);
