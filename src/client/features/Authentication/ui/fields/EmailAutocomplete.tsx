import { UI } from '@sravni/cosago-react-library/lib/components';
import type { IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';

import { getHostings } from '../../lib/getHostings';

export const EmailAutocomplete = (props: IFieldFactoryProps) => {
  const { type, label = '', isMobileFlow } = props;

  return (
    <UI.ControlledDaDataEmailAutocomplete
      name={type}
      label={label}
      isMobileFlow={isMobileFlow}
      getSuggestions={getHostings}
    />
  );
};
