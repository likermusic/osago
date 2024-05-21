import { useEffect, useState } from 'react';

import { CrossOrdersStatuses } from 'shared/config/cross';

import type { ICrossOrders } from 'entities/cross';

import { LoaderStatuses } from '../types';

export const getLoaderStatus = (status: ICrossOrders['status'] | undefined) => {
  switch (status) {
    case CrossOrdersStatuses.created:
    case CrossOrdersStatuses.running:
      return LoaderStatuses.loading;
    case CrossOrdersStatuses.finished:
      return LoaderStatuses.finished;
    case CrossOrdersStatuses.error:
      return LoaderStatuses.error;
    default:
      return LoaderStatuses.default;
  }
};

export const useLoaderStatus = (ordersResult: ICrossOrders | null) => {
  const [loaderStatus, setLoaderStatus] = useState<LoaderStatuses>(LoaderStatuses.default);

  useEffect(() => {
    setLoaderStatus(getLoaderStatus(ordersResult?.status));
  }, [ordersResult]);

  return { loaderStatus, setLoaderStatus };
};
