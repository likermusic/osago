import type { Promocode } from 'commonTypes/api/promocode';

import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents';
import type { TEventNames } from 'shared/types/TEventNames';

import { useLazyCheckPromo } from '../model/Promocode.query';

const STATUS_EVENTS: Record<Required<Promocode.CheckPromoResponse>['status'], TEventNames> = {
  valid: 'osago_benefitcode_success',
  notFound: 'osago_benefitcode_not_found',
  activated: 'osago_benefitcode_already_activated',
  outDated: 'osago_benefitcode_ended',
};

export const useCheckPromo = () => {
  const sendAnalyticsEvent = useGetSendAnalytics();
  const [checkPromo] = useLazyCheckPromo();

  return async (promocode: string) => {
    try {
      const { data, error } = await checkPromo(promocode);

      if (error) throw new Error();

      if (data?.status) {
        const eventName = STATUS_EVENTS[data.status];
        sendAnalyticsEvent(eventName);
      }

      return data;
    } catch {
      return { promoCode: '', isActive: false, error: 'Ошибка интернет-соединения' };
    }
  };
};
