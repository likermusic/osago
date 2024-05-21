import { Documents } from '@sravni/cosago-react-library/lib/constants';
import { useFormContext, useDependedFieldsValueControl } from '@sravni/cosago-react-library/lib/hooks';

import { sendEventChooseCategoryField } from 'shared/lib/sendGAEvents';

import { useGetEnginePowers, useGetManufactureYears, useGetModels, useGetModifications } from '../model/carInfo.query';
import { type CarInfoCommonFields } from '../types';

export function useCarInfoFieldsControl() {
  const { watch, setValue } = useFormContext<CarInfoCommonFields>();

  const carBrandValue = watch('carBrand');
  const carModelValue = watch('carModel');
  const carYearValue = watch('carManufactureYear');
  const category = watch('category');
  const carPowerValue = watch('enginePower');

  const [loadModels] = useGetModels();
  const [loadManufactureYears] = useGetManufactureYears();
  const [loadEngines] = useGetEnginePowers();
  const [loadModifications] = useGetModifications();

  const handleLoadEngines = () => {
    carBrandValue?.value &&
      carModelValue?.value &&
      carYearValue?.value &&
      loadEngines({
        brandId: carBrandValue.value,
        modelId: carModelValue.value,
        year: carYearValue.value,
      });
  };

  const handleLoadModifications = () => {
    carBrandValue?.value &&
      carModelValue?.value &&
      carYearValue?.value &&
      carPowerValue?.value &&
      loadModifications({
        brandId: carBrandValue.value,
        modelId: carModelValue.value,
        year: carYearValue.value,
        power: carPowerValue.value,
      });
  };

  useDependedFieldsValueControl<CarInfoCommonFields>({
    fieldName: 'identifyType',
    fieldsToResetOnChangeValue: [
      {
        fieldName: Documents.CarIdentifyType.VIN,
        resetTo: '',
      },
      {
        fieldName: Documents.CarIdentifyType.BodyNumber,
        resetTo: '',
      },
      {
        fieldName: Documents.CarIdentifyType.ChassisNumber,
        resetTo: '',
      },
    ],
  });

  useDependedFieldsValueControl<CarInfoCommonFields>({
    fieldName: 'carBrand',
    onValueChangeAction: [() => carBrandValue?.value && loadModels(carBrandValue.value)],
    fieldsToResetOnChangeValue: ['carModel', 'carManufactureYear', 'enginePower', 'carModification'],
  });

  useDependedFieldsValueControl<CarInfoCommonFields>({
    fieldName: 'carModel',
    onValueChangeAction: [
      () => {
        if (carModelValue?.value) {
          loadManufactureYears(carModelValue.value);
          // тк нужно сбрасывать выбранную категорию, до проверки
          setValue('category', { value: '', label: '' });
          if (carModelValue?.categories?.length === 1) {
            // сетим сразу категорию, если она всего одна и показываем только алерт в дальнейшем
            setValue('category', { value: carModelValue.categories[0], label: carModelValue.categories[0] });
          }
        }
      },
    ],
    fieldsToResetOnChangeValue: ['carManufactureYear', 'enginePower', 'carModification'],
  });

  useDependedFieldsValueControl<CarInfoCommonFields>({
    fieldName: 'carManufactureYear',
    onValueChangeAction: [handleLoadEngines],
    fieldsToResetOnChangeValue: ['enginePower', 'carModification'],
  });

  useDependedFieldsValueControl<CarInfoCommonFields>({
    fieldName: 'enginePower',
    onValueChangeAction: [handleLoadModifications],
    fieldsToResetOnChangeValue: ['carModification'],
  });

  useDependedFieldsValueControl<CarInfoCommonFields>({
    fieldName: 'category',
    onValueChangeAction: [() => sendEventChooseCategoryField(category?.value as string)],
  });
}
