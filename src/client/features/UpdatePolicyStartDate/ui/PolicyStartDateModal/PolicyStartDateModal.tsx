import { UI } from '@sravni/cosago-react-library/lib/components';
import { Button, Space } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { formatDate } from 'commonUtils/formatters';

import { useAppDispatch, useAppSelector } from 'shared/lib/redux';

import { currentPolicyAsDatesSelector, policyInfoSlice } from 'entities/PolicyInfo';

import { ApplyButton } from '../ApplyButton';
import { ModalContent } from '../ModalContent';

import styles from './PolicyStartDateModal.module.scss';
import { PolicyStartDateModalTexts } from './PolicyStartDateModal.texts';

interface PolicyStartDateModalProps {
  // Флаг отвечающий за отображение модального окна
  isDialogOpen: boolean;
  // Функция для закрытия модального окна
  onDialogClose: () => void;

  // Функция для оповещения остального кода о том что ДНД изменился
  onDataChanged?: () => void;

  // Кнопка, которую можно дополнительно встроить слева от кнопки сабмита
  additionalButton?: ReactNode;

  // Флаг отвечающий за отображение доп. кнопки
  withAdditionalButton?: boolean;
}

// TODO: Добавить отправку аналитики, когда будет готова страница рассчета OS-6510
export const PolicyStartDateModal: FC<PolicyStartDateModalProps> = ({
  isDialogOpen,
  onDialogClose,
  onDataChanged,
  additionalButton,
  withAdditionalButton,
}) => {
  const isMobile = useIsMobile();
  const currentPolicy = useAppSelector(currentPolicyAsDatesSelector);
  const [currentStartDate, setCurrentStartDate] = useState<Date>(currentPolicy.currentStartDate);
  const dispatch = useAppDispatch();

  const onApplyBtnClick = () => {
    const normalizedCurrentStartDate = formatDate.toClientFromObject(dayjs(currentStartDate)) ?? undefined;

    dispatch(policyInfoSlice.actions.setCurrentPolicyStartDate(normalizedCurrentStartDate));
    onDialogClose();
    onDataChanged?.();
  };

  useEffect(() => {
    // при обновлении даты начала действия извне после первого рендеринга (например на пробросе)
    // обновляем дату в стейте, чтобы у пользователя в дейт пикере была актуальная дата
    currentPolicy?.currentStartDate && setCurrentStartDate(currentPolicy?.currentStartDate);
  }, [currentPolicy?.currentStartDate]);

  return (
    <UI.Popup
      fullscreen
      visible={isDialogOpen}
      onClose={onDialogClose}
      title={PolicyStartDateModalTexts.title}
      desktopSize="small"
      controls={
        isMobile ? (
          <Space direction="vertical">
            <ApplyButton
              block
              onClick={onApplyBtnClick}
            />
            {withAdditionalButton ? (
              additionalButton
            ) : (
              <Button
                variant="text"
                color="blue"
                onClick={onDialogClose}
              >
                {PolicyStartDateModalTexts.close}
              </Button>
            )}
          </Space>
        ) : (
          <>
            {withAdditionalButton && additionalButton}
            <ApplyButton
              className={styles.applyBtn}
              onClick={onApplyBtnClick}
            />
          </>
        )
      }
    >
      <ModalContent
        className="h-text-left"
        currentStartDate={currentStartDate}
        setCurrentStartDate={setCurrentStartDate}
      />
    </UI.Popup>
  );
};
