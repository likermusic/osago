import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  webpackFinal: async (config) => {
    if (config?.module?.rules) {
      // @ts-ignore так как ругается на то, что rule может быть не объектом
      const fileLoaderRule = config.module.rules.find((rule) => rule?.test?.test?.('.svg')) as any;
      fileLoaderRule.exclude = /\.svg$/i;

      config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: /url/ },
          use: [
            {
              loader: '@svgr/webpack',
              // По дефолту svgr удаляет вьюбокс, отключаем это правило
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
                  ],
                },
              },
            },
          ],
        },
      );

      // Код ниже подключает стили из node_modules
      let cssRule = config.module.rules.find(
        (rule) => rule && typeof rule === 'object' && 'test' in rule && rule?.test?.toString().includes('css'),
      );

      if (cssRule) {
        (cssRule as { sideEffects: boolean }).sideEffects = true;
      }
    }

    return config;
  },

  docs: {
    autodocs: true,
  },
};
export default config;
