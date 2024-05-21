import { UI } from '@sravni/cosago-react-library/lib/components';
import React from 'react';

import type { FieldFactoryProps } from 'types/fieldFactory';

import { useCheckPhoneConfirm } from '../../lib/useCheckPhoneConfirm';

export const PhoneNumber: FC<FieldFactoryProps> = (props) => {
  const { isPhoneConfirmed } = useCheckPhoneConfirm();
  return (
    <UI.PhoneNumber
      {...props}
      isPhoneConfirmed={isPhoneConfirmed}
      smsCodeFieldName="smsCode"
    />
  );
};
