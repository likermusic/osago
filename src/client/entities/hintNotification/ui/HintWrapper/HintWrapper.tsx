import { Alert, Space } from '@sravni/react-design-system';
import React from 'react';

import { useFormHint } from '../../lib/useFormHint/useFormHint';
import type { IHintWrapperProps } from '../../types';

export const HintWrapper: React.FC<IHintWrapperProps> = (props) => {
  const {
    children,
    isMobileFlow,
    hintText,
    shouldShowMobileHint = true,
    shouldShowDesktopHint = true,
    hintTitle,
    shouldShowOverControl,
  } = props;
  const { showHint, hideHint } = useFormHint(hintText, hintTitle);

  const HintMobile = (
    <Alert
      color="orange"
      title={hintTitle}
    >
      {hintText}
    </Alert>
  );

  if (isMobileFlow) {
    return (
      <Space
        direction="vertical"
        size={24}
      >
        {shouldShowOverControl && shouldShowMobileHint && HintMobile}

        {children}

        {!shouldShowOverControl && shouldShowMobileHint && HintMobile}
      </Space>
    );
  }

  return (
    <div
      onFocus={isMobileFlow || !shouldShowDesktopHint ? undefined : showHint}
      onBlur={hideHint}
    >
      {children}
    </div>
  );
};
