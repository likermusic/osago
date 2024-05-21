import { getCarInfoDictionaries } from '../getCarInfoDictionaries';

const mockGetBrands = jest.fn();
jest.mock('../../getBrands/getBrands', () => ({
  getBrandsRetriable: jest.fn().mockImplementation(() => mockGetBrands()),
}));

const mockGetCarEnginePowers = jest.fn();
jest.mock('../../getCarEnginePowers/getCarEnginePowers', () => ({
  getCarEnginePowersRetriable: jest.fn().mockImplementation(() => mockGetCarEnginePowers()),
}));

const mockGetCarModification = jest.fn();
jest.mock('../../getCarModification/getCarModification', () => ({
  getCarModificationRetriable: jest.fn().mockImplementation(() => mockGetCarModification()),
}));

const mockGetManufactureYears = jest.fn();
jest.mock('../../getManufactureYears/getManufactureYears', () => ({
  getManufactureYearsRetriable: jest.fn().mockImplementation(() => mockGetManufactureYears()),
}));

const mockGetModels = jest.fn();
jest.mock('../../getModels/getModels', () => ({
  getModelsRetriable: jest.fn().mockImplementation(() => mockGetModels()),
}));

describe('WHEN "getCarInfoDictionaries" is called', () => {
  const brands = [{ id: 'test' }];
  const models = [{ id: 'test' }];
  const years = [2022];
  const modifications = [11];
  const powers = [22];

  beforeEach(() => {
    mockGetBrands.mockResolvedValue(brands);
    mockGetModels.mockResolvedValue(models);
    mockGetManufactureYears.mockResolvedValue(years);
    mockGetCarModification.mockResolvedValue(modifications);
    mockGetCarEnginePowers.mockResolvedValue(powers);
  });

  it('MUST do request brands', async () => {
    const result = await getCarInfoDictionaries({});

    expect(mockGetBrands).toHaveBeenCalled();
    expect(mockGetModels).not.toHaveBeenCalled();
    expect(mockGetManufactureYears).not.toHaveBeenCalled();
    expect(mockGetCarModification).not.toHaveBeenCalled();
    expect(mockGetCarEnginePowers).not.toHaveBeenCalled();
    expect(result).toEqual({
      brands,
      models: [],
      modifications: [],
      powers: [],
      years: [],
    });
  });

  describe('AND brandId was provided', () => {
    it('MUST get models list', async () => {
      const result = await getCarInfoDictionaries({
        brandId: 22,
      });

      expect(mockGetBrands).toHaveBeenCalled();
      expect(mockGetModels).toHaveBeenCalled();
      expect(mockGetManufactureYears).not.toHaveBeenCalled();
      expect(mockGetCarModification).not.toHaveBeenCalled();
      expect(mockGetCarEnginePowers).not.toHaveBeenCalled();
      expect(result).toEqual({
        brands,
        models,
        modifications: [],
        powers: [],
        years: [],
      });
    });

    describe('AND modelId was provided', () => {
      it('MUST get years list', async () => {
        const result = await getCarInfoDictionaries({
          brandId: 22,
          modelId: 22,
        });

        expect(mockGetBrands).toHaveBeenCalled();
        expect(mockGetModels).toHaveBeenCalled();
        expect(mockGetManufactureYears).toHaveBeenCalled();
        expect(mockGetCarModification).not.toHaveBeenCalled();
        expect(mockGetCarEnginePowers).not.toHaveBeenCalled();
        expect(result).toEqual({
          brands,
          models,
          modifications: [],
          powers: [],
          years,
        });
      });

      describe('AND year was provided', () => {
        it('MUST get powers list', async () => {
          const result = await getCarInfoDictionaries({
            brandId: 22,
            modelId: 12,
            year: 2022,
          });

          expect(mockGetBrands).toHaveBeenCalled();
          expect(mockGetModels).toHaveBeenCalled();
          expect(mockGetManufactureYears).toHaveBeenCalled();
          expect(mockGetCarModification).not.toHaveBeenCalled();
          expect(mockGetCarEnginePowers).toHaveBeenCalled();
          expect(result).toEqual({
            brands,
            models,
            modifications: [],
            powers,
            years,
          });
        });

        it('AND power was provided, MUST get modifications list', async () => {
          const result = await getCarInfoDictionaries({
            brandId: 22,
            modelId: 12,
            year: 2022,
            enginePower: 33,
          });

          expect(mockGetBrands).toHaveBeenCalled();
          expect(mockGetModels).toHaveBeenCalled();
          expect(mockGetManufactureYears).toHaveBeenCalled();
          expect(mockGetCarModification).toHaveBeenCalled();
          expect(mockGetCarEnginePowers).toHaveBeenCalled();
          expect(result).toEqual({
            brands,
            models,
            modifications,
            powers,
            years,
          });
        });
      });
    });
  });
});
