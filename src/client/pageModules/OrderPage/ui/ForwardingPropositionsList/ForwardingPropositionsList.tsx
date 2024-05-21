import { RadioButton, Space, Typography } from '@sravni/react-design-system';
import { useDispatch } from 'react-redux';

import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents';

import { setCurrentPolicyStartDate } from 'entities/PolicyInfo';

import { collectOrderQuery } from 'features/CollectQuery';
import { useGetNewOrderHashAndDrafts } from 'features/StartNewOrder';

import { PropositionReadyToOrder, useSendEventForwardingProposition } from 'widgets/Propositions';

import { useGetForwardingPropositionsList } from '../../lib/useGetForwardingPropositionsList';

import styles from './ForwardingPropositionsList.module.scss';
import { ForwardingPropositionsListTexts } from './ForwardingPropositionsList.texts';

export const ForwardingPropositionsList: FC = ({ className }) => {
  const dispatch = useDispatch();
  const sendAnalyticsEvent = useGetSendAnalytics();

  const {
    shouldShowDatePicker,
    currentPropositions,
    defaultDateValue,
    options,
    forwardingPropositions,
    dates,
    onChange,
  } = useGetForwardingPropositionsList();

  useSendEventForwardingProposition(dates);

  const startNewOrder = useGetNewOrderHashAndDrafts(collectOrderQuery);

  if (forwardingPropositions.length === 0) return null;

  return (
    <Space
      className={className}
      direction="vertical"
      size={16}
    >
      <Space
        size={[4, 12]}
        wrap
        justify="space-between"
      >
        <div className="h-pl-16">
          <Typography.Heading level={4}>{ForwardingPropositionsListTexts.title}</Typography.Heading>
          <Typography.Text size={14}>{ForwardingPropositionsListTexts.subtitle}</Typography.Text>
        </div>
        {shouldShowDatePicker && (
          <RadioButton
            className={styles.radio}
            options={options}
            defaultValue={defaultDateValue}
            onChange={onChange}
          />
        )}
      </Space>

      <Space
        justify="space-between"
        direction="vertical"
        size={16}
      >
        {currentPropositions?.map((proposition, index) => (
          <PropositionReadyToOrder
            {...proposition}
            handleStartNewOrder={() => {
              const { productId, price, company, startDate, calcHash } = proposition;

              if (startDate) dispatch(setCurrentPolicyStartDate(startDate));

              startNewOrder({
                productId,
                price,
                companyId: company?.companyId ?? null,
                shouldUpdateSelectedProposition: true,
                searchId: calcHash,
              });

              sendAnalyticsEvent('osago_contact_new_choose');
            }}
            isOrderInListExist={false}
            key={proposition.id}
            positionIndex={index}
            buttonTitle={
              proposition.isProlongation
                ? ForwardingPropositionsListTexts.buttonTitleProlongation
                : ForwardingPropositionsListTexts.buttonTitle
            }
          />
        ))}
      </Space>
    </Space>
  );
};
