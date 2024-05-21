import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from 'shared/lib/redux';

import type { CarNumberLandingFormFields } from 'entities/carInfo';
import { useGetPreviousCalculations } from 'entities/prolongation';
import { isWLSelector } from 'entities/whiteLabels';

export const useLoadProlongation = (onErrorCallback?: (values: CarNumberLandingFormFields | null) => void) => {
  const [start, { isLoading, isError, data }] = useGetPreviousCalculations();
  const [isProlongationExist, setIsProlongationExist] = useState(false);
  const isWl = useAppSelector(isWLSelector);

  const resetProlongation = useCallback(() => {
    setIsProlongationExist(false);
  }, []);

  const checkProlongationByNumber = useCallback(
    async (values: CarNumberLandingFormFields) => {
      if (isWl) {
        // Не запрашиваем пролонг для попапов
        onErrorCallback?.(values);
        return;
      }

      if (data?.prolongationPolicyByCarNumber?.carNumber === values.carNumber) {
        // Если у нас уже есть данные по номеру, просто заново открываем окно
        setIsProlongationExist(true);
        return;
      }

      resetProlongation();
      await start({ carNumber: values.carNumber });
    },
    [isWl, data?.prolongationPolicyByCarNumber?.carNumber, resetProlongation, start, onErrorCallback],
  );

  useEffect(() => {
    if (isError) {
      onErrorCallback?.(null);
    }
  }, [isError, onErrorCallback]);

  useEffect(() => {
    if (isLoading || isError || !data?.prolongationPolicyByCarNumber?.type) {
      resetProlongation();
      return;
    }

    setIsProlongationExist(data.prolongationPolicyByCarNumber.type !== 'newShortProlongation');
  }, [isLoading, isError, data, resetProlongation]);

  return {
    checkProlongationByNumber,
    isProlongationLoading: isLoading,
    isProlongationExist,
    resetProlongation,
  };
};
