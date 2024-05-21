export declare namespace RatingsAPI {
  export interface BankCbRating {
    bankId: number; // int32
    assets: number; // double
    assetsRating: number; // double
    assetsRatingPosition: number; // int32
    profit: number; // double
    profitRating: number; // double
    profitRatingPosition: number; // int32
    credits: number; // double
    creditsRating: number; // double
    creditsRatingPosition: number; // int32
    deposites: number; // double
    depositesRating: number; // double
    depositesRatingPosition: number; // int32
  }
  /**
   * Рейтинги банков
   */
  export interface BankRatingResultsBankCbRating {
    /**
     * Дата последнего обновления рейтингов
     */
    lastKnownDate: string; // date-time
    /**
     * Список результатов
     */
    results: RatingsAPI.BankCbRating[];
  }
  /**
   * Рейтинги банков
   */
  export interface BankRatingResultsBankRatingsSummary {
    /**
     * Дата последнего обновления рейтингов
     */
    lastKnownDate: string; // date-time
    /**
     * Список результатов
     */
    results: RatingsAPI.BankRatingsSummary[];
  }
  export interface BankRatingsSummary {
    bankId: number; // int32
    assetsRating: number; // double
    assetsRatingPosition: number; // int32
    profitRating: number; // double
    profitRatingPosition: number; // int32
    creditsRating: number; // double
    creditsRatingPosition: number; // int32
    depositesRating: number; // double
    depositesRatingPosition: number; // int32
    clientRating: number; // double
    clientRatingPosition: number; // int32
    clientRatingMark: number; // int32
    clientRatingType: 'Gold' | 'Silver';
    bankBranchRating: number; // double
    bankBranchesCount: number; // int32
    cashPointRating: number; // double
    cashPointsCount: number; // int32
    readonly sravniRuRating: number; // double
  }
  export interface BankRatingsSummaryWithDelta {
    assets: number; // double
    assetsDelta: number; // double
    profit: number; // double
    profitDelta: number; // double
    credits: number; // double
    creditsDelta: number; // double
    deposits: number; // double
    depositesDelta: number; // double
    bankId: number; // int32
    assetsRating: number; // double
    assetsRatingPosition: number; // int32
    profitRating: number; // double
    profitRatingPosition: number; // int32
    creditsRating: number; // double
    creditsRatingPosition: number; // int32
    depositesRating: number; // double
    depositesRatingPosition: number; // int32
    clientRating: number; // double
    clientRatingPosition: number; // int32
    clientRatingMark: number; // int32
    clientRatingType: 'Gold' | 'Silver';
    bankBranchRating: number; // double
    bankBranchesCount: number; // int32
    cashPointRating: number; // double
    cashPointsCount: number; // int32
    readonly sravniRuRating: number; // double
  }
  export interface Error {
    code: string;
    target: string;
    message: string;
    details: RatingsAPI.Error[];
  }
  export interface ErrorModel {
    error: RatingsAPI.Error;
  }
  namespace GetRatings {
    namespace Responses {
      export type $200 = RatingsAPI.BankRatingResultsBankCbRating;
      export type $400 = RatingsAPI.ErrorModel;
      export type $500 = RatingsAPI.ErrorModel;
    }
  }
  namespace GetSummary {
    namespace Responses {
      export type $200 = RatingsAPI.BankRatingResultsBankRatingsSummary;
      export type $400 = RatingsAPI.ErrorModel;
      export type $500 = RatingsAPI.ErrorModel;
    }
  }
  namespace GetSummaryAsync {
    namespace Responses {
      export type $200 = RatingsAPI.InsuranceRatingResultsInsuranceCompanyRating;
      export type $400 = RatingsAPI.ErrorModel;
      export type $500 = RatingsAPI.ErrorModel;
    }
  }
  namespace GetSummaryInsuranceAsync {
    namespace Responses {
      export type $200 = RatingsAPI.InsuranceCompanyRating;
      export type $400 = RatingsAPI.ErrorModel;
      export type $500 = RatingsAPI.ErrorModel;
    }
  }
  namespace GetSummaryRaitingBank {
    namespace Responses {
      export type $200 = RatingsAPI.BankRatingsSummary;
      export type $400 = RatingsAPI.ErrorModel;
      export type $500 = RatingsAPI.ErrorModel;
    }
  }
  namespace GetSummaryWithDelta {
    namespace Responses {
      export type $200 = RatingsAPI.BankRatingsSummaryWithDelta;
      export type $400 = RatingsAPI.ErrorModel;
      export type $500 = RatingsAPI.ErrorModel;
    }
  }
  export interface InsuranceCompanyRating {
    insuranceCompanyId: number; // int32
    feesAmount: number; // double
    feesRatingPosition: number; // int32
    feesRating: number; // double
    paymentAmount: number; // double
    paymentRatingPosition: number; // int32
    paymentRating: number; // double
    averagePaymentAmount: number; // double
    averagePaymentAmountRatingPosition: number; // int32
    averagePaymentRating: number; // double
    deniedPaymentPart: number; // double
    deniedPaymentRatingPosition: number; // int32
    deniedPaymentRating: number; // double
    insuranceProductType: string;
    date: string; // date-time
    feesYearIncrease: number; // double
    feesRatingIncrease: number; // double
    reviewRating: RatingsAPI.InsuranceCompanyReviewRating;
    solvencyYearIncrease: number; // double
    solvencyRatingIncrease: number; // double
    clientRating: number; // double
    clientRatingPosition: number; // int32
    readonly sravniRuRating: number; // double
  }
  export interface InsuranceCompanyRatingWithDelta {
    feesDelta: number; // double
    paymentDelta: number; // double
    averagePaymentDelta: number; // double
    deniedPaymentDelta: number; // double
    insuranceCompanyId: number; // int32
    feesAmount: number; // double
    feesRatingPosition: number; // int32
    feesRating: number; // double
    paymentAmount: number; // double
    paymentRatingPosition: number; // int32
    paymentRating: number; // double
    averagePaymentAmount: number; // double
    averagePaymentAmountRatingPosition: number; // int32
    averagePaymentRating: number; // double
    deniedPaymentPart: number; // double
    deniedPaymentRatingPosition: number; // int32
    deniedPaymentRating: number; // double
    insuranceProductType: string;
    date: string; // date-time
    feesYearIncrease: number; // double
    feesRatingIncrease: number; // double
    reviewRating: RatingsAPI.InsuranceCompanyReviewRating;
    solvencyYearIncrease: number; // double
    solvencyRatingIncrease: number; // double
    clientRating: number; // double
    clientRatingPosition: number; // int32
    readonly sravniRuRating: number; // double
  }
  export interface InsuranceCompanyReviewRating {
    insuranceCompanyId: number; // int32
    clientRating: number; // int32
    clientRatingPosition: number; // int32
    averageScore: number; // double
    reviewsCount: number; // int32
    validReviewsCount: number; // int32
    resolvedProblemsCount: number; // int32
    insuranceCompanyAnswersCount: number; // int32
    insuranceProductType: string;
  }
  /**
   * Рейтиги страховых компаний
   */
  export interface InsuranceRatingResultsInsuranceCompanyRating {
    /**
     * Дата последнего обновления рейтингов
     */
    lastKnownDate: string; // date-time
    /**
     * Дата самых ранних рейтингов
     */
    earliestKnownDate: string; // date-time
    /**
     * Список результатов
     */
    results: RatingsAPI.InsuranceCompanyRating[];
  }
}
