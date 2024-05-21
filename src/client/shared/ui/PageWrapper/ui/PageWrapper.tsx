import cn from 'classnames';

import styles from './PageWrapper.module.scss';

type PageWrapperProps = {
  dataQa?: string;
};

export const PageWrapper: FC<PageWrapperProps> = ({ className, children, dataQa }) => (
  <div
    data-qa={dataQa}
    className={cn(styles.container, className)}
  >
    {children}
  </div>
);
