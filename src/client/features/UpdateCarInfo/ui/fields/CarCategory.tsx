import { UI } from '@sravni/cosago-react-library/lib/components';
import type { IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';
import { useEffect } from 'react';

import { sendEventShowCategoryField } from 'shared/lib/sendGAEvents';

import { useOptions } from '../../lib/useOptions';

export const CarCategory: FC<IFieldFactoryProps> = (props) => {
  const { categories } = useOptions();

  useEffect(() => {
    sendEventShowCategoryField(categories.map((category) => category.value));
    // чтобы не сыпать событиями по несколько раз
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UI.ControlledCustomSelect
      {...props}
      name="category"
      options={categories}
    />
  );
};
