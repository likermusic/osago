import { TEXT_DOT_SEPARATOR } from 'shared/config/contacts';

import { generateExtendedHeaderParams } from '../generateExtendedHeaderParams';

describe('WHEN "generateExtendedHeaderParams" is called', () => {
  it('AND data was not provided, MUST return default header params', () => {
    // @ts-ignore
    expect(generateExtendedHeaderParams(null, false)).toEqual({
      description: 'Без номера',
      icon: undefined,
      title: '',
    });
  });

  it('AND data was provided partially, MUST return partial header params', () => {
    expect(
      generateExtendedHeaderParams(
        {
          vin: 'X7LHSRH8N48062532',
          documentIssueDate: '28.11.2012',
          documentNumber: '11111111',
          documentType: 'СТС',
          carNumber: 'С004АА77',
        },
        false,
        false,
      ),
    ).toEqual({
      description: `С004АА77${TEXT_DOT_SEPARATOR}VIN: X7LHSRH8N48062532${TEXT_DOT_SEPARATOR}СТС: 11111111 от 28.11.2012`,
      icon: undefined,
      title: '',
    });
  });

  describe('AND data was provided fully', () => {
    it('MUST return full header params', () => {
      expect(
        generateExtendedHeaderParams(
          {
            vin: 'X7LHSRH8N48062532',
            documentIssueDate: '28.11.2012',
            documentNumber: '11111111',
            documentType: 'СТС',
            carNumber: 'С004АА77',
            brand: 'Test brand',
            model: 'Test model',
            year: '2022',
            logo: 'http://logo.png',
            power: '2022 лс',
          },
          false,
          false,
        ),
      ).toEqual({
        description: `С004АА77${TEXT_DOT_SEPARATOR}VIN: X7LHSRH8N48062532${TEXT_DOT_SEPARATOR}СТС: 11111111 от 28.11.2012`,
        icon: 'http://logo.png',
        title: 'Test brand Test model 2022, 2022 лс',
      });
    });

    it('AND vin is masked, MUST return full header params without vin', () => {
      expect(
        generateExtendedHeaderParams(
          {
            vin: 'X7LHSRH8N48062532',
            documentIssueDate: '28.11.2012',
            documentNumber: '11111111',
            documentType: 'СТС',
            carNumber: 'С004АА77',
            brand: 'Test brand',
            model: 'Test model',
            year: '2022',
            logo: 'http://logo.png',
            power: '2022 лс',
          },
          true,
          false,
        ),
      ).toEqual({
        description: `С004АА77${TEXT_DOT_SEPARATOR}VIN: X7****H8N48062532${TEXT_DOT_SEPARATOR}СТС: 11111111 от 28.11.2012`,
        icon: 'http://logo.png',
        title: 'Test brand Test model 2022, 2022 лс',
      });
    });

    it('AND document is masked, MUST return full header params without document data', () => {
      expect(
        generateExtendedHeaderParams(
          {
            vin: 'X7LHSRH8N48062532',
            documentIssueDate: '28.11.2012',
            documentNumber: '11111111',
            documentType: 'СТС',
            carNumber: 'С004АА77',
            brand: 'Test brand',
            model: 'Test model',
            year: '2022',
            logo: 'http://logo.png',
            power: '2022 лс',
          },
          false,
          true,
        ),
      ).toEqual({
        description: `С004АА77${TEXT_DOT_SEPARATOR}VIN: X7LHSRH8N48062532${TEXT_DOT_SEPARATOR}СТС: 11****11 от 28.11.2012`,
        icon: 'http://logo.png',
        title: 'Test brand Test model 2022, 2022 лс',
      });
    });
  });
});
