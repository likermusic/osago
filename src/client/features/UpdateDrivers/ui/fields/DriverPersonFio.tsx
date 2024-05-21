import type { IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';
import React from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { selectDriversNames } from 'entities/drivers';
import { PersonFioField } from 'entities/people';

export const DriverPersonFio: FC<IFieldFactoryProps> = (props) => {
  const { type, onSideActionComplete } = props;
  const existedDriversFullNames = useAppSelector(selectDriversNames);

  const handleSideAction = (action: string, newName: unknown) => {
    onSideActionComplete?.(action, {
      type,
      newName,
    });
  };

  return (
    <PersonFioField
      {...props}
      onSideActionComplete={handleSideAction}
      excludedPeopleFullNames={existedDriversFullNames}
    />
  );
};
