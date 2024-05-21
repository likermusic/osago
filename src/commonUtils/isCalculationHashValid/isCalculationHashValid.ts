export const EXPECTED_HASH_LENGTH = 22;

export const isCalculationHashValid = (calculationHash?: string): calculationHash is string => {
  if (!calculationHash) {
    return false;
  }

  return calculationHash.length === EXPECTED_HASH_LENGTH;
};
