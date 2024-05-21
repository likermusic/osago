// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */
export declare namespace SEOAndSettings {
  export type TFindParams = {
    url: string;
    replacements?: Record<string, any>;
    organization?: {
      id: string | number;
      name: string;
      alias: string;
      type: string;
    };
    location?: {
      id: string | number;
      name: string;
      nameLocative?: string;
      route: string;
      alias: string;
      latitude: number;
      longitude: number;
    };
  };

  export interface PostMetadata {
    prefooter: PreFooter[];
    breadcrumbs: Breadcrumb[];
    text: Text[];
    source: string;
    title: string;
    description: string;
    heading: string;
    headingTemplate: string;
    canonical: string;
    ogTitle: string;
    ogDescription: string;
    indexingDisabled: boolean;
    productName: string;
    showReviews: boolean;
    reviewsHeading: string;
    showGuides: boolean;
    guidesHeading: string;
    showRatings: boolean;
    showNews: boolean;
    sideBlock: SideBlock;
    noIndexSeoText: boolean;
    noIndexPrefooter: boolean;
    noIndexRating: boolean;
    noIndexReviews: boolean;
    hideAccordeonFrom: any[];
    schema: BreadcrumbSchema | [BreadcrumbSchema, CreditSchema];
    meta: Meta;
    contentBlocks: [HtmlMeta | QNAMeta | VideoMeta | NewsMeta | ChartMeta | FAQMeta];
  }

  interface PreFooter {
    title: string;
    links: Link[];
  }

  interface Breadcrumb {
    url: string;
    title: string;
  }

  interface Text {
    title: string;
    text: string;
  }

  interface SideBlock {
    title: string;
    links: any[];
  }

  interface NewsMeta {
    type: string;
    serviceResponseData: NewsServiceResponse;
    tagIds: number[];
    title: string;
  }

  interface VideoMeta extends Pick<NewsMeta, 'type'> {
    serviceResponseData: { title: string; playlist: string[] };
    youtubeResponseData: YoutubeServiceResponse;
    id: number;
  }

  interface QNAMeta extends Omit<NewsMeta, 'serviceResponseData'> {
    serviceResponseData: QnaServiceResponse;
  }

  interface HtmlMeta {
    type: string;
    text: Array<{
      title: string;
      text: string;
    }>;
  }

  interface Meta {
    pageType: string;
    propertyInsuranceType: string;
    siteSection: string;
    productType: string;
    name: string;
    amount: number;
    term: number;
  }

  interface BreadcrumbSchema {
    breadcrumb: Breadcrumb2;
    author: Author;
    description: string;
    name: string;
    '@context': string;
    '@type': string;
  }

  interface CreditSchema {
    '@context': string;
    '@type': string;
    additionalType: string;
    annualPercentageRate: number;
    interestRate: number;
    feesAndCommissionsSpecification: string;
    name: string;
    provider: {
      '@context': string;
      '@type': string;
      aggregateRating: {
        '@context': string;
        '@type': string;
        reviewCount: number;
        bestRating: number;
        ratingValue: number;
        worstRating: number;
      };
      logo: string;
      image: string;
      name: string;
      url: string;
    };
  }

  interface NewsServiceResponse {
    items: Array<{
      title: string;
      alias: string;
      lead: string;
      miniPicture: string;
      views: number;
      pubDate: string;
      noIndex: boolean;
      url: string | null;
      isExternal: boolean;
    }>;
  }

  interface YoutubeServiceResponse {
    items: Array<{
      id: string;
      statistics: {
        viewCount: string;
      };
      snippet: {
        title: string;
        publishedAt: string;
        thumbnails: {
          default: {
            url: string;
          };
        };
      };
    }>;
  }

  interface QnaServiceResponse {
    items: Array<{
      id: number;
      pictureUrl: string;
      title: string;
      answersCount: number;
      slug: string;
      published: string;
    }>;
  }

  interface Link {
    url: string;
    title: string;
  }

  interface Breadcrumb2 {
    itemListElement: ItemListElement[];
    itemListOrder: string;
    numberOfItems: number;
    '@context': string;
    '@type': string;
  }

  interface Author {
    logo: string;
    name: string;
    url: string;
    '@context': string;
    '@type': string;
  }

  interface ChartMeta {
    type: string;
    serviceResponseData: ChartServiceResponse;
    subTitle: string;
    text: string;
    locationId: number;
    organizationId: number;
    pageSize: number;
    title: string;
  }

  interface FAQMeta {
    type: string;
    serviceResponseData: {
      title: string;
      items: Array<{
        question: string;
        answer: string;
      }>;
    };
    id: number;
  }

  interface ChartServiceResponse {
    items: Array<{
      date: string;
      type: string;
      value: number;
      organizationId: number;
      organizationName: string;
      locationId: number;
      locationName: string;
    }>;
  }

  interface ItemListElement {
    position: number;
    '@id': string;
    name: string;
    '@context': string;
    '@type': string;
  }

  export interface IListResponse<T> {
    items: T[];
    total?: number;
    productTotal?: number;
    organizationTotal?: number;
  }

  export interface ILocation {
    id: number;
    name: string;
    fullName?: string;
    regionName?: string;
    nameLocative?: string;
    nameGenitive?: string;
    route: string;
    alias: string;
    localityType: string;
    shortLocationType: string;
    latitude: number;
    longitude: number;
  }
}
