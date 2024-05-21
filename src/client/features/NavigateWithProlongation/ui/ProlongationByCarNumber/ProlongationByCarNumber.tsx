import { UI } from '@sravni/cosago-react-library/lib/components';
import { Alert, Button, Divider, Space } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import { useCallback, useEffect, useMemo } from 'react';

import { useAppSelector } from 'shared/lib/redux';
import { sendEventProlongation } from 'shared/lib/sendGAEvents';
import { ProlongationActionType } from 'shared/lib/sendGAEvents/events';

import type { CarNumberLandingFormFields } from 'entities/carInfo';
import { FoundedPolicyProlongation, normalizedProlongationInfoSelector } from 'entities/prolongation';
import { isUserLoggedInSelector } from 'entities/user';

import { useAuthRedirect, useDeclineChoose } from '../../lib';

import styles from './ProlongationByCarNumber.module.scss';
import { ProlongationByCarNumberTexts } from './ProlongationByCarNumber.texts';

type TShowProlongationByCarNumber = {
  onClose: () => void;
  onNeedAuth: () => void;
  formValue: CarNumberLandingFormFields;
};
export const ProlongationByCarNumber: FC<TShowProlongationByCarNumber> = ({ onClose, formValue, onNeedAuth }) => {
  const prolongation = useAppSelector(normalizedProlongationInfoSelector);
  const isUserAuthorized = useAppSelector(isUserLoggedInSelector);
  const doAuthRedirect = useAuthRedirect(formValue);
  const doDeclineRedirect = useDeclineChoose(formValue);
  const isMobile = useIsMobile();

  const handleAcceptClick = () => {
    if (isUserAuthorized) {
      doAuthRedirect().catch(onClose);
      return;
    }

    onNeedAuth();
  };

  const handleDeclineClick = useCallback(async () => {
    await doDeclineRedirect();

    onClose();
  }, [doDeclineRedirect, onClose]);

  useEffect(() => {
    if (prolongation) {
      sendEventProlongation(ProlongationActionType.Show, isUserAuthorized);
    }
  }, [isUserAuthorized, prolongation]);

  const controlTitles = useMemo(() => {
    if (!prolongation?.type) {
      return {
        decline: '',
        accept: '',
      };
    }

    if (isUserAuthorized) {
      return ProlongationByCarNumberTexts.btn[prolongation.type];
    }

    return ProlongationByCarNumberTexts.unauthorized.btn;
  }, [isUserAuthorized, prolongation]);

  if (!prolongation?.type) {
    return null;
  }

  const { description, type } = prolongation || {};

  return (
    <UI.Popup
      visible
      onClose={onClose}
      title={description || ''}
      desktopSize="small"
      controls={
        <Space
          size={16}
          className={styles.controls}
        >
          {type && (
            <Button
              variant="outlined"
              color="gray"
              onClick={handleDeclineClick}
              size={52}
              block={isMobile}
            >
              {controlTitles.decline}
            </Button>
          )}

          <Button
            variant="primary"
            color="gray"
            onClick={handleAcceptClick}
            size={52}
            block={isMobile}
          >
            {controlTitles.accept}
          </Button>
        </Space>
      }
    >
      <Space
        direction="vertical"
        className="h-text-left"
        size={24}
      >
        <Alert
          subtitle={ProlongationByCarNumberTexts.headerAlert}
          color="orange"
        />

        <Divider />

        <FoundedPolicyProlongation isAuthorized={isUserAuthorized} />
      </Space>
    </UI.Popup>
  );
};
