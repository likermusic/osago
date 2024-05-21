export const decodeProlongationHash = (hash: string) => (hash ? hash.replace(/^prolongation-/, '') : '');
