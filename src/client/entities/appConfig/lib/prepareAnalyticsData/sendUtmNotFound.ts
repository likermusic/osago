import { BFF_PROXY_API } from 'constants/apiRoutes';

import { axiosWithoutRetries } from 'shared/api/requestInstance';

type TUtmNotFoundLog =
  | 'ANALYTIC_UTM_NOT_FOUND'
  | 'ANALYTIC_UTM_NOT_FOUND_AFTER_COOKIE_REQUEST'
  | 'ANALYTIC_YM_CLIENT_ID_NOT_FOUND'
  | 'ANALYTIC_YM_CLIENT_ID_NOT_FOUND_IN_BASE'
  | 'ANALYTIC_UA_CLIENT_ID_NOT_FOUND'
  | 'ANALYTIC_UA_CLIENT_ID_NOT_FOUND_IN_BASE'
  | 'ANALYTIC_UTM_NOT_FOUND_COOKIE_REQUEST_ERROR';

export const sendUtmNotFound = (originalUrl: string, label: TUtmNotFoundLog) => {
  const message = {
    info: { originalUrl, cookie: document.cookie },
    message: label,
  };

  axiosWithoutRetries.post(BFF_PROXY_API.log, message);
};
