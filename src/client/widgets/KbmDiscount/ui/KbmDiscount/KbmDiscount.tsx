import { Icon, Space } from '@sravni/react-design-system';
import { Tip } from '@sravni/react-icons';
import { useBoolean } from '@sravni/react-utils';

import { useAppSelector } from 'shared/lib/redux';
import { sendEventSummaryDataModalOpen } from 'shared/lib/sendGAEvents';
import { EditCard } from 'shared/ui/EditCard';

import { selectMultiDrive } from 'entities/drivers';
import { KbmDiscountInfo } from 'entities/KbmDiscount';

import { KbmDiscountModal, kbmLoadingStatusSelector, maxDriversKbmSelector } from 'features/KbmDiscountModal';

type TKbmDiscount = {
  onDataChanged: () => void;
};

export const KbmDiscount: FC<TKbmDiscount> = ({ className, onDataChanged }) => {
  const [isDialogOpen, { on, off }] = useBoolean();
  const isDriversUnlimited = useAppSelector(selectMultiDrive);

  const totalKbm = useAppSelector(maxDriversKbmSelector);

  const kbmDiscountStatus = useAppSelector(kbmLoadingStatusSelector);
  const isDialogShow = isDialogOpen && kbmDiscountStatus === 'success';
  const isWidgetHidden = kbmDiscountStatus === 'error' || (kbmDiscountStatus === 'success' && !totalKbm);

  const handleClick = () => {
    on();
    sendEventSummaryDataModalOpen('КБМ', 'Плитка');
  };

  if (isWidgetHidden) {
    return null;
  }

  return (
    <>
      <EditCard
        onClick={handleClick}
        className={className}
        isLoading={kbmDiscountStatus === 'loading'}
      >
        <Space
          align="center"
          justify="space-between"
          size={16}
        >
          {totalKbm && <KbmDiscountInfo kbm={totalKbm} />}
          <Icon
            color="blue"
            icon={<Tip />}
          />
        </Space>
      </EditCard>

      {isDialogShow && (
        <KbmDiscountModal
          isMultiDrive={isDriversUnlimited}
          onDataChanged={onDataChanged}
          isDialogOpen={isDialogShow}
          onDialogClose={off}
        />
      )}
    </>
  );
};
