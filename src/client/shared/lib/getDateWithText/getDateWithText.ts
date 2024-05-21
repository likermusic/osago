import { formatDate } from 'commonUtils/formatters';

export const getDateWithText = (currentPolicyStartDate: string) =>
  `ОСАГО с ${formatDate.toDateInGenitiveCase(formatDate.toObjectFromClient(currentPolicyStartDate))}`;
