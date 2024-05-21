import { DateInput } from '@sravni/react-design-system';
import { CalendarSimple } from '@sravni/react-icons';
import { useBoolean } from '@sravni/react-utils';
import cn from 'classnames';

import { useAppSelector } from 'shared/lib/redux';
import { sendEventSummaryDataModalOpen } from 'shared/lib/sendGAEvents';
import { AnketaScrollingLabels } from 'shared/lib/usePageScroll';
import { EditCard } from 'shared/ui/EditCard';

import { currentPolicyAsDatesSelector } from 'entities/PolicyInfo';

import { PolicyStartDateModal } from '../PolicyStartDateModal';

import styles from './PolicyStartDate.module.scss';
import { PolicyStartDateTexts } from './PolicyStartDate.texts';

type TPolicyStartDate = {
  onDataChanged: () => void;
  isRestoreCalculationLoading: boolean;
};
export const PolicyStartDate: FC<TPolicyStartDate> = ({ className, onDataChanged, isRestoreCalculationLoading }) => {
  const [isDialogOpen, { on, off }] = useBoolean();
  const currentPolicy = useAppSelector(currentPolicyAsDatesSelector);

  const handleClick = () => {
    on();
    sendEventSummaryDataModalOpen('Период страхования', 'Плитка');
  };

  return currentPolicy.currentStartDate ? (
    <>
      <EditCard
        onClick={handleClick}
        className={cn(styles.editCard, className)}
        isLoading={isRestoreCalculationLoading}
      >
        <DateInput
          id={AnketaScrollingLabels.DND}
          readOnly
          label={PolicyStartDateTexts.dateLabel}
          icon={<CalendarSimple />}
          value={currentPolicy.currentStartDate}
          postfix="(на 1 год)"
        />
      </EditCard>

      {isDialogOpen && (
        <PolicyStartDateModal
          isDialogOpen={isDialogOpen}
          onDialogClose={off}
          onDataChanged={onDataChanged}
        />
      )}
    </>
  ) : null;
};
