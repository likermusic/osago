const { layers } = require('../utils/layers');

const FS_SLICED_LAYERS_REG = layers.getUpperLayers('shared').join('|');
const FS_SEGMENTS_REG = [...layers.FS_SEGMENTS, ...layers.FS_SEGMENTS.map((seg) => `${seg}.*`)].join('|');

module.exports = {
  plugins: ['import'],
  rules: {
    'import/no-internal-modules': [
      'error',
      {
        allow: [
          /**
           * Allow not segments import from slices
           * @example
           * 'entities/form/ui' // Fail
           * 'entities/form' // Pass
           */
          `**/*(${FS_SLICED_LAYERS_REG})/!(${FS_SEGMENTS_REG})`,

          /**
           * Allow slices with structure grouping
           * @example
           * 'features/auth/form' // Pass
           */
          `**/*(${FS_SLICED_LAYERS_REG})/!(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,

          /**
           * Allow not segments import in shared segments
           * @example
           * 'shared/ui/button' // Pass
           */
          `**/*shared/*(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,

          /**
           * Allow import from segments in shared
           * @example
           * 'shared/ui' // Pass
           */
          `**/*shared/*(${FS_SEGMENTS_REG})`,

          /** allow global modules */
          `**/node_modules/**`,

          /** allow imports mocks */
          `**/mocks/**`,

          /** allow imports common utils */
          `**/commonUtils/**`,

          /**
           * allow custom shared segments with _prefix
           */
          `**/*shared/_*`,
          `**/*shared/_*/*`,

          /**
           *  Used for allow import local modules
           * @example
           * './model/something' // Pass
           */
          `**/*(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`, // уровень вложенности модулей 1
          `**/*(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,

          /**
           *  Used for imports from pageModules to nextJS src/pages
           * @example
           * 'pageModules/Index' // Pass
           */
          `**/*pageModules/**`,

          /**
           *  Used for imports from types to client types
           * @example
           * 'types/yup' // Pass
           */
          `**/*types/**`,

          /**
           *  Used for imports from constants to client types
           * @example
           * 'constants/auth' // Pass
           */
          `**/*constants/**`,

          /**
           * Allow import from directory in shared/segment
           * @example
           * 'shared/lib/schemes/contact' // Pass
           */
          `**/*shared/*(${FS_SEGMENTS_REG})/**`,
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['./src/server/**/*.ts', './src/types/**/*.ts'],
      rules: {
        'import/no-internal-modules': 0,
      },
    },
  ],
};
