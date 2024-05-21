import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { queue } from 'shared/lib/queue';

import { routesMap } from './constants';

const usePrefetchNextPages = () => {
  const { pathname, prefetch } = useRouter();

  useEffect(() => {
    const currentUrl = pathname.slice(-1) === '/' ? pathname.slice(0, -1) : pathname;
    const routes = routesMap[currentUrl] || [];

    routes.forEach((route) => {
      queue.push(() => {
        prefetch(route);
      });
    });
  }, [pathname, prefetch]);
};

export { usePrefetchNextPages };
