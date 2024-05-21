import type { ILabeledDescription } from 'shared/types/IPropositionDetail';

interface IInputDescpiption {
  description?: string | null | undefined;
  label?: string | null | undefined;
  title?: string | null | undefined;
}

export const mapLabeledDescription = (description: IInputDescpiption): ILabeledDescription => ({
  description: description.description ?? '',
  labels: description.label ? description.label.split(',') : [],
  title: description.title ?? '',
});
