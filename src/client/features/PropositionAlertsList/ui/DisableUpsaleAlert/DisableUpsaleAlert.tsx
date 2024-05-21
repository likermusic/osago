import { UI } from '@sravni/cosago-react-library/lib/components';
import { Alert, Space, Switch } from '@sravni/react-design-system';
import { useBoolean } from '@sravni/react-utils';
import cn from 'classnames';

import { setActiveElementFlag } from 'shared/lib/activeElementClickInterceptor';
import { useAppDispatch } from 'shared/lib/redux';
import { sendSentryClientError } from 'shared/lib/sendSentryClientError';
import type { IDetailAlert } from 'shared/types/IAlert';

import { resetOrderAndSetLoadingStatus, setActiveOrderToError } from 'entities/order';

import { useLazyDisableUpSale } from '../../model/PropositionAlertsList.query';

import { DisableUpsaleAlertTexts } from './DisableUpsaleAlert.texts';

interface IDisableUpsaleAlert {
  alertProps: IDetailAlert;
  orderHash: string;
  startNewOrder: () => void;
}
export const DisableUpsaleAlert: FC<IDisableUpsaleAlert> = ({ className, alertProps, orderHash, startNewOrder }) => {
  const [isModalVisible, { on, off }] = useBoolean();
  const [isChecked, setIsChecked] = useBoolean(true);
  const [disableUpsale] = useLazyDisableUpSale();
  const dispatch = useAppDispatch();
  const onModalClose = async () => {
    off();
    if (!isChecked) {
      try {
        dispatch(resetOrderAndSetLoadingStatus());
        const { data: isSuccessDisable } = await disableUpsale(orderHash || '');

        if (!isSuccessDisable) throw new Error('Не удалось отменить upsale');
        startNewOrder();
      } catch (e) {
        dispatch(setActiveOrderToError());
        sendSentryClientError(e, { orderHash, place: 'DisableUpsaleAlert' });
      }
    }
  };

  return (
    <div onClick={setActiveElementFlag}>
      <Alert
        title={alertProps.title}
        subtitle={alertProps.subtitle}
        color={alertProps.color}
        variant={alertProps.variant}
        className={cn('h-cursor-pointer', className)}
        onClick={on}
      />

      <UI.Popup
        title={alertProps?.title}
        visible={isModalVisible}
        onClose={onModalClose}
        closable
        controls={
          <Space justify="end">
            <Switch
              onChange={setIsChecked.toggle}
              checked={isChecked}
            >
              {isChecked ? DisableUpsaleAlertTexts.btxTextEnabled : DisableUpsaleAlertTexts.btnTextDisabled}
            </Switch>
          </Space>
        }
      >
        <div className="h-text-left">{alertProps?.subtitle}</div>
      </UI.Popup>
    </div>
  );
};
