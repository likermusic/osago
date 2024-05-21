import { formatDate } from 'commonUtils/formatters';

export const PropositionHeaderWithDateTexts = {
  date: (currentPolicyStartDate: string) => `ОСАГО с ${formatDate.toLocalizedClientFromClient(currentPolicyStartDate)}`,
};
