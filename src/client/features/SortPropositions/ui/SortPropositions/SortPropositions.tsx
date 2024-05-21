import { Dropdown, Tag, Typography } from '@sravni/react-design-system';
import type { SelectValue } from '@sravni/react-design-system/dist/types/types/Select.types';
import cn from 'classnames';
import type { FC } from 'react';
import { useMemo } from 'react';

import SortIcon from 'shared/assets/icons/sortIcon.svg';
import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { sendEventSortingPropositionsChange } from 'shared/lib/sendGAEvents';

import type { TSortProposition } from 'entities/propositionCalculations';
import { propositionCalculationsSlice, propositionsSortSelector } from 'entities/propositionCalculations';

import { NEW_PROPOSTIONS_SORTING_MAP } from './SortPropositions.constant';
import styles from './SortPropositions.module.scss';
import { PROPOSITION_SORTING_LIST } from './SortPropositions.texts';

export const SortPropositions: FC = () => {
  const dispatch = useAppDispatch();
  const sorting = useAppSelector(propositionsSortSelector);
  const currentValue = useMemo(() => PROPOSITION_SORTING_LIST.find(({ value }) => value === sorting), [sorting]);
  const options = useMemo(
    () =>
      PROPOSITION_SORTING_LIST.map((item) => ({
        value: item.value,
        label: item.label,
        control: item.arrowType ? (
          <SortIcon
            className={cn({
              [styles.rotate]: item?.arrowType === 'down',
            })}
          />
        ) : undefined,
      })),
    [],
  );

  const handleUpdatePropositionSorting = (value: SelectValue) => {
    // value всегда TSortProposition
    dispatch(propositionCalculationsSlice.actions.setSort(value as TSortProposition));
    sendEventSortingPropositionsChange(NEW_PROPOSTIONS_SORTING_MAP[value as TSortProposition]);
  };

  const { value, label, arrowType } = currentValue || {};

  return (
    <Dropdown
      options={options}
      value={value}
      onChange={handleUpdatePropositionSorting}
    >
      <Tag size={36}>
        <Typography.Text
          size={14}
          className="h-color-D100"
        >
          {label}
        </Typography.Text>

        {arrowType && (
          <SortIcon
            className={cn({
              [styles.rotate]: arrowType === 'down',
            })}
          />
        )}
      </Tag>
    </Dropdown>
  );
};
