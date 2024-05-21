import type { IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';
import React from 'react';

import type { IHintWrapperProps } from '../../types';
import { HintClickWrapper } from '../HintClickWrapper/HintClickWrapper';

// Причину существовования этого копмопнента смотреть в HintClickWrapper
export const hintClickWrapperHOC =
  (hintProps: Omit<IHintWrapperProps, 'isMobileFlow'>) => (OriginalComponent: FC<IFieldFactoryProps>) => {
    const Wrapper: React.FC<IFieldFactoryProps> = ({ isMobileFlow, ...props }) => (
      <HintClickWrapper
        {...hintProps}
        isMobileFlow={!!isMobileFlow}
      >
        <OriginalComponent
          {...props}
          isMobileFlow={!!isMobileFlow}
        />
      </HintClickWrapper>
    );

    return Wrapper;
  };
