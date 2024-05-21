import type { IParseUrlQuery } from './interface';

export const parseUrlQuery = (query?: Nullable<Record<string, string>>): IParseUrlQuery => {
  const {
    calculationHash,
    isOrderApproved,
    regNumberToken,
    regnumbertoken,
    autoNumber,
    orderHash,
    searchId,
    hash,
    benefitCode,
    sessionQuery,
    prolongationHash,
    platenumber,
    raffleModalType,
  } = query || {};

  return {
    calculationHash: calculationHash?.toString() || '',
    autoNumber: autoNumber?.toString() || '',
    // для пролонга и ордера одна ручка восстановления
    orderOrProlongationHash: orderHash?.toString() || prolongationHash?.toString() || '',
    prolongationHash: prolongationHash?.toString() || '',
    searchId: searchId?.toString() || '',
    hash: hash?.toString() || '',
    benefitCode: benefitCode?.toString() || '',
    sessionQuery: sessionQuery?.toString() || '',
    regNumberToken: regNumberToken?.toString() || regnumbertoken?.toString() || '',
    isOrderApproved: isOrderApproved === 'true',
    platenumber,
    raffleModalType: raffleModalType?.toString() || '',
    orderHash: orderHash?.toString() || '',
  };
};
