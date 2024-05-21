import { getAppLink } from '@sravni/cosago-react-library/lib/utils';

const QUERY = 'placement=sravni_osago_success';
export const MOBILE_STORE_LINKS = {
  appStore: getAppLink('appStore', QUERY),
  googlePlay: getAppLink('googleplay', QUERY),
  huaweiAppGallery: getAppLink('huaweiAppGallery', QUERY),
};
