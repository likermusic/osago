import { Widgets } from '@sravni/cosago-react-library/lib/components';
import { Alert } from '@sravni/react-design-system';
import { useCallback, useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { sendEventClickEsiaLoginButton, sendEventEsiaShowLogin } from 'shared/lib/sendGAEvents';

import { ShowContentForAbVariant } from 'entities/appConfig';
import { isWLSelector } from 'entities/whiteLabels';

import { EXPERIMENT_NAME } from '../../AuthenticationEsia.config';
import { AuthenticationEsiaLoginTexts, AuthenticationEsiaTexts } from '../../AuthenticationEsia.texts';
import { readDataAfterEsiaSignInThunk } from '../../lib';
import {
  shouldUpdateEsiaSelector,
  showLoginByEsiaSelector,
  showShowEsiaErrorSelector,
} from '../../model/AuthenticationEsia.selectors';

interface IAuthenticationEsia {
  // идентификатор шага формы
  step: string;
}
export const AuthenticationEsia: FC<IAuthenticationEsia> = ({ className, step }) => {
  const dispatch = useAppDispatch();
  const isShowEsiaLogin = useAppSelector(showLoginByEsiaSelector);
  const shouldUpdateSet = useAppSelector(shouldUpdateEsiaSelector);
  const isEsiaError = useAppSelector(showShowEsiaErrorSelector(step));
  const isWl = useAppSelector(isWLSelector);

  const handleClickOnEsiaEnter = useCallback(() => {
    sendEventClickEsiaLoginButton(step);
    dispatch(readDataAfterEsiaSignInThunk(step));
  }, [dispatch, step]);

  useEffect(() => {
    if (isShowEsiaLogin && shouldUpdateSet[step] && !isWl && !isEsiaError) {
      sendEventEsiaShowLogin(step);
    }
  }, [isEsiaError, isShowEsiaLogin, isWl, shouldUpdateSet, step]);

  if (isWl) {
    // не показываем на WL
    return null;
  }

  if (isEsiaError) {
    return (
      <Alert
        color="orange"
        title={AuthenticationEsiaTexts.errorTitle}
        subtitle={AuthenticationEsiaTexts.description}
      />
    );
  }

  if (!isShowEsiaLogin || !shouldUpdateSet[step]) {
    return null;
  }

  return (
    <Widgets.AuthenticationESIAButton
      onClick={handleClickOnEsiaEnter}
      className={className}
      description={AuthenticationEsiaLoginTexts[step]?.description}
      buttonTitle={AuthenticationEsiaLoginTexts[step]?.button}
    />
  );
};

export const AuthenticationEsiaA: FC<IAuthenticationEsia> = ({ step }) => {
  const isShowEsiaLogin = useAppSelector(showLoginByEsiaSelector);
  const shouldUpdateSet = useAppSelector(shouldUpdateEsiaSelector);
  const isEsiaError = useAppSelector(showShowEsiaErrorSelector(step));
  const isWl = useAppSelector(isWLSelector);

  useEffect(() => {
    if (isShowEsiaLogin && shouldUpdateSet[step] && !isWl && !isEsiaError) {
      // чекаем, что мы могли бы показать пользователю плашку с авторизацией для ветки А
      sendEventEsiaShowLogin(step);
    }
  }, [isEsiaError, isShowEsiaLogin, isWl, shouldUpdateSet, step]);

  return null;
};

export const AuthenticationEsiaAB: FC<IAuthenticationEsia> = (props) => {
  const variants = useMemo(
    () => ({
      '0': <AuthenticationEsiaA {...props} />,
      '1': <AuthenticationEsia {...props} />,
    }),
    [props],
  );

  return (
    <ShowContentForAbVariant<'a72011a5-9344-4bb8'>
      expectedVariants={variants}
      experimentName={EXPERIMENT_NAME}
    />
  );
};
