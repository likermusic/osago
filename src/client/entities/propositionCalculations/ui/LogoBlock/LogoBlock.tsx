import { Avatar, Skeleton } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import type { IPropositionHeaderMain } from '../../types';

export const LogoBlock: FC<Pick<IPropositionHeaderMain, 'company'>> = ({ company }) => {
  const isMobile = useIsMobile();
  const { logoLink } = company || {};

  return logoLink ? (
    <Avatar
      size={isMobile ? 36 : 44}
      src={logoLink}
    />
  ) : (
    <Skeleton.Avatar width={isMobile ? 36 : 44} />
  );
};
