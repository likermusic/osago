import { Documents } from '@sravni/cosago-react-library/lib/constants';
import { useFormContext, useIsMobileOnly } from '@sravni/cosago-react-library/lib/hooks';
import { useCallback } from 'react';

import { checkAndReturnStringIfObjectHasLabelOrValue, sendEventCarFieldsValueChange } from 'shared/lib';
import { useAppSelector } from 'shared/lib/redux';
import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents';

import type { CarInfoCommonFields } from 'entities/carInfo';
import { selectVehicleType } from 'entities/carInfo';

import type { TFormFields } from '../ui/CarInfo.texts';
import { FormFields } from '../ui/CarInfo.texts';

import { mapFieldsWithEnumToEventFieldName } from './mapFieldsWithEnumToAnaliticsFieldName';
import { usePrefillCarInfo } from './usePrefillCarInfo';

export const useUpdateCarNumberField = (
  carNumberFieldName: keyof Pick<CarInfoCommonFields, 'carNumber'>,
  shouldTryRestoreDataFromLocalStorage: boolean,
) => {
  const { reset, getValues, getFieldState } = useFormContext<CarInfoCommonFields>();
  const isCarNumberDirty = getFieldState(carNumberFieldName).isDirty;
  const isDocumentNeedReset = getValues('carNumber')?.length === 0 && isCarNumberDirty;
  const sendAnalyticsEvent = useGetSendAnalytics();
  const vehicleType = useAppSelector(selectVehicleType);

  const onUpdateCarInfoData = (mappedData: CarInfoCommonFields) => {
    const prevValues = getValues();

    // обнуляем форму с новыми данными полученными из автоинфо
    reset(mappedData);
    const currentValues = getValues();

    sendAnalyticsEvent('osago_contact_step1_data');
    sendAnalyticsEvent('osago_contact_step1_get_car_info');

    mappedData &&
      Object.keys(mappedData).forEach((fieldName) => {
        const field = fieldName as keyof CarInfoCommonFields;
        const previousValue = mapFieldsWithEnumToEventFieldName(
          fieldName,
          checkAndReturnStringIfObjectHasLabelOrValue(prevValues[field]),
        );
        const newValue = mapFieldsWithEnumToEventFieldName(
          fieldName,
          checkAndReturnStringIfObjectHasLabelOrValue(currentValues[field]),
        );

        if (previousValue !== newValue && (previousValue || newValue)) {
          sendEventCarFieldsValueChange({
            eventAction: 'Заполнение данных о ТС',
            // евент не знает о типе fieldName поэтому нужен as
            fieldName: FormFields(vehicleType)[fieldName as TFormFields],
            previousValue: String(previousValue),
            newValue: String(newValue),
          });
        }
      });
  };
  const { isCarInfoLoading, prefillFieldsByCarNumber } = usePrefillCarInfo(
    carNumberFieldName,
    onUpdateCarInfoData,
    shouldTryRestoreDataFromLocalStorage,
  );

  /**
   * Если номер машины очистился - стираем данные из документов,
   * потому что скорее всего пользователь будет вводить другую машину
   * */
  const handleResetDocumentForEmptyCarNumber = useCallback(() => {
    const prevValues = getValues();
    reset({
      ...prevValues,
      documentNumber: '',
      carVinNumber: '',
      bodyNumber: '',
      chassisNumber: '',
      documentType: Documents.ECarDocumentType.PTS,
    });
  }, [getValues, reset]);

  const isMobile = useIsMobileOnly();

  const runUpdateCarNumberOnBlur = useCallback(() => {
    if (!isMobile) {
      if (isDocumentNeedReset) {
        handleResetDocumentForEmptyCarNumber();
        return;
      }
      // блокируем блар для десктопного поля в мобильнои отображении, чтобы небыло ложных срабатываний
      prefillFieldsByCarNumber();
    }
  }, [handleResetDocumentForEmptyCarNumber, isDocumentNeedReset, isMobile, prefillFieldsByCarNumber]);

  const runUpdateCarNumberOnMobile = useCallback(
    (nextCallback: () => void) => {
      if (!isCarNumberDirty) {
        // если пользак не менял номер - не надо перезапрашивать по нему данные
        nextCallback();
      }

      if (isDocumentNeedReset) {
        handleResetDocumentForEmptyCarNumber();
        return;
      }

      /**
       * nextCallback - колбек который перещелкивает поле фокусного режима.
       * Его будем вызывать только после того как отработал запрос на получение данных
       * тогда пользак сначала увидит красивый спиннер и потом переход к следующему полю
       * */
      prefillFieldsByCarNumber().then(nextCallback);
    },
    [handleResetDocumentForEmptyCarNumber, isCarNumberDirty, isDocumentNeedReset, prefillFieldsByCarNumber],
  );

  return {
    isCarInfoLoading,
    runUpdateCarNumberOnMobile,
    runUpdateCarNumberOnBlur,
  };
};
