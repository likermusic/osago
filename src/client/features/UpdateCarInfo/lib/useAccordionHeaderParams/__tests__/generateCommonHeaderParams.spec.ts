import { generateCommonHeaderParams } from '../generateCommonHeaderParams';

describe('WHEN "generateCommonHeaderParams" is called', () => {
  describe('AND vehicle is car', () => {
    it('AND data was not provided, MUST return default header params', () => {
      expect(generateCommonHeaderParams(null as unknown as {}, false, false, 'car')).toEqual({
        description: '',
        icon: undefined,
        title: 'Введите данные автомобиля',
      });
    });

    it('AND data was provided partially, MUST return partial header params', () => {
      expect(
        generateCommonHeaderParams(
          {
            vin: 'X7LHSRH8N48062532',
            documentIssueDate: '28.11.2012',
            documentNumber: '11111111',
            documentType: 'СТС',
            carNumber: 'С004АА77',
          },
          false,
          false,
          'car',
        ),
      ).toEqual({
        description: 'С004АА77 • СТС 11111111 от 28.11.2012 • VIN: X7LHSRH8N48062532',
        icon: undefined,
        title: 'Введите данные автомобиля',
      });
    });

    describe('AND data was provided fully', () => {
      it('MUST return full header params', () => {
        expect(
          generateCommonHeaderParams(
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
            },
            false,
            false,
            'car',
          ),
        ).toEqual({
          description: 'С004АА77 • СТС 11111111 от 28.11.2012 • VIN: X7LHSRH8N48062532',
          icon: 'http://logo.png',
          title: 'Test brand Test model, 2022',
        });
      });

      it('AND vin is masked, MUST return full header params without vin', () => {
        expect(
          generateCommonHeaderParams(
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
            },
            true,
            false,
            'car',
          ),
        ).toEqual({
          description: 'С004АА77 • СТС 11111111 от 28.11.2012 • VIN: X7****H8N48062532',
          icon: 'http://logo.png',
          title: 'Test brand Test model, 2022',
        });
      });

      it('AND document is masked, MUST return full header params without document', () => {
        expect(
          generateCommonHeaderParams(
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
            },
            false,
            true,
            'car',
          ),
        ).toEqual({
          description: 'С004АА77 • СТС 11****11 от 28.11.2012 • VIN: X7LHSRH8N48062532',
          icon: 'http://logo.png',
          title: 'Test brand Test model, 2022',
        });
      });
    });
  });
});
