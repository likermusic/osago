const withImages = require('next-images');
const withStyles = require('next-transpile-modules')([
  '@sravni/react-icons',
  '@sravni/design-system-theme',
  '@sravni/react-design-system',
  '@sravni/cosago-react-library',
  '@sravni/react-region-dialog',
  '@sravni/react-header',
  '@sravni/react-shared-components',
  '@sravni/react-seo',
  '@sravni/react-pre-footer',
  '@sravni/react-footer'
]);
const { withSentryConfig } = require('@sentry/nextjs');

// const withBundleAnalyzer = require('@next/bundle-analyzer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  sentry: {
    hideSourceMaps: true,
    disableServerWebpackPlugin: !process.env.SENTRY_AUTH_TOKEN && !process.env.SENTRY_DSN,
    disableClientWebpackPlugin: !process.env.SENTRY_AUTH_TOKEN && !process.env.SENTRY_DSN
  },
  compress: false,
  trailingSlash: true,
  poweredByHeader: false,
  useFileSystemPublicRoutes: false,
  assetPrefix: isProd ? 'https://s91588.cdn.ngenix.net/osagoinsurance-frontend' : '',
  crossOrigin: 'anonymous',
  publicRuntimeConfig: {
    apiPrefix: process.env.API_PATH,
    apiGateWayURL: process.env.APIGATEWAY || 'http://apigateway.svc.master.stage.yandex.sravni-team.ru',
    avatarURLPrefix: process.env.AVATAR_URL_PREFIX || 'http://f.master.stage.yandex.sravni-team.ru/avatars/',
    environment: process.env.ENV,
    gatewayUrl: process.env.GATEWAY || 'http://gateway.svc.master.stage.yandex.sravni-team.ru',
    release: process.env.IMAGE_VERSION,
    apiGatewayUrl: process.env.APIGATEWAY,
    publicUrl: process.env.PUBLIC,
    autoTest: process.env.AUTOTEST,
    sentryDSN: process.env.SENTRY_DSN,
    saltAutoInfo: process.env.SALT_AUTO_INFO,
    headerDomains: {
      identity: process.env.ISSUER,
      base: process.env.WEB_PATH
    }

  },
  future: {
    webpack5: true
  },
  images: {
    disableStaticImages: true
  },
  webpack: (config, {isServer, dev}) => {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )
    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: {not: /url/}, // exclude if *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            // По дефолту svgr удаляет вьюбокс, отключаем это правило и отключаем очищение idшников у свг
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                  {
                    name: 'prefixIds',
                    cleanupIDs: false,
                  }
                ],
              },
            },
          },
        ],
      },
    )
    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i


    if (!isServer) {
      config.resolve.fallback.fs = false;
      if (dev) {
        config.plugins.push(new ForkTsCheckerWebpackPlugin(), new ESLintPlugin())
      }
    }

    return config;
  }
};

const sentryWebpackPluginOptions = {
  org: 'sravni-ru',
  project: 'osago-insurance',
  // SENTRY_AUTH_TOKEN прокидывается через докер
  authToken: process.env.SENTRY_AUTH_TOKEN,
  deploy: {
    env: process.env.ENVIRONMENT
  },
  setCommits: {
    auto: true
  },
  silent: true // Когда надо глянуть логи ставим false(для расширенных логов process.env.SENTRY_LOG_LEVEL = 'debug';)
};


module.exports = withSentryConfig(withImages(withStyles(nextConfig)), sentryWebpackPluginOptions);
// module.exports = withBundleAnalyzer(withStyles(config))
