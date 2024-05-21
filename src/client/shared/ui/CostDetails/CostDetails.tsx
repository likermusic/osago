import { Space, Typography } from '@sravni/react-design-system';
import React from 'react';

const { Text } = Typography;

type TFormula = {
  resultText?: string;
  multipliers?: string[];
};

interface ICostDetails {
  formula: TFormula;
}

export const CostDetails: FC<ICostDetails> = ({ className, formula }) => (
  <Space
    className={className}
    wrap
    size={16}
  >
    <Text strong>{formula.resultText}</Text>

    {formula.multipliers?.map((multiplier, index) => (
      <React.Fragment key={multiplier}>
        {index === 0 ? '=' : '×'}
        <Text className="h-color-O100">{multiplier}</Text>
      </React.Fragment>
    ))}
  </Space>
);
