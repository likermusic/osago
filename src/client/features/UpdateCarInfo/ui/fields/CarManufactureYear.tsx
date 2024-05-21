import { UI } from '@sravni/cosago-react-library/lib/components';
import type { IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';
import React from 'react';

import { useOptions } from '../../lib/useOptions';

export const CarManufactureYear: FC<IFieldFactoryProps> = (props) => {
  const { years } = useOptions();

  return (
    <UI.CarManufactureYear
      {...props}
      years={years}
    />
  );
};
