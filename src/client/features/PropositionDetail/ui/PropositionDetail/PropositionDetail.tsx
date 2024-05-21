import React from 'react';

import type { TPropositionDetail } from 'shared/types';

import { InfoButton } from '../InfoButton/InfoButton';
import { PropositionDetailPopup } from '../PropositionDetailPopup/PropositionDetailPopup';

type TPropositionDetailComponent = Omit<
  React.ComponentProps<typeof PropositionDetailPopup>,
  'onClose' | 'visible' | 'description'
> & {
  description: Nullable<TPropositionDetail>;
  sendEventAnalytics: () => void;
  // передает родителю текущее состояние окна информации
  onPopupChangeState: (newState: boolean) => void;
  isOpenDetails: boolean;
};

export const PropositionDetail: FC<TPropositionDetailComponent> = ({
  children,
  className,
  description,
  sendEventAnalytics,
  onPopupChangeState,
  isOpenDetails = false,
  ...props
}) => {
  if (!description) return null;

  const handleClick = () => {
    onPopupChangeState(true);
    sendEventAnalytics();
  };

  const handleCloseDetails = () => {
    onPopupChangeState(false);
  };

  return (
    <>
      <InfoButton
        className={className}
        onClick={handleClick}
      />

      <PropositionDetailPopup
        {...props}
        description={description}
        onClose={handleCloseDetails}
        visible={isOpenDetails}
      >
        {children}
      </PropositionDetailPopup>
    </>
  );
};
