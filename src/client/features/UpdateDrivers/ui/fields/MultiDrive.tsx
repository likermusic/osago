import { RadioButton } from '@sravni/react-design-system';
import type { FC } from 'react';

import { sendEventDriversCarFieldsValueChange } from 'shared/lib/sendGAEvents';

const RadioButtonOptions = [
  { value: 0, label: 'Указать водителей' },
  { value: 1, label: 'Без ограничений' },
];

type TMultiDrive = {
  isMultiDrive?: boolean;
  onChangeMultiDrive?: (isMultiDrive: boolean) => void;
};

export const MultiDrive: FC<TMultiDrive> = ({ onChangeMultiDrive, isMultiDrive }) => {
  const onChangeHandler = (newValue: number | string) => {
    onChangeMultiDrive?.(!!newValue);

    sendEventDriversCarFieldsValueChange({
      driverIndex: 0,
      fieldName: 'Мультидрайв',
      previousValue: Number(isMultiDrive),
      newValue: Number(newValue),
      eventAction: 'Изменение данных о водителе',
    });
  };

  return (
    <RadioButton
      options={RadioButtonOptions}
      defaultValue={isMultiDrive ? 1 : 0}
      value={isMultiDrive ? 1 : 0}
      onChange={onChangeHandler}
    />
  );
};
