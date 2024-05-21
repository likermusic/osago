import { UI } from '@sravni/cosago-react-library/lib/components';
import type { IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';
import React from 'react';

import { useOptions } from '../../lib/useOptions';

export const CarModel: FC<IFieldFactoryProps> = (props) => {
  const { models } = useOptions();

  return (
    <UI.CarModel
      {...props}
      models={models}
    />
  );
};
