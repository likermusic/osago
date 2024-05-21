import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';

import { useAppSelector } from 'shared/lib/redux';
import { sendEventRaffleLanding } from 'shared/lib/sendGAEvents';

import { accountPhoneSelector } from 'entities/user';

import { useLazyRegisterUserInRaffle } from '../model/RaffleRegistration.query';
import { lotteryNameSelector } from '../model/RaffleRegistration.selectors';
import { enterPolicyByYourselfStepValidation } from '../model/RaffleRegistration.validation';
import type { TRaffleRegistationFields } from '../types';

import { ERRORS_TEXTS } from './RaffleRegistration.constants';

export const useSubmitEnterPolicyByYourselfStep = (): [(onSuccessSubmit: () => void) => void, boolean] => {
  const { setError, handleSubmit } = useFormContext<TRaffleRegistationFields>();
  const [registerUserInRaffle, { isLoading }] = useLazyRegisterUserInRaffle();
  const lotteryName = useAppSelector(lotteryNameSelector);
  const phone = useAppSelector(accountPhoneSelector);

  return [
    (onSuccessSubmit) => {
      handleSubmit(async (data) => {
        try {
          enterPolicyByYourselfStepValidation().validateSync(data);

          const { data: result, isError } = await registerUserInRaffle({
            policyNumber: data.policyNumber,
            lotteryName,
            isRulesAccepted: true,
            phone,
            productType: data.policyType?.value,
          });

          if (result?.error || isError) {
            sendEventRaffleLanding({ actionType: 'Продолжить', place: 'Свой полис', eventValue: 0 });

            return setError('policyNumber', {
              message: result?.error || ERRORS_TEXTS.network,
            });
          }
          sendEventRaffleLanding({ actionType: 'Зарегистрировать', place: 'Свой полис', eventValue: 1 });

          return onSuccessSubmit();
        } catch (err) {
          setError(err.path, { message: err.message });
        }
      })();
    },
    isLoading,
  ];
};
