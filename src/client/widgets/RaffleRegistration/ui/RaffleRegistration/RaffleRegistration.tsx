import { useAppDispatch } from 'shared/lib/redux';

import { setLotteryName } from '../../model/RaffleRegistration.slice';
import { RaffleRegistrationModal } from '../RaffleRegistrationModal/RaffleRegistrationModal';
import { FORM_LABELS } from '../RaffleRegistrationModal/RaffleRegistrationModal.constants';

import { formFieldsControls } from './RaffleRegistration.config';

type TRaffleRegistrationBtnsProps = {
  config: {
    rulesLink: string;
    announceDateText: string;
    lotteryName: string;
  };
  isRegistrationModalVisible: boolean;
  onClose: () => void;
};

const DEFAULT_FORM_DATA = { policiesAutocomplete: null, policyNumber: '', policyType: null };

export const RaffleRegistration: FC<TRaffleRegistrationBtnsProps> = ({
  config,
  isRegistrationModalVisible,
  onClose,
}) => {
  const { rulesLink, announceDateText, lotteryName } = config;
  const dispatch = useAppDispatch();
  dispatch(setLotteryName(lotteryName));

  if (!isRegistrationModalVisible) return null;

  return (
    <RaffleRegistrationModal
      defaultData={DEFAULT_FORM_DATA}
      onDataChanged={onClose}
      additionalProps={{
        isVisible: isRegistrationModalVisible,
        rulesLink,
        announceDateText,
      }}
      formFieldsControls={formFieldsControls}
      formLabels={FORM_LABELS}
    />
  );
};
