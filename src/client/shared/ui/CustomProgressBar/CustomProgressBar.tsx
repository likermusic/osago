import cn from 'classnames';
import type { FC } from 'react';

import styles from './CustomProgressBar.module.scss';

export type TCustomProgressBar = {
  // Величина заполнения прогресс бара
  percent: number;
  // Класс да полосе заполнения
  className?: string;
  // Цвет подложки под полосой заполнения
  backgroundColor?: 'white' | 'gray';
};

/**
 * Progress ифк из ДС не кастомизируется и команда ДС менять его не планирует,
 * так что подтянул наш кастомный прогрессбар. Там где можно, лучше юзать компонент из ДС
 * */
export const CustomProgressBar: FC<TCustomProgressBar> = ({ percent, className, backgroundColor = 'gray' }) => (
  <div className={cn(styles.wrapper, styles[`${backgroundColor}Background`])}>
    <div
      className={cn(styles.progress, className)}
      style={{
        width: percent ? `${percent}%` : 0,
      }}
    />
  </div>
);
