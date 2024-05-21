import { FormStepId } from 'shared/config/formStepId';

export const AuthenticationEsiaTexts = {
  errorTitle: 'Что-то пошло не так :(',
  description: 'Мы не смогли заполнить анкету с помощью Госуслуг. Пожалуйста, введите данные вручную',
  descriptionTryAgain: 'Данные из Госуслуг не подтянулись. Попробуйте еще раз или заполните данные вручную',
};

export const AuthenticationEsiaLoginTexts: Record<string, { description: string; button: string }> = {
  [FormStepId.Contacts]: {
    description: 'Заполните контакты с помощью Госуслуг',
    button: 'Заполнить',
  },
};
