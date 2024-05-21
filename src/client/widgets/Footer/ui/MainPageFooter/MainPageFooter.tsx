import { Footer } from '@sravni/react-footer';

import { useAppSelector } from 'shared/lib/redux';

import { selectSiteSettingsFooter } from 'entities/siteSettings';

export const MainPageFooter = () => {
  const footer = useAppSelector(selectSiteSettingsFooter);

  return (
    <Footer
      mode="knowledge"
      menuLinks={footer?.menu}
      socialLinks={footer?.socialLinks}
      support={footer?.support}
    />
  );
};
