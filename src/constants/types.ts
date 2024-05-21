export interface IMatch {
  paramsExtractor: (params: Record<string, string>) => Partial<{
    brandAlias: string;
    modelOrProductLocation: string;
    insuranceCompany: string;
    productLocation: string;
    seoParam: string;
  }>;
  urls: RegExp[];
}
