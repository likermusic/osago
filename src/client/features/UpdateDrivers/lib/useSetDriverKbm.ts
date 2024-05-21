import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import { useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { sendEventGetKbmFieldInfo, sendEventStartGetKbmFieldInfo } from 'shared/lib/sendGAEvents';
import { sendSentryClientError } from 'shared/lib/sendSentryClientError/sendSentryClientError';

import { analyticsBaseSelector } from 'entities/appConfig';
import { selectCarInfoData } from 'entities/carInfo';
import type { DriversCommonFields } from 'entities/drivers';
import {
  FormFieldsValidationSchemaLimitedUpdateDrivers,
  getDriverWithIdByDataThunk,
  mapDriverExternal,
  updateDriverKbm,
  useLazySaltedGetDriverKbm,
  isDriversEqualOrBothUndefined,
} from 'entities/drivers';
import { getKbmFieldData } from 'entities/KbmDiscount';

export const FIELDS_FOR_KBM: Array<keyof DriversCommonFields> = [
  'birthday',
  'experienceStartDate',
  'fullName',
  'hasPreviousLicence',
  'licenceNumber',
  'prevLastName',
  'prevLicenceNumber',
];

/** Хук для получения и сеттинга данных в поле KbmFieldWithAlert */
export const useSetDriverKbm = (shouldShowDriverKbm?: boolean) => {
  const analyticsBase = useAppSelector(analyticsBaseSelector);
  const carInfo = useAppSelector(selectCarInfoData);
  const dispatch = useAppDispatch();

  const { watch, setValue } = useFormContext<DriversCommonFields>();

  const [isValid, setIsValid] = useState(true);
  const previousDriverData = useRef<DriversCommonFields>();
  const [getDriverKbmQuery, { data: kbmData, isError, isFetching }] = useLazySaltedGetDriverKbm();

  useEffect(() => {
    if (shouldShowDriverKbm) {
      setValue('kbm', getKbmFieldData(kbmData, isError, isFetching, isValid));
    }
  }, [isError, isFetching, isValid, kbmData, setValue, shouldShowDriverKbm]);

  // функция проверяет форму на валидность и если все ок, то делаем запрос за кбмом
  const tryGetDriverKbm = (data: DriversCommonFields) => {
    try {
      // валидация на правильность введенных данных про драйверу(ошибку ловим в catch)
      FormFieldsValidationSchemaLimitedUpdateDrivers(
        carInfo.category?.value === undefined ? carInfo.category?.value : carInfo.category?.value.toString(),
      ).validateSync(data);
      setIsValid(true);

      const externalDriver = mapDriverExternal(data);

      sendEventStartGetKbmFieldInfo();
      getDriverKbmQuery({ driver: externalDriver, marker: analyticsBase?.utm })
        .then((res) => res)
        .then(async (res) => {
          sendEventGetKbmFieldInfo(!!res.data?.errorMessage, res.data?.value, res.data?.errorMessage);

          // Логика в случае если пользователь засамбитил драйвера до окончания запроса
          // Ищем его в сторе и если нашли и его кбм статус 'loading', то записываем ему результат запроса
          const driver = await dispatch(getDriverWithIdByDataThunk(data));
          if (driver && driver.driverData.kbm?.status === 'loading' && res) {
            dispatch(
              updateDriverKbm({
                driverId: driver.driverId,
                kbm: getKbmFieldData(res.data, false, false, true),
              }),
            );
          }
        })
        .catch((e) => {
          sendEventGetKbmFieldInfo(true, undefined, e);
          sendSentryClientError(e, {
            message: 'Ошибка запроса на получение КБМ водителя',
            placement: 'anketa',
            driverData: externalDriver,
            level: 'log',
          });
        });
      // сюда попадаем только в случае, если валидация была не успешна, тк как у запроса свой catch стоит
    } catch (e) {
      setIsValid(false);
    }
  };

  useEffect(() => {
    if (shouldShowDriverKbm) {
      const subscription = watch((data, { name }) => {
        const newData = data as DriversCommonFields;

        // Проверяем, что измененное поле то, которое используется для получения КБМ или у нас еще нет данных по кбму
        if ((name && FIELDS_FOR_KBM.includes(name as keyof DriversCommonFields)) || !newData.kbm) {
          // Проверка, чтобы лишний раз не вызывать tryGetDriverKbm, тк текущий колбэк вызывается в rhf по поводу и без повода :)
          if (!isDriversEqualOrBothUndefined(previousDriverData.current, newData)) {
            previousDriverData.current = newData;
            tryGetDriverKbm(newData);
          }
        }
      });

      return () => subscription.unsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);
};
