import cn from 'classnames';

import styles from './WLLandingWrapper.module.scss';

export const WLLandingWrapper: FC = ({ children, className }) => (
  <div className={cn(styles.container, className)}>{children}</div>
);
