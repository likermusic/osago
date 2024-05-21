import { UI } from '@sravni/cosago-react-library/lib/components';
import type { IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';
import React from 'react';

import { useOptions } from '../../lib/useOptions';

export const CarBrand: FC<IFieldFactoryProps> = (props) => {
  const { brands } = useOptions();

  return (
    <UI.CarBrand
      {...props}
      brands={brands}
    />
  );
};
