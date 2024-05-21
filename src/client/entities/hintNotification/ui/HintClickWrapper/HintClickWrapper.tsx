import { Alert, Space } from '@sravni/react-design-system';
import React from 'react';

import { useFormHint } from '../../lib/useFormHint/useFormHint';
import type { IHintWrapperProps } from '../../types';

// Этот компонент существует из-за того, что есть баги с фокусом/блюром в инпутах дизайн-системы
// TODO: Попробовать заменить на HintWrapper после выкладки https://sravni-corp.atlassian.net/browse/PE-2773 или копать дальше
// В таске выше описаны проблемы только с блюром, но они есть и с фокусом, если у автокомлпита меняется key
export const HintClickWrapper: React.FC<IHintWrapperProps> = (props) => {
  const { children, isMobileFlow, hintText, shouldShowMobileHint = true, hintTitle, shouldShowOverControl } = props;
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
        size={16}
      >
        {shouldShowOverControl && shouldShowMobileHint && HintMobile}

        {children}

        {!shouldShowOverControl && shouldShowMobileHint && HintMobile}
      </Space>
    );
  }

  return (
    <div
      onKeyUp={!isMobileFlow && showHint}
      onMouseUp={!isMobileFlow && showHint}
      onBlur={hideHint}
      onKeyDown={(e) => {
        if (e.key === 'Enter') hideHint();
      }}
    >
      {children}
    </div>
  );
};
