import { useDelayUnmount } from 'shared/lib/useDelayUnmount';

import styles from './MountWithAnimation.module.scss';

export interface IHideWithAnimation {
  isVisible: boolean;
  animationDelay?: number;
}

const ANIMATION_DELAY = 400;

/**
 * пока оставил потому что решение из дс далеко от идеала спилить если не понадобится
 * TODO: https://sravni-corp.atlassian.net/browse/OS-7437
 * @deprecated
 */
export const MountWithAnimation: FC<IHideWithAnimation> = ({
  children,
  isVisible: isMounted,
  animationDelay = ANIMATION_DELAY,
}) => {
  const shouldRenderChild = useDelayUnmount(isMounted, animationDelay);

  return shouldRenderChild ? <div className={isMounted ? styles.mounted : styles.unmounted}>{children}</div> : null;
};
