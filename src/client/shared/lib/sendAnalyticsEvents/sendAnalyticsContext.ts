import { createContext } from 'react';

import type { TEventNames } from '../../types/TEventNames';

/*
 * Используем только в провайдере.
 * Для отправки аналитики используем хуки sendAnalyticsContext и useGetSendAnalytics
 */
export const SendAnalyticsContext = createContext<((eventName: TEventNames) => void) | null>(null);
