// Отвечает за импортирование layers (в этом можно из shared, widgets etc, в shared нельзя из других)
const { layers } = require('../utils/layers');

const getNotSharedLayersRules = () =>
  layers.getUpperLayers('shared').map((layer) => ({
    from: layer,
    allow: layers.getLowerLayers(layer),
  }));

const sharedLayerRule = {
  from: 'shared',
  allow: 'shared',
};

const getLayersBoundariesElements = () =>
  layers.FS_LAYERS.map((layer) => ({
    type: layer,
    pattern: `${layer}/!(_*){,/*}`,
    mode: 'folder',
    capture: ['slices'],
  }));

const getGodModeRules = () =>
  layers.FS_LAYERS.map((layer) => ({
    from: `gm_${layer}`,
    allow: [layer, ...layers.getLowerLayers(layer)],
  }));

const getGodModeElements = () =>
  layers.FS_LAYERS.map((layer) => ({
    type: `gm_${layer}`,
    pattern: `${layer}/_*`,
    mode: 'folder',
    capture: ['slices'],
  }));

module.exports = {
  plugins: ['boundaries'],
  extends: ['plugin:boundaries/recommended'],
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    'boundaries/elements': [...getLayersBoundariesElements(), ...getGodModeElements()],
  },
  rules: {
    'boundaries/element-types': [
      2,
      {
        default: 'disallow',
        message:
          '"${file.type}" is not allowed to import "${dependency.type}" | See rules: https://feature-sliced.design/docs/reference/layers/overview ',
        rules: [...getNotSharedLayersRules(), sharedLayerRule, ...getGodModeRules()],
      },
    ],
  },
};
