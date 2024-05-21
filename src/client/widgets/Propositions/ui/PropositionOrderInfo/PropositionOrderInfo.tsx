import { Space } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import { PropositionCardMain } from 'entities/propositionCalculations';

import { PropositionAlertsList } from 'features/PropositionAlertsList';
import { useTogglePropositionDetails } from 'features/PropositionDetail';
import { SmartTagList } from 'features/SmartTag';

import type { IOrderActionTypes, IPropositionOrderInfo } from '../../types';
import { OrderPayAndDetailAction } from '../OrderPayAndDetailAction';

export const PropositionOrderInfo: FC<IPropositionOrderInfo> = (props) => {
  const { company, absoluteTags, alerts, description, paymentUrl, price, className } = props;
  const isMobile = useIsMobile();
  const { isCardDetailsOpened, togglePropositionDetails, openPropositionDetails } = useTogglePropositionDetails();

  if (!company) {
    return null;
  }

  const isOrderReady = !!paymentUrl && !!price;

  const ActionsProps: IOrderActionTypes = {
    ...props,
    company,
    isOrderReady,
    isDetailInfoOpened: isCardDetailsOpened,
    onToggleDetailInfoPopup: togglePropositionDetails,
  };

  return (
    <PropositionCardMain
      {...props}
      className={className}
      onCardClick={openPropositionDetails}
      company={company}
      headerActionChildren={isMobile ? undefined : <OrderPayAndDetailAction {...ActionsProps} />}
      absoluteTags={
        <SmartTagList
          tags={absoluteTags}
          bonuses={description?.bonuses}
        />
      }
      price={price}
    >
      <Space
        direction="vertical"
        size={isMobile ? 12 : 16}
      >
        {!!alerts?.length && <PropositionAlertsList alerts={alerts} />}

        {isMobile && <OrderPayAndDetailAction {...ActionsProps} />}
      </Space>
    </PropositionCardMain>
  );
};
