import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import { Button, Space, Typography } from '@sravni/react-design-system';

import type { CarInfoCommonFields } from 'entities/carInfo';

import { FormTexts } from '../../CarInfo.texts';

import styles from './CarNumberButton.module.scss';

type TCarNumberButton = {
  isCarInfoLoading: boolean;
  handleShowCarNumberField: () => void;
};
export const CarNumberButton: FC<TCarNumberButton> = ({ isCarInfoLoading, handleShowCarNumberField }) => {
  const { getFieldState } = useFormContext<CarInfoCommonFields>();
  const error = getFieldState('carNumber').error?.message;

  return (
    <Space
      direction="vertical"
      size={0}
    >
      <Button
        variant="secondary"
        color="blue"
        size={60}
        type="button"
        block
        loading={isCarInfoLoading}
        onClick={handleShowCarNumberField}
      >
        {FormTexts.fillByNumber}
      </Button>

      {!!error && (
        <Typography.Text
          size={12}
          className={styles.errorText}
        >
          {error}
        </Typography.Text>
      )}
    </Space>
  );
};
