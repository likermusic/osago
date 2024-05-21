export const handleHashes = {
  code: (hash: string, type: 'calculation' | 'prolongation') => `${type}-${hash}`,
  decode: (id: string): { hash: string; type: 'calculation' | 'prolongation' } | never => {
    if (id.startsWith('calculation-')) {
      return {
        hash: id.replace(/^calculation-/, ''),
        type: 'calculation',
      };
    }

    if (id.startsWith('prolongation-')) {
      return {
        hash: id.replace(/^prolongation-/, ''),
        type: 'prolongation',
      };
    }

    throw new Error('wrong id');
  },
};
