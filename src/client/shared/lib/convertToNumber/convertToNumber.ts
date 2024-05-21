export const convertToNumber = (value: unknown): number => (Number.isNaN(Number(value)) ? 0 : Number(value));
