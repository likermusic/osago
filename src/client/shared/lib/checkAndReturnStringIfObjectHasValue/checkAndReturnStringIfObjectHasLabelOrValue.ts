const isObjectHasLabel = (value: unknown): value is { label: string } =>
  Boolean(value && typeof value === 'object' && 'label' in value);

const isObjectHasValue = (value: unknown): value is { value: string } =>
  Boolean(value && typeof value === 'object' && 'value' in value);

export const checkAndReturnStringIfObjectHasLabelOrValue = (value: unknown): string | null | undefined => {
  if (value === undefined || value === null) return value;

  if (isObjectHasLabel(value)) return String(value.label);

  if (isObjectHasValue(value)) return String(value.value);

  return String(value);
};
