import { Space } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import React from 'react';

import type { FlowType } from 'shared/config/FlowType';
import { useScrollIntoView } from 'shared/lib/useScrollIntoView';

import type { CarNumberLandingFormFields } from 'entities/carInfo';

import { StickyCarNumberBlock } from '../StickyCarNumberBlock';

import { STICKY_CONTROL_ID } from './StickyBar.constants';

interface ViewContainer {
  flowType: FlowType;
  changeFlowType: (type: FlowType) => void;
  onSubmitCallback: (values: CarNumberLandingFormFields) => void;
}

export const StickyBar: FC<ViewContainer> = ({ children, flowType, changeFlowType, onSubmitCallback }) => {
  const { ref, scrollElementIntoView, isBlockInView, htmlId } = useScrollIntoView(STICKY_CONTROL_ID);
  const isMobile = useIsMobile();

  const handleScrollToVisibleArea = () => {
    if (isMobile) {
      scrollElementIntoView();
    }
  };

  const handleChangeFlowType: typeof changeFlowType = (value) => {
    scrollElementIntoView();
    changeFlowType(value);
  };

  return (
    <Space
      ref={ref}
      id={htmlId}
    >
      {children}
      {!isBlockInView && (
        <StickyCarNumberBlock
          flowType={flowType}
          changeFlowType={handleChangeFlowType}
          onClick={handleScrollToVisibleArea}
          onSubmitCallback={onSubmitCallback}
        />
      )}
    </Space>
  );
};
