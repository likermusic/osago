import type { IReviewsApi } from 'commonTypes/insuranceCompanies';

import { TEST_ERROR } from '../../../../../__mocks__';
import { insuranceCompaniesReviews } from '../insuranceCompaniesReviews';

const mockGetReviews = jest.fn();
jest.mock('../getReviews', () => ({
  getReviews: jest.fn().mockImplementation((...args) => mockGetReviews(...args)),
}));

const mockFindByIds = jest.fn();
jest.mock('../../../locations/locations', () => ({
  findAllLocationsByProvidedIds: jest.fn().mockImplementation((...args) => mockFindByIds(...args)),
}));

const mockGetInsuranceCompaniesByIds = jest.fn();
jest.mock('../../insuranceCompanies/insuranceCompaniesServices', () => ({
  getInsuranceCompaniesByIds: jest.fn().mockImplementation((...args) => mockGetInsuranceCompaniesByIds(...args)),
}));

describe('WHEN "insuranceCompaniesReviews" is called', () => {
  const locationId = 'locationId';
  const companyId = 'companyId';
  const reviewItem = {
    id: 1,
    locationId: 1,
    reviewObjectId: '3',
    text: 'reviewItem-text',
  };

  const reviewItem1 = {
    id: 2,
    locationId: 2,
    reviewObjectId: '4',
    text: 'reviewItem1-text',
  };

  const location = {
    id: 1,
    name: 'name',
  };

  const company = {
    alias: 'alias',
    name: 'name',
    id: 3,
  };

  const company1 = {
    alias: 'alias1',
    name: 'name1',
    id: 4,
  };

  const reviews: IReviewsApi = {
    total: 1,
    items: [reviewItem, reviewItem1],
    averageRating: 4,
  };

  beforeEach(() => {
    mockGetReviews.mockResolvedValue(reviews);
    mockFindByIds.mockResolvedValue([location]);
    mockGetInsuranceCompaniesByIds.mockResolvedValue([company, company1]);
  });

  it('MUST get reviews from "OSAGOGATEWAY" service', async () => {
    await insuranceCompaniesReviews(locationId, companyId);

    expect(mockGetReviews).toHaveBeenCalledWith(locationId, companyId);
  });

  it('AND request was failed, MUST trow error', async () => {
    mockGetReviews.mockRejectedValue(TEST_ERROR);
    let error: Nullable<Error> = null;
    try {
      await insuranceCompaniesReviews(locationId, companyId);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(TEST_ERROR);
  });

  describe('AND request was succeed', () => {
    it('AND reviews were not found, MUST return empty array', async () => {
      mockGetReviews.mockResolvedValue({});

      expect(await insuranceCompaniesReviews(locationId, companyId)).toEqual([]);
    });

    it('MUST do request for all locations from all reviews', async () => {
      await insuranceCompaniesReviews(locationId, companyId);

      expect(mockFindByIds).toHaveBeenCalledWith([reviewItem.locationId.toString(), reviewItem1.locationId.toString()]);
    });

    it('AND request to "locations" service failed, MUST throw error', async () => {
      mockFindByIds.mockRejectedValue(TEST_ERROR);
      let error: Nullable<Error> = null;
      try {
        await insuranceCompaniesReviews(locationId, companyId);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(TEST_ERROR);
    });

    it('MUST do request for all companies ids from all reviews', async () => {
      await insuranceCompaniesReviews(locationId, companyId);

      expect(mockGetInsuranceCompaniesByIds).toHaveBeenCalledWith([
        reviewItem.reviewObjectId,
        reviewItem1.reviewObjectId,
      ]);
    });

    it('AND request for insurance companies failed, MUST throw error', async () => {
      mockGetInsuranceCompaniesByIds.mockRejectedValue(TEST_ERROR);
      let error: Nullable<Error> = null;
      try {
        await insuranceCompaniesReviews(locationId, companyId);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(TEST_ERROR);
    });

    it('MUST return list of reviews', async () => {
      expect(await insuranceCompaniesReviews(locationId, companyId)).toEqual([
        {
          city: location.name,
          comment: reviewItem.text,
          companyLogoLink: '//f.sravni.ru/logotypes/ic/40x40/logo_3.svg',
          companyName: company.name,
          name: '',
          rating: 5,
          reviewLink: '/strakhovaja-kompanija/alias/otzyv/1',
          title: '',
        },
        {
          city: undefined,
          comment: reviewItem1.text,
          companyLogoLink: '//f.sravni.ru/logotypes/ic/40x40/logo_4.svg',
          companyName: company1.name,
          name: '',
          rating: 5,
          reviewLink: '/strakhovaja-kompanija/alias1/otzyv/2',
          title: '',
        },
      ]);
    });
  });
});
