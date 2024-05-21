function getLink(store: string): string {
  return `https://www.sravni.ru/analytics-links/v1/redirects/mobileapps/${store}?placement=LandingOurApps`;
}

export const appStoresConstants = {
  googlePlay: getLink('googleplay'),
  appStore: getLink('appStore'),
  huaweiAppGallery: getLink('huaweiAppGallery'),
};
