import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import { Alert, Typography } from '@sravni/react-design-system';
import { useEffect } from 'react';

import { sendEventShowCategoryAlert } from 'shared/lib/sendGAEvents';

import type { CarInfoCommonFields } from 'entities/carInfo';

import { getCategoryAlertTitle } from './CategoryTypeAlert.texts';

export const CategoryTypeAlert = () => {
  const { watch } = useFormContext<CarInfoCommonFields>();
  const category = watch('category');

  useEffect(() => {
    category?.value && sendEventShowCategoryAlert(category?.value as string, !!category?.data?.isPrefilled);
  }, [category?.data?.isPrefilled, category?.value]);

  return (
    <Alert
      color="blue"
      variant="primary"
      subtitle={<Typography.Text>{getCategoryAlertTitle(category?.value as string)}</Typography.Text>}
    />
  );
};
