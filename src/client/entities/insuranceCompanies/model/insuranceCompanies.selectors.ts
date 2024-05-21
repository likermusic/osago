import type { LogoCarouselItemProps } from '@sravni/react-shared-components/lib/LogoCarousel';
import { createSelector } from 'reselect';

import type { SliceStateFromReducer } from 'shared/types';

import type { IInsuranceCompaniesFullMap, IInsuranceCompaniesRating, ICompaniesRatingElement } from '../types';

import type { insuranceCompaniesSlice } from './insuranceCompanies.slice';

type TInsuranceCompaniesState = SliceStateFromReducer<typeof insuranceCompaniesSlice>;

const insuranceCompaniesIdListSelector = (state: TInsuranceCompaniesState) => state.insuranceCompanies.idList;

const insuranceCompaniesRatingsSelector = (state: TInsuranceCompaniesState) => state.insuranceCompanies.ratings;

export const insuranceCompaniesFullMapSelector = (state: TInsuranceCompaniesState) =>
  state.insuranceCompanies.fullCompaniesMap;

export const insuranceCompaniesWithRatingsSelector = createSelector(
  insuranceCompaniesFullMapSelector,
  insuranceCompaniesRatingsSelector,
  (fullCompaniesMap, ratings): ICompaniesRatingElement[] =>
    ratings
      .map((fullRating: IInsuranceCompaniesRating) => ({
        ...fullCompaniesMap[fullRating.insuranceCompanyId],
        fullRating,
      }))
      .sort((a: ICompaniesRatingElement, b: ICompaniesRatingElement) => b.clientRating - a.clientRating),
);
/** Для слайдера на лендинге */
export const insuranceCompaniesAllSelector = createSelector(
  insuranceCompaniesFullMapSelector,
  insuranceCompaniesIdListSelector,
  (fullCompaniesMap: IInsuranceCompaniesFullMap, idList: number[]): LogoCarouselItemProps[] =>
    idList.map((id) => {
      const company = fullCompaniesMap[id];
      return { alt: company.name, url: company.greyLogoLink };
    }),
);
