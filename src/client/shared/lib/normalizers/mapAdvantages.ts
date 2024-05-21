import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import type { IDescription } from '../../types/ICardProposition';

export const mapAdvantages = (
  company:
    | PropositionCalculations.GetCalculations['offers'][number]['company']
    | PropositionCalculations.GetManyOrders['orderInfo']['offer']['company'],
) => company?.main?.columns?.filter((el): el is IDescription => !!(el.title && el.description)) ?? [];
