import { Button, Typography } from '@sravni/react-design-system';
import React from 'react';

import { CurrentSmsCodeStatusTexts } from './CurrentSmsCodeStatus.texts';

const { Text } = Typography;

interface ICurrentSmsCodeStatusProps {
  onClickResend: () => void;
  seconds: number;
}

export const CurrentSmsCodeStatus: FC<ICurrentSmsCodeStatusProps> = ({ onClickResend, seconds }) =>
  seconds > 0 ? (
    <Text className="h-color-D30">
      {CurrentSmsCodeStatusTexts.timeout} 00:{seconds < 10 ? `0${seconds}` : seconds}
    </Text>
  ) : (
    <Button
      color="blue"
      onClick={onClickResend}
      variant="text"
    >
      {CurrentSmsCodeStatusTexts.titleButton}
    </Button>
  );
