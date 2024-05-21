import { UI } from '@sravni/cosago-react-library/lib/components';
import type { IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';
import React from 'react';

import { useOptions } from '../../lib/useOptions';

export const CarEnginePower: FC<IFieldFactoryProps> = (props) => {
  const { powers } = useOptions();

  // TODO: [Os 6584] Переименовать компонент в cosago
  return (
    <UI.CarManufactureYear
      {...props}
      years={powers}
    />
  );
};
