import cn from 'classnames';

import styles from './LandingWrapper.module.scss';

type LandingWrapperProps = {
  dataQa?: string;
};

export const LandingWrapper: FC<LandingWrapperProps> = ({ className, children, dataQa }) => (
  <div
    data-qa={dataQa}
    className={cn(styles.container, className)}
  >
    {children}
  </div>
);
