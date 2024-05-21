import type { IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';
import React from 'react';

import type { IHintWrapperProps } from '../../types';
import { HintWrapper } from '../HintWrapper/HintWrapper';

export const hintWrapperHOC =
  (hintProps: Omit<IHintWrapperProps, 'isMobileFlow'>) => (OriginalComponent: FC<IFieldFactoryProps>) => {
    const Wrapper: React.FC<IFieldFactoryProps> = ({ isMobileFlow, ...props }) => (
      <HintWrapper
        {...hintProps}
        isMobileFlow={!!isMobileFlow}
      >
        <OriginalComponent
          {...props}
          isMobileFlow={!!isMobileFlow}
        />
      </HintWrapper>
    );

    return Wrapper;
  };
