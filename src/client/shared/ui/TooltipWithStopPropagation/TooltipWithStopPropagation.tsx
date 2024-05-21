import { Tooltip } from '@sravni/react-design-system';
import type { TooltipProps } from '@sravni/react-design-system/lib/Tooltip';
import React from 'react';

export const TooltipWithStopPropagation: FC<TooltipProps> = ({ children, ...tooltipProps }) => {
  const { width = 250, placement = 'top-start', ...restTooltipProps } = tooltipProps;

  return (
    <Tooltip
      {...restTooltipProps}
      placement={placement}
      width={width}
    >
      <div
        onClick={(event: React.SyntheticEvent) => {
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    </Tooltip>
  );
};
