import type { TSortProposition } from 'entities/propositionCalculations';

export type TPropositionSortItem = {
  value: TSortProposition;
  label: string;
  arrowType?: 'up' | 'down';
};
