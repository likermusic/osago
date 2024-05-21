import { UI } from '@sravni/cosago-react-library/lib/components';

import type { FieldFactoryProps } from 'types/fieldFactory';

import { INSURANCE_TYPES_OPTIONS } from './EnterPolicyByYourself.constants';

export const PolicyType: FC<FieldFactoryProps> = ({ type, label, ...props }) => (
  <UI.ControlledCustomSelect
    {...props}
    options={INSURANCE_TYPES_OPTIONS}
    name={type}
    label={label}
    required
  />
);
