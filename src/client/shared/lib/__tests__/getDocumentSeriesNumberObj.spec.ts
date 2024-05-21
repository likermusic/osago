import { Documents } from '@sravni/cosago-react-library/lib/constants';

import { getDocumentSeriesNumberObj } from '../getDocumentSeriesNumberObj';

describe('WHEN "getDocumentSeriesNumberObj" is called', () => {
  it.each([
    Documents.ECarDocumentType.STS,
    Documents.ECarDocumentType.PTS,
    Documents.EParticipantDocuments.PASSPORT,
    Documents.EParticipantDocuments.DRIVING_LICENSE,
  ])('AND number is provided AND document type is %p MUST split number into object', (value) => {
    expect(getDocumentSeriesNumberObj('1234567890', value)).toEqual({
      series: '1234',
      number: '567890',
    });
  });
  it('AND number is provided AND document type is epts MUST split epts into object', () => {
    expect(getDocumentSeriesNumberObj('1234567890', Documents.ECarDocumentType.EPTS)).toEqual({
      number: '1234567890',
      series: '',
    });
  });
  it.each([
    Documents.ECarDocumentType.STS,
    Documents.ECarDocumentType.PTS,
    Documents.EParticipantDocuments.PASSPORT,
    Documents.EParticipantDocuments.DRIVING_LICENSE,
  ])('AND number is not provided AND document type is %p MUST return object of empty strings', (value) => {
    expect(getDocumentSeriesNumberObj('', value)).toEqual({
      series: '',
      number: '',
    });
  });
  it('AND number is not provided AND document type is epts MUST return object with null series and empty-string number', () => {
    expect(getDocumentSeriesNumberObj('', Documents.ECarDocumentType.EPTS)).toEqual({
      number: '',
      series: '',
    });
  });
});
