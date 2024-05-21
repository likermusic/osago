import { phoneScheme } from '@sravni/cosago-react-library/lib/validationSchemes';
import { object, mixed } from 'yup';

import type { Shape } from 'types/yup';

import type { FormFields } from '../../types';

export const authenticateFormSchema = object<Shape<FormFields>>({
  mobilePhone: phoneScheme(),
  smsCode: mixed(),
}).required();
