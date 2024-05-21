import type { ReactNode } from 'react';

import type { TStep, TInteractiveStepProps, TTextStepProps } from '../../types';
import { ChoosePolicyStep } from '../ChoosePolicyStep/ChoosePolicyStep';
import { EnterPolicyByYourselfStep } from '../EnterPolicyByYourselfStep/EnterPolicyByYourselfStep';
import { LoadingStep } from '../LoadingStep/LoadingStep';
import { TTextStep } from '../TTextStep/TTextStep';

type TStepsData = {
  title?: string;
  subtitle?: string;
  StepComponent?: ReactNode;
};

type TGetStepsDataParams = {
  interactiveStepsProps: TInteractiveStepProps;
  policyNumbers: string[];
  announceDateText: string;
  registratedPolicyNumber: string;
  onClose: TTextStepProps['onClose'];
};

export const getStepsData = ({
  interactiveStepsProps,
  policyNumbers,
  announceDateText,
  registratedPolicyNumber,
  onClose,
}: TGetStepsDataParams): Record<TStep, TStepsData> => ({
  Loading: {
    title: 'Загрузка',
    StepComponent: <LoadingStep />,
  },
  Auth: {
    title: 'Укажите телефон, на который был оформлен полис',
    subtitle: 'В акции участвуют только Страхователи по договору',
  },
  ChoosePolicy: {
    title: 'Выберите полис, который хотите\u00A0зарегистрировать',
    subtitle: 'Мы\u00A0подобрали все ваши полисы, которые подходят под условия акции',
    StepComponent: <ChoosePolicyStep {...interactiveStepsProps} />,
  },
  EnterPolicyByYourself: {
    title: 'Введите номер полиса, который хотите зарегистрировать',
    subtitle:
      'Ваш\u00A0полис должен быть куплен на\u00A0сайте или\u00A0в\u00A0приложении Сравни в\u00A0период с\u00A019 февраля\u00A0по\u00A026 апреля (включительно), стоимостью от\u00A02\u00A0000\u00A0₽',
    StepComponent: <EnterPolicyByYourselfStep {...interactiveStepsProps} />,
  },
  Success: {
    StepComponent: (
      <TTextStep
        title={`Полис зарегистрирован! Ваш номер\u00A0-\u00A0${registratedPolicyNumber}`}
        subtitle={`Объявим победителя\u00A0${announceDateText}, все подробности на\u00A0`}
        linkText="странице акции"
        onClose={onClose}
      />
    ),
  },
  MaxPoliciesRegistered: {
    StepComponent: (
      <TTextStep
        title={`Вы уже зарегистрировали максимальное количество полисов. Ваши номера ${policyNumbers.join(' и ')}`}
        subtitle={`Объявим победителя\u00A0${announceDateText}, все подробности на\u00A0`}
        linkText="странице акции"
        onClose={onClose}
      />
    ),
  },
  SentForChecking: {
    StepComponent: (
      <TTextStep
        title="Полис отправлен на проверку"
        subtitle="Мы дополнительно проверим полис и вышлем вам письмо с подтверждением о регистрации"
        isSubtitleBold
        onClose={onClose}
      />
    ),
  },
});
