import type { Documents } from '@sravni/cosago-react-library/lib/constants';
import { getDocumentSeriesNumber } from '@sravni/cosago-react-library/lib/utils';

export const getDocumentSeriesNumberObj = (
  documentSeriesNumber: string,
  documentType: Documents.ECarDocumentType | Documents.EParticipantDocuments | undefined,
) => {
  if (!documentType) {
    return {};
  }

  const [series, number] = getDocumentSeriesNumber(documentSeriesNumber, documentType);
  return {
    number,
    series: series ?? '',
  };
};
