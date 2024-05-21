import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';

import { FieldErrors } from 'shared/lib/fields';
import { useAppSelector } from 'shared/lib/redux';
import { sendEventRaffleLanding } from 'shared/lib/sendGAEvents';

import { accountPhoneSelector } from 'entities/user';

import { useLazyRegisterUserInRaffle } from '../model/RaffleRegistration.query';
import { lotteryNameSelector } from '../model/RaffleRegistration.selectors';
import type { TRaffleRegistationFields } from '../types';

import { ERRORS_TEXTS } from './RaffleRegistration.constants';

export const useSubmitChoosePolicyStep = (): [(onSuccessSubmit: () => void) => void, boolean] => {
  const { setError, handleSubmit } = useFormContext<TRaffleRegistationFields>();
  const [registerUserInRaffle, { isLoading }] = useLazyRegisterUserInRaffle();
  const lotteryName = useAppSelector(lotteryNameSelector);
  const phone = useAppSelector(accountPhoneSelector);

  return [
    (onSuccessSubmit) => {
      handleSubmit(async (data) => {
        if (data.policiesAutocomplete?.value) {
          const { data: result, isError } = await registerUserInRaffle({
            policyNumber: data.policiesAutocomplete?.value.toString(),
            lotteryName,
            orderId: data.policiesAutocomplete?.orderId,
            isRulesAccepted: true,
            phone,
            productType: data.policiesAutocomplete?.productType,
          });

          if (result?.error || isError) {
            sendEventRaffleLanding({ actionType: 'Зарегистрировать', place: 'Выбор полиса', eventValue: 0 });

            return setError('policiesAutocomplete', {
              message: result?.error || ERRORS_TEXTS.network,
            });
          }
          sendEventRaffleLanding({ actionType: 'Зарегистрировать', place: 'Выбор полиса', eventValue: 1 });

          return onSuccessSubmit();
        }

        return setError('policiesAutocomplete', { message: FieldErrors.requiredError });
      })();
    },
    isLoading,
  ];
};
