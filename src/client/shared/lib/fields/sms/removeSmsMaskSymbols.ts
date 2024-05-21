export const removeSmsMaskSymbols = (value: string) => (value ? value.replace(/[\s_\-+]/g, '') : '');
