import { CODE_LENGTH } from '@sravni/cosago-react-library/lib/validationSchemes';

export const checkIsSmsCodeValid = (smsCode?: Nullable<string>) => smsCode?.toString().trim().length === CODE_LENGTH;
