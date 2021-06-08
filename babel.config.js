/* eslint-disable array-element-newline */
module.exports = (api) => {
  api.cache(true);

  const presets = [
    "@babel/preset-typescript",
    ['@babel/preset-env', {
      corejs: 3,
      targets: {
        node: '10.15.1',
        browsers: [
          'chrome >= 52',
          'fireFox >= 44',
          'safari >= 7',
          'ie >= 11',
          'edge >= 12',
        ],
      },
      useBuiltIns: 'usage',
    }],
  ];

  const plugins = [
    ['module-resolver', {
      root: ['./js/src'],
      alias: {
        '@src': './dist/src',
        '@CONSTANTS': './dist/src/CONSTANTS',
        '@enums': './dist/src/enums',
        '@lib': './dist/src/lib',
        '@parsers': './dist/src/lib/parsers',
        '@processors': './dist/src/lib/processors',
        '@server': './dist/src/server',
        '@browser': './dist/src/browser',
        '@components': './dist/src/components',
        '@store': './dist/src/browser/store',
        '@views': './dist/src/views/',
        '@templates': './dist/src/lib/templates',
      },
    }],
  ];

  return {
    presets,
    plugins,
  };
};
