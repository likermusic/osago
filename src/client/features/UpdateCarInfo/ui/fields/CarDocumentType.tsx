import { UI } from '@sravni/cosago-react-library/lib/components';
import type { IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';
import React from 'react';

export const CarDocumentType: FC<IFieldFactoryProps> = (props) => (
  <UI.CarDocumentType
    {...props}
    // показываем стс всегда, даже если пользак не ввел номер ГРЗ
    isCarNumberValid
  />
);
