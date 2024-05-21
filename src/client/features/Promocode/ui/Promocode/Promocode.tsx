import { Button, Card, Icon, Tag } from '@sravni/react-design-system';
import { Done } from '@sravni/react-icons';
import { useBoolean, useIsMobile } from '@sravni/react-utils';
import { useState, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents';

import { setPromocode } from 'entities/propositionCalculations';

import { PromocodeTexts } from '../../lib/Promocode.texts';
import { useCheckPromo } from '../../lib/useCheckPromo';
import { promocodeStatusSelector } from '../../model/Promocode.selectors';
import { PromocodeAppliedModal } from '../PromocodeAppliedModal/PromocodeAppliedModal';
import { PromocodeInputModal } from '../PromocodeInputModal/PromocodeInputModal';

import styles from './Promocode.module.scss';

type TPromoCode = {
  onDataChanged: () => void;
};
export const Promocode: FC<TPromoCode> = ({ className, onDataChanged }) => {
  const isMobile = useIsMobile();
  const [isModalVisible, { on, off }] = useBoolean();

  const promocodeFieldStatus = useAppSelector(promocodeStatusSelector);

  const [isPromocodeChecking, setIsPromocodeChecking] = useState(false);
  const [error, setError] = useState('');

  const checkPromo = useCheckPromo();
  const sendAnalyticsEvent = useGetSendAnalytics();

  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    async (code: string) => {
      setError('');
      setIsPromocodeChecking(true);

      const data = await checkPromo(code);
      if (data?.error) {
        setError(data.error);
      } else if (data?.isActive) {
        dispatch(setPromocode(data.promoCode ?? null));
        onDataChanged();
      }

      setIsPromocodeChecking(false);
    },
    [onDataChanged, checkPromo, dispatch],
  );

  const onOpen = useCallback(() => {
    on();
    sendAnalyticsEvent('osago_benefitcode_enter');
  }, [on, sendAnalyticsEvent]);

  const onClose = useCallback(() => {
    off();
    setError('');
  }, [off]);

  const PromocodeField = {
    input: (
      <Card
        className={className}
        size={isMobile ? 16 : undefined}
      >
        <Button
          color="blue"
          onClick={onOpen}
          size={36}
          variant="secondary"
        >
          {PromocodeTexts.btnText}
        </Button>
      </Card>
    ),
    invisible: null,
    loading: null,
    success: (
      <Card
        className={className}
        size={isMobile ? 16 : undefined}
      >
        <Tag
          onClick={onOpen}
          size={36}
        >
          <Icon
            icon={<Done />}
            color="green"
          />
          {PromocodeTexts.promocodeAppliedBtn}
        </Tag>
      </Card>
    ),
  };

  const PromocodeModal = {
    input: (
      <PromocodeInputModal
        className={styles.modal}
        disabled={isPromocodeChecking}
        isVisible={isModalVisible}
        onClose={onClose}
        onSubmit={onSubmit}
        error={error}
      />
    ),
    invisible: null,
    loading: null,
    success: (
      <PromocodeAppliedModal
        className={styles.modal}
        isVisible={isModalVisible}
        onClose={onClose}
      />
    ),
  };

  return (
    <>
      {PromocodeField[promocodeFieldStatus]} {PromocodeModal[promocodeFieldStatus]}
    </>
  );
};
