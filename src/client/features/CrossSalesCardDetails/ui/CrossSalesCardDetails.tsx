import { Dialog } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import React, { useCallback } from 'react';

import type { CrossTypes } from 'shared/config/cross';
import { CrossOrdersStatuses } from 'shared/config/cross';
import { useAppSelector, useAppDispatch } from 'shared/lib/redux';
import { sendEventCrossPayment, sendEventMoveToCrossPayment } from 'shared/lib/sendGAEvents';
import { FixedWidthDialog } from 'shared/ui/FixedWidthDialog';

import { crossOrdersSelector, crossSlice, useGetCrossOrders, usePostCrossOrders } from 'entities/cross';

import { useLoaderStatus } from '../lib/useLoaderStatus';
import { LoaderStatuses } from '../types';

import styles from './CrossSalesCardDetails.module.scss';
import { Description } from './Description';
import { Footer } from './Footer';
import { Header } from './Header';
import { Info } from './Info';

interface MainDescription {
  id: string;
  name: string;
  description: string;
  number: number;
}

interface Exceptions extends MainDescription {
  icon: string;
}
interface Cards extends MainDescription {
  icon: string;
}
interface Documents extends Exceptions {
  file: string;
}

interface ICrossSalesCardDetails {
  advice: string;
  insuranceEntity: string;
  avatarSrc: string;
  cards: Cards[];
  date: string;
  documents: Documents[];
  exceptions: Exceptions[];
  hash: string;
  onClose: () => void;
  limits: Array<{
    title: string;
    limit: number;
  }>;
  price: number;
  steps: MainDescription[];
  subtitle: string;
  title: string;
  type: CrossTypes;
}

const POLLING_PERIOD = 1000;

export const CrossSalesCardDetails: FC<ICrossSalesCardDetails> = ({
  advice,
  insuranceEntity,
  avatarSrc,
  cards,
  date,
  documents,
  exceptions,
  hash,
  onClose,
  limits,
  price,
  steps,
  subtitle,
  title,
  type,
}) => {
  const [postCrossOrders] = usePostCrossOrders();

  const ordersResult = useAppSelector(crossOrdersSelector);
  const isOrdersResultFinish = ordersResult?.status === CrossOrdersStatuses.finished;

  const [getCrossOrders] = useGetCrossOrders({
    pollingInterval: isOrdersResultFinish ? 0 : POLLING_PERIOD,
  });

  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const { loaderStatus, setLoaderStatus } = useLoaderStatus(ordersResult);

  const onCardDetailsClose = useCallback(() => {
    dispatch(crossSlice.actions.resetCrossOrdersResult());
    onClose();
  }, [dispatch, onClose]);

  const onPayBtnClick = async () => {
    if (isOrdersResultFinish) {
      const url = ordersResult.paymentUrl;
      const newWindow = window.open(url, '_blank');
      // если новая вкладка не открылась, то переводим в той же вкладке
      if (!newWindow) {
        window.location.href = url;
      }

      sendEventCrossPayment(subtitle, title, price);
      return;
    }

    setLoaderStatus(LoaderStatuses.loading);
    sendEventMoveToCrossPayment(subtitle, title, price);
    try {
      const request = await postCrossOrders(hash);
      if ('data' in request && request.data?.hash) {
        getCrossOrders(request.data.hash);
      }
    } catch (e) {
      setLoaderStatus(LoaderStatuses.error);
    }
  };

  return (
    <FixedWidthDialog
      visible
      onClose={onCardDetailsClose}
      closable={false}
      fullscreen={isMobile}
    >
      <Dialog.Header>
        <Header
          avatarSrc={avatarSrc}
          onCrossButtonClick={onCardDetailsClose}
          subtitle={subtitle}
          title={title}
          className={styles.header}
        />
      </Dialog.Header>

      <Dialog.Content className={styles.dialogContent}>
        <Description
          advice={advice}
          cards={cards}
          date={date}
          limits={limits}
          insuranceEntity={insuranceEntity}
          type={type}
          className={styles.description}
        />

        <Info
          documents={documents}
          exceptions={exceptions}
          steps={steps}
          type={type}
        />
      </Dialog.Content>

      <Dialog.Footer className="h-shadow-backward">
        <Footer
          price={price}
          onClick={onPayBtnClick}
          status={loaderStatus}
          type={type}
        />
      </Dialog.Footer>
    </FixedWidthDialog>
  );
};
