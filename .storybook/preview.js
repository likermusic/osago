import { ThemeProvider, DeviceInfoProvider } from '@sravni/react-utils';

import '@sravni/design-system-theme/lib/globalStyles.css';

const themeDecorator = (Story, context) => {
  const {
    globals: { theme = 'lager' },
  } = context;

  const mediaInfo = {
    phone: window.matchMedia(`(max-width: 767px)`).matches,
    tablet: window.matchMedia(`(max-width: 1023px) and (min-width: 767px)`).matches,
  };

  return (
    <ThemeProvider initialTheme={theme}>
      <DeviceInfoProvider initialInfo={mediaInfo}>
        <Story />
      </DeviceInfoProvider>
    </ThemeProvider>
  );
};

export const decorators = [themeDecorator];

const dsViewPorts = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '320px',
      height: '568px',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '1112px',
    },
  },
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1024px',
      height: '100%',
    },
  },
};

export const parameters = {
  // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  layout: 'centered',
  actions: { argTypesRegex: '^on[A-Z].*' },

  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
    sort: 'requiredFirst',
  },
  backgrounds: {
    disable: true,
    grid: {
      disable: true,
    },
  },
  viewport: {
    viewports: dsViewPorts,
  },
  options: {
    storySort: {
      order: [
        ['Basic'],
        'Introduction',
        'Foundations',
        ['Colors', 'Themes', 'Customize Theme', 'Helpers', 'Mixins'],
        'Typography',
        'Components',
      ],
    },
  },
};

const getStyles = (theme) => {
  const background = theme === 'lager' ? '#F8F8F8' : '#333333';

  return {
    borderRadius: '1rem',
    display: 'block',
    height: '1rem',
    width: '1rem',
    background,
    boxShadow: '0 0 0 1px inset',
  };
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'lager',
    toolbar: {
      icon: 'circlehollow',
      title: 'Theme',
      items: [
        { value: 'lager', icon: 'circlehollow', title: 'lager', right: <span style={getStyles('lager')} /> },
        { value: 'guinness', icon: 'circle', title: 'guinness', right: <span style={getStyles('guinness')} /> },
      ],
    },
  },
};
