type NextPage = import('next').NextPage;
type AppStore = import('../redux/store').AppStore;
type Auto = import('./api/auto');

declare namespace NextPages {
  type NextPagesDataCommon = {
    type: 'anketa';
  };

  interface QuestionerNextPageData extends NextPagesDataCommon {
    type: 'anketa';
    brands: Auto.GetBrands;
  }

  type Data = QuestionerNextPageData;

  interface Page extends NextPage {
    setPageData(pageData: Data, store: AppStore): void;
  }
}
