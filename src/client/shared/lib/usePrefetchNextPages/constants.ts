import { APP_ROUTES } from 'constants/routes';

export const routesMap: Record<string, string[]> = {
  [APP_ROUTES.main]: [APP_ROUTES.propositions, APP_ROUTES.anketa, APP_ROUTES.win3cars],
  [APP_ROUTES.motorcycle]: [APP_ROUTES.propositions, APP_ROUTES.anketa, APP_ROUTES.win3cars],
  [APP_ROUTES.failure]: [APP_ROUTES.order],
  [APP_ROUTES.success]: [APP_ROUTES.win3cars],
  [APP_ROUTES.propositions]: [APP_ROUTES.summary],
  [APP_ROUTES.anketa]: [APP_ROUTES.propositions],
  [APP_ROUTES.summary]: [APP_ROUTES.order],
  [APP_ROUTES.order]: [],
  [APP_ROUTES.win3cars]: [APP_ROUTES.main],
  [APP_ROUTES.wlNew]: [APP_ROUTES.anketa],
};
