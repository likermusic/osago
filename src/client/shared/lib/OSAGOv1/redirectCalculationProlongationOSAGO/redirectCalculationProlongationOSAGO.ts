import { generateOldOsagoUrl } from 'shared/lib/OSAGOv1';

// Логика ссылок восстановления лежит в осаго v1.0 в server/middleware/restorationLinksMiddleware.ts
export const redirectCalculationProlongationOSAGO = (hash: string, isProlongation: boolean) => {
  const hashMode = isProlongation ? 'prolongationHash' : 'calculationHash';
  window.location.href = generateOldOsagoUrl(`?isRepRedirect=true&${hashMode}=${hash}`);
};
