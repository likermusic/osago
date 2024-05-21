import { NotificationManager } from '@sravni/react-design-system';
import { useCallback, useRef } from 'react';

import { redirectToPropositionsWithReplaceAndClearQueryParams } from 'shared/config/router';
import { sendSentryClientErrorOnce } from 'shared/lib/sendSentryClientError';
import { useDeeplink } from 'shared/lib/useDeeplink';
import { NO_COMPANY_OR_PRICE_IN_RESTORE_LINK } from 'shared/lib/validations/Errors.texts';

import { useRestoreSelectedPropositionInfo } from 'entities/selectedProposition';

import { NOTIFICATION_TIME, PRICE_ERROR } from '../constatns';

export const useRestoreFormattedPriceAndCompany = () => {
  const queryParamsOnce = useRef(useDeeplink().params);

  const [restoreSelectedPropositionInfo, { isLoading }] = useRestoreSelectedPropositionInfo();

  const checkPriceValidation = useCallback(() => {
    const orderOrProlongationHashOnce = queryParamsOnce.current?.orderOrProlongationHash;
    // Восстанавливаем цену и компанию, если попали на summary по ссылке восстановления
    if (orderOrProlongationHashOnce) {
      (async () => {
        try {
          const { data, error } = await restoreSelectedPropositionInfo(orderOrProlongationHashOnce);
          if (error) {
            throw new Error(NO_COMPANY_OR_PRICE_IN_RESTORE_LINK);
          }

          // если успешно восстановили, но цена 0, значит что на заказе отказ и переходим на страницу с предложениями
          if (!data?.price || !data?.activeCompanyId) {
            redirectToPropositionsWithReplaceAndClearQueryParams();
          }
        } catch (err) {
          NotificationManager.show(PRICE_ERROR, '', '', NOTIFICATION_TIME, 'error');

          sendSentryClientErrorOnce(true, err, {
            orderOrProlongationHash: orderOrProlongationHashOnce,
            place: 'useRestoreFormattedPrice',
            level: 'log',
          });
        }
      })();
    }
  }, [restoreSelectedPropositionInfo]);

  return {
    isPriceLoading: isLoading,
    checkPriceValidation,
  };
};
