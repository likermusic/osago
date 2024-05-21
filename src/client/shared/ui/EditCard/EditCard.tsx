import { Skeleton } from '@sravni/react-design-system';
import cn from 'classnames';
import type { MouseEventHandler } from 'react';

import { DeviceSizedCard } from 'shared/ui/DeviceSizedCard';

import styles from './EditCard.module.scss';

interface EditCardProps {
  // Функция клика над карточкой
  onClick?: MouseEventHandler<HTMLDivElement>;
  // Флаг отвечающий за показ скелетона
  isLoading?: boolean;
}

export const EditCard: FC<EditCardProps> = ({ className, children, onClick, isLoading }) => (
  <DeviceSizedCard
    className={cn({ 'h-cursor-pointer': !isLoading, [styles.cardIsLoading]: isLoading }, className)}
    onClick={(evt) => {
      if (!isLoading && onClick) {
        onClick(evt);
      }
    }}
  >
    {isLoading ? (
      <Skeleton>
        <Skeleton.Button block />
      </Skeleton>
    ) : (
      children
    )}
  </DeviceSizedCard>
);
