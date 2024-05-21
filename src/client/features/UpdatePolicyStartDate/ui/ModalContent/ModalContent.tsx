import { Alert, DateInput, Typography } from '@sravni/react-design-system';
import dayjs from 'dayjs';

import { useAppSelector } from 'shared/lib/redux';

import { currentPolicyAsDatesSelector, lastPolicySelector } from 'entities/PolicyInfo';

import { getCurrentPolicyEndDate } from '../../lib/getCurrentPolicyEndDate';
import { getPolicyEndDateStatusMessage } from '../../lib/policyEndDateStatusMessage';

import { DAYS_SHIFTS } from './ModalContent.constants';
import styles from './ModalContent.module.scss';
import { ModalContentTexts } from './ModalContent.texts';

interface ModalContentProps {
  currentStartDate?: Date;
  setCurrentStartDate: (date: Date) => void;
}

export const ModalContent: FC<ModalContentProps> = ({ className, currentStartDate, setCurrentStartDate }) => {
  const lastPolicy = useAppSelector(lastPolicySelector);
  const currentPolicy = useAppSelector(currentPolicyAsDatesSelector);

  return (
    <div className={className}>
      <DateInput
        label={ModalContentTexts.dateLabel}
        minDate={dayjs().startOf('date').add(DAYS_SHIFTS.min, 'day').toDate()}
        maxDate={dayjs().startOf('date').add(DAYS_SHIFTS.max, 'day').toDate()}
        onChange={(date) => date.from && setCurrentStartDate(date.from)}
        value={currentStartDate}
        postfix="(на 1 год)"
      />
      {currentStartDate && (
        <Typography.Text
          size={12}
          className="h-color-D30 h-ml-16 h-mt-4"
        >
          {ModalContentTexts.endDate}
          {getCurrentPolicyEndDate(currentStartDate)}
        </Typography.Text>
      )}
      {currentPolicy.recommendedStartDate && currentStartDate ? (
        <div className={styles.alert}>
          <Alert
            color="orange"
            className="h-mt-16"
          >
            {getPolicyEndDateStatusMessage(currentPolicy.recommendedStartDate, currentStartDate, lastPolicy)}
          </Alert>
        </div>
      ) : null}
    </div>
  );
};
