import { Alert, Space, Typography } from '@sravni/react-design-system';
import { Warning } from '@sravni/react-icons';
import { useIsMobile } from '@sravni/react-utils';
import React from 'react';

import { CustomRouter } from 'shared/config/router';
import { useAppDispatch, useAppSelector } from 'shared/lib/redux';

import {
  orderInfoSelector,
  propositionCalculationAlertsSelector,
  propositionCalculationsHashSelector,
  sortedSuccessPropositionsSelector,
} from 'entities/propositionCalculations';
import type { SelectedPropositionState } from 'entities/selectedProposition';
import { setSelectedProposition } from 'entities/selectedProposition';

import { SortPropositions } from 'features/SortPropositions';

import { PropositionOrderInfo } from 'widgets/Propositions';

import { PropositionReadyToOrder } from '../PropositionReadyToOrder';

import { PropositionsSuccessListTexts } from './PropositionsSuccessList.texts';

export const PropositionsSuccessList: FC = ({ className }) => {
  const dispatch = useAppDispatch();

  const propositions = useAppSelector(sortedSuccessPropositionsSelector);
  const orderInfo = useAppSelector(orderInfoSelector);
  const propositionAlerts = useAppSelector(propositionCalculationAlertsSelector);

  const isOrderExist = !!orderInfo;
  const calculationHash = useAppSelector(propositionCalculationsHashSelector);

  const shouldNotShowPropositionsList = propositions?.length === 0 && !orderInfo;
  const handleStartNewOrder = (args: SelectedPropositionState) => () => {
    dispatch(setSelectedProposition(args));
    CustomRouter.push('summary', { query: '' });
  };

  const isMobile = useIsMobile();

  if (shouldNotShowPropositionsList) {
    return null;
  }

  return (
    <div className={className}>
      <Space
        justify="space-between"
        align="center"
        className={isMobile ? 'h-mb-20' : 'h-mb-28'}
        size={12}
      >
        <Typography.Heading level={4}>{PropositionsSuccessListTexts.title}</Typography.Heading>

        <SortPropositions />
      </Space>

      <Space
        justify="space-between"
        direction="vertical"
        size={16}
      >
        {propositionAlerts?.map(({ title, subtitle, color, variant }) => (
          <Alert
            key={title + subtitle}
            className="h-mb-16"
            title={title}
            subtitle={subtitle}
            color={color}
            variant={variant}
            icon={<Warning />}
          />
        ))}

        {orderInfo && (
          <PropositionOrderInfo
            {...orderInfo}
            // TODO: разобраться нужно ли positionIndex тут для аналитики https://sravni-corp.atlassian.net/browse/OS-7657
            positionIndex={0}
            key={`${orderInfo.id}order`}
            saleType="Выдача"
          />
        )}

        {propositions.map((proposition, index) => (
          <PropositionReadyToOrder
            {...proposition}
            handleStartNewOrder={handleStartNewOrder({
              price: proposition.price,
              productId: proposition.productId,
              searchId: calculationHash,
              activeCompanyId: proposition.company.companyId,
            })}
            key={proposition.id}
            isOrderInListExist={isOrderExist}
            positionIndex={index}
            buttonTitle={
              proposition.isProlongation
                ? PropositionsSuccessListTexts.buttonTitleProlongation
                : PropositionsSuccessListTexts.buttonTitle
            }
          />
        ))}
      </Space>
    </div>
  );
};
