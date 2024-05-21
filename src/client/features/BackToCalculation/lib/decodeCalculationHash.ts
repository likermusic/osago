export const decodeCalculationHash = (hash: string) => (hash ? hash.replace(/^calculation-/, '') : '');
