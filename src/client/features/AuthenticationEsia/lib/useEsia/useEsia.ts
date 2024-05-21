import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib/redux';

import { useAbTestVariant } from 'entities/appConfig';
import { isUserLoggedInSelector } from 'entities/user';
import { isWLSelector } from 'entities/whiteLabels';

import { EXPERIMENT_NAME, EXPERIMENT_B_VARIANT } from '../../AuthenticationEsia.config';
import { clearEsiaStepFlugThunk } from '../thunks/clearEsiaStepFlugThunk';
import { updateFormDataByEsiaPersonThunk } from '../thunks/updateFormDataByEsiaPersonThunk';

/**
 * Хук управляет обновление стора если пользователь залогинен
 * или сбрасывает состояние есиа в дефолт, если у пользователя нет есиа
 * */
export const useEsia = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(isUserLoggedInSelector);
  const currentVariant = useAbTestVariant(EXPERIMENT_NAME);
  const isWl = useAppSelector(isWLSelector);
  const isFeatureActive = !isWl && currentVariant === EXPERIMENT_B_VARIANT;

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(clearEsiaStepFlugThunk());
    }
  }, [dispatch, isLoggedIn]);

  return useCallback(() => {
    if (isFeatureActive) {
      dispatch(updateFormDataByEsiaPersonThunk());
    }
  }, [isFeatureActive, dispatch]);
};
