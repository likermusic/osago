import type { AnySchema } from 'yup';

import type { IFormHeader } from './IFormHeader';

export type TCommonAdditionalFormProps = {
  setHeader: (newHeader: IFormHeader) => void;
  isFormForceOpened: boolean;
  handleCrossFormValidation?: AnySchema;
  shouldShowDriverKbm?: boolean;
};
