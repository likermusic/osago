import type { UrlObject } from 'url';

import Router from 'next/router';

import { objectToQuery } from 'commonUtils/objectToQuery';
import { APP_ROUTES } from 'constants/routes';

export type RouterPages = keyof typeof APP_ROUTES;

const getUrl = (pageName: RouterPages) => {
  const route = APP_ROUTES[pageName];

  // Добавляем слеш, чтобы на деве не ломались редиректы
  return `${route}${route.slice(-1) !== '/' && '/'}`;
};

/**
 *  Потому что мы на лендинге используем сео и сео мы получаем в SSR,
 *  все редиректы на лендинг должны идти через жесткий перегруз страницы.
 *  Например, если мы редиректим с заказа на лендинг,
 *  то у нас нет в сторе меты и пользак увидит Unknown России
 * */
const redirectToMain = (query: UrlObject['query'], type: 'push' | 'replace') => {
  if (typeof window !== 'undefined') {
    let search = '';

    if (typeof query === 'string') {
      search = `?${query.replace('?', '')}`;
    } else if (query) {
      const queryStr = objectToQuery(query);
      if (queryStr.length) {
        search = `?${queryStr}`;
      }
    }

    const fullUrl = `${getUrl('main')}${search}`;

    if (type === 'replace') window.location.replace(fullUrl);
    else window.location.assign(fullUrl);
  }
};

export const CustomRouter = {
  push: (page: RouterPages, config?: UrlObject) => {
    const commonConfig = { pathname: getUrl(page), query: Router.query, ...config };
    if (page === 'main') {
      redirectToMain(commonConfig.query, 'push');
      return;
    }

    return Router.push(commonConfig);
  },
  replace: (page: RouterPages, config?: UrlObject) => {
    const commonConfig = { pathname: getUrl(page), query: Router.query, ...config };
    if (page === 'main') {
      redirectToMain(commonConfig.query, 'replace');
      return;
    }

    return Router.replace({ pathname: getUrl(page), query: Router.query, ...config });
  },
};

export const redirectToLandingWithReplaceAndClearQueryParams = () => CustomRouter.replace('main', { query: null });
export const redirectToPropositionsWithReplaceAndClearQueryParams = () =>
  CustomRouter.replace('propositions', { query: null });
