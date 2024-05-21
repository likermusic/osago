/**
 * @param options - список для МОДИФИКАЦИИ
 * @param findPropositionsIndex - индекс первого предложения на исключение
 * @param quantity - Количество предложений которое следует исключить
 * @return ICalculationProposition[] - список компаний которые были исключены из списка
 * */
export const spliceList = <T>(options: T[], findPropositionsIndex: number, quantity: number) => {
  if (!options || findPropositionsIndex === -1) {
    return [];
  }

  return options.splice(findPropositionsIndex, quantity);
};
