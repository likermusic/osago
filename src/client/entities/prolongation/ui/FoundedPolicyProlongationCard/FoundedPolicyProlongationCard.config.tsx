import { Icon } from '@sravni/react-design-system';
import { Calendar, Car, Phone, User } from '@sravni/react-icons';

import type { IIcons } from '../../types';

export const ICONS: IIcons = {
  userName: (
    <Icon
      size={20}
      icon={<User />}
    />
  ),
  maskedPhone: (
    <Icon
      size={20}
      icon={<Phone />}
    />
  ),
  auto: (
    <Icon
      size={20}
      icon={<Car />}
    />
  ),
  policyEndDate: (
    <Icon
      size={20}
      icon={<Calendar />}
    />
  ),
  drivers: (
    <Icon
      size={20}
      icon={<User />}
    />
  ),
};
