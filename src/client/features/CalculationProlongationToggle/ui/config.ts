import { FlowType } from 'shared/config/FlowType';

const calculationProlongationToggle = {
  calculation: 'Рассчитать цену',
  prolongation: 'Продлить полис Сравни',
  prolongationMobile: 'Продлить полис',
};

export const toggleOptions = (isPhone: boolean) => [
  {
    label: calculationProlongationToggle.calculation,
    value: FlowType.Calculation,
  },
  {
    label: isPhone ? calculationProlongationToggle.prolongationMobile : calculationProlongationToggle.prolongation,
    value: FlowType.Prolongation,
  },
];
