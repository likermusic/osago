import calculatorAndCar from 'shared/assets/icons/calculatorAndCar.svg';
import creditCardAndDocument from 'shared/assets/icons/creditCardAndDocument.svg';
import monitorAndChecklist from 'shared/assets/icons/monitorAndChecklist.svg';
import sendPoliceToPhone from 'shared/assets/icons/sendPoliceToPhone.svg';

import type { StepItem } from '../types';

import { ProcessStepTexts } from './Steps.texts';

const { checking, inputNumber, calculation, afterPayment } = ProcessStepTexts;

export const StepsList: StepItem[] = [
  { title: inputNumber, stepIndex: 1, icon: { width: 116, height: 72, IconComponent: monitorAndChecklist } },
  { title: calculation, stepIndex: 2, icon: { width: 142, height: 124, IconComponent: calculatorAndCar } },
  { title: checking, stepIndex: 3, icon: { width: 110, height: 96, IconComponent: creditCardAndDocument } },
  { title: afterPayment, stepIndex: 4, icon: { width: 112, height: 72, IconComponent: sendPoliceToPhone } },
];
