import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import { Alert, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';
import type { MouseEventHandler } from 'react';

import { CustomRouter } from 'shared/config/router';
import { sendEventRaffleLanding } from 'shared/lib/sendGAEvents';

import { useSubmitChoosePolicyStep } from '../../lib/useSubmitChoosePolicyStep';
import type { TRaffleRegistationFields, TInteractiveStepProps } from '../../types';
import { AcceptRulesText } from '../AcceptRulesText/AcceptRulesText';
import { LeftBtn } from '../LeftBtn/LeftBtn';
import { RightBtn } from '../RightBtn/RightBtn';

import styles from './ChoosePolicyStep.module.scss';
import { ChoosePolicyStepTexts } from './ChoosePolicyStep.texts';

export const ChoosePolicyStep: FC<TInteractiveStepProps> = ({ FieldConstructor, setStep, rulesLink }) => {
  const [submitRegister, isRegisterPolicyLoading] = useSubmitChoosePolicyStep();

  const { watch } = useFormContext<TRaffleRegistationFields>();
  const policyNumber = watch('policiesAutocomplete')?.value;

  const onRegBtnClick = () => submitRegister(() => setStep('Success'));

  const onEnterPolicyBtnClick: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault();
    sendEventRaffleLanding({ actionType: 'Ввести вручную', place: 'Выбор полиса' });

    setStep('EnterPolicyByYourself');
  };

  const isMobile = useIsMobile();

  return (
    <Space
      direction="vertical"
      size={24}
      className="h-text-left"
    >
      <FieldConstructor
        type="policiesAutocomplete"
        isDisabled={isRegisterPolicyLoading}
        isMobileFlow
      />

      <Alert
        color="blue"
        title={<Typography.Text size={14}>{ChoosePolicyStepTexts.alert.title}</Typography.Text>}
      >
        <Typography.Text
          size={12}
          className="h-color-D60"
        >
          {ChoosePolicyStepTexts.alert.text}
          <Typography.Link onClick={onEnterPolicyBtnClick}>{ChoosePolicyStepTexts.alert.buttonText}</Typography.Link>
        </Typography.Text>
      </Alert>

      <Space
        direction="vertical"
        size={12}
      >
        <Space
          size={16}
          direction={isMobile ? 'column-reverse' : 'horizontal'}
          justify="end"
          className={!isMobile ? 'h-pt-24' : undefined}
        >
          {!policyNumber && (
            <LeftBtn
              onClick={() => {
                sendEventRaffleLanding({ place: 'Попап вход', actionType: 'Купить новый полис' });
                CustomRouter.push('main');
              }}
            >
              {isMobile ? ChoosePolicyStepTexts.btnBuyMobile : ChoosePolicyStepTexts.btnBuy}
            </LeftBtn>
          )}

          {policyNumber && (
            <RightBtn
              className={cn({ [styles.stretch]: !!policyNumber })}
              isLoading={isRegisterPolicyLoading}
              onClick={onRegBtnClick}
            >
              {ChoosePolicyStepTexts.btnReg}
            </RightBtn>
          )}
        </Space>

        <AcceptRulesText
          rulesLink={rulesLink || ''}
          btnName={ChoosePolicyStepTexts.btnReg}
        />
      </Space>
    </Space>
  );
};
