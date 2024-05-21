import { useDependedFieldsValueControl } from '@sravni/cosago-react-library/lib/hooks';
import { Space } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import { sendEventRaffleLanding } from 'shared/lib/sendGAEvents';

import { useSubmitEnterPolicyByYourselfStep } from '../../lib/useSubmitEnterPolicyByYourselfStep';
import type { TRaffleRegistationFields, TInteractiveStepProps } from '../../types';
import { AcceptRulesText } from '../AcceptRulesText/AcceptRulesText';
import { LeftBtn } from '../LeftBtn/LeftBtn';
import { RightBtn } from '../RightBtn/RightBtn';

import styles from './EnterPolicyByYourselfStep.module.scss';
import { EnterPolicyByYourselfStepTexts } from './EnterPolicyByYourselfStep.texts';

export const EnterPolicyByYourselfStep: FC<TInteractiveStepProps> = ({ FieldConstructor, setStep, rulesLink }) => {
  const isMobile = useIsMobile();

  const [submitRegister, isLoading] = useSubmitEnterPolicyByYourselfStep();

  const onRightBtnClick = () => submitRegister(() => setStep('SentForChecking'));

  useDependedFieldsValueControl<TRaffleRegistationFields>({
    fieldName: 'policyType',
    fieldsToResetOnChangeValue: ['policyNumber'],
  });

  return (
    <Space
      direction="vertical"
      size={24}
      className="h-text-left"
    >
      <FieldConstructor
        type="policyType"
        isMobileFlow
        className={styles.input}
      />
      <FieldConstructor
        type="policyNumber"
        isMobileFlow
        className={styles.input}
      />

      <Space
        size={16}
        className="h-pt-24"
        direction={isMobile ? 'column-reverse' : 'horizontal'}
        justify="end"
      >
        <LeftBtn
          className={styles.btnLeft}
          onClick={() => {
            sendEventRaffleLanding({ actionType: 'Назад', place: 'Свой полис', eventValue: 0 });

            setStep('ChoosePolicy');
          }}
        >
          {EnterPolicyByYourselfStepTexts.btnLeft}
        </LeftBtn>

        <RightBtn
          className={styles.btnRight}
          onClick={onRightBtnClick}
          isLoading={isLoading}
        >
          {EnterPolicyByYourselfStepTexts.btnRight}
        </RightBtn>
      </Space>

      <AcceptRulesText
        rulesLink={rulesLink || ''}
        btnName={EnterPolicyByYourselfStepTexts.btnRight}
      />
    </Space>
  );
};
