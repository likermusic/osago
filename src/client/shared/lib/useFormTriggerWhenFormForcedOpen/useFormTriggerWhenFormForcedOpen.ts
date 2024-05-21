import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import { useEffect } from 'react';

/*
 * Хук запускает валидацию и покажет пользователю поля которые пользователю нужно заполнить
 * использует внутри себя useFormContext поэтому используем только там где есть доступ к нему
 */
export const useFormTriggerWhenFormForcedOpen = <T>(isFormForceOpened: boolean | undefined) => {
  const { trigger } = useFormContext<T>();

  useEffect(() => {
    if (isFormForceOpened) trigger();
  }, [trigger, isFormForceOpened]);
};
