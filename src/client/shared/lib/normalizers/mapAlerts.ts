import { isDefined } from '@sravni/react-utils';

import type { ApiSchemas } from 'commonTypes/api/ApiSchemas';

import { sendSentryClientErrorOnce } from 'shared/lib/sendSentryClientError';

import type { IDetailAlert } from '../../types/IAlert';
import { getSravniDetailAward } from '../getSravniAwardTagIfHasAward';

const COLOR_RECORD: Record<Required<ApiSchemas.IAlert>['alert'], IDetailAlert['color']> = {
  Green: 'green',
  Red: 'red',
  Orange: 'orange',
  Blue: 'blue',
  Dark: 'dark',
  Gray: 'dark',
  Violet: 'violet',
  White: 'light',
  Yellow: 'orange',
};

export const mapAlerts = (alerts?: ApiSchemas.IAlert[] | null): IDetailAlert[] =>
  alerts?.map((alert) => {
    const mappedColor = alert?.alert ? COLOR_RECORD[alert.alert] : undefined;
    if (!mappedColor)
      sendSentryClientErrorOnce(true, 'Бэкенд прислал некорректный цвет алерта', { color: alert?.alert });

    return {
      code: alert?.code ?? undefined,
      color: mappedColor,
      title: alert?.title ?? '',
      subtitle: alert?.description ?? '',
      action: alert?.action ?? null,
      modalTitle: alert?.modalTitle ?? undefined,
      url: alert?.url ?? undefined,
    };
  }) ?? [];

export const mapAlertsAndAddAwards = (
  alerts: ApiSchemas.IAlert[] | undefined | null,
  companyId: number | undefined,
): IDetailAlert[] => [getSravniDetailAward(companyId), ...mapAlerts(alerts)].filter(isDefined);
