const path = require('path');
const webpack = require('webpack');

const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require('webpack-node-externals');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const HtmlWebPackPlugin = require("html-webpack-plugin");

OUTPUT_PATH = path.resolve(__dirname, 'dist');
SRC_PATH = path.resolve(__dirname, 'src');

const baseConfig = {
  devtool: 'source-map',
  output: {
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'superagent': path.resolve(__dirname, 'node_modules/superagent/dist/superagent.min.js'),
      '@src': SRC_PATH,
      '@CONSTANTS': `${SRC_PATH}/CONSTANTS`,
      '@enums': `${SRC_PATH}/enums`,
      '@lib': `${SRC_PATH}/lib`,
      '@parsers': `${SRC_PATH}/lib/parsers`,
      '@processors': `${SRC_PATH}/lib/processors`,
      '@server': `${SRC_PATH}/server`,
      '@browser': `${SRC_PATH}/browser`,
      '@components': `${SRC_PATH}/browser/components`,
      '@store': `${SRC_PATH}/browser/store`,
      '@views': `${SRC_PATH}/browser/views/`,
      '@templates': `${SRC_PATH}/lib/templates`,
    },
  },
  optimization: {
    usedExports: true,
  },
};

const serverConfig = {
  target: 'node',
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  entry: {
    server: `${SRC_PATH}/server/index.ts`,
  },
  output: {
    ...baseConfig.output,
    path: OUTPUT_PATH,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    ...baseConfig.resolve,
    fallback: {
      'original-fs': false,
    },
  },
  plugins: [
    new NodePolyfillPlugin(),
  ],
};

const browserConfig = {
  target: 'node',
  entry: {
    app: `${SRC_PATH}/browser/index.ts`,
  },
  output: {
    ...baseConfig.output,
    path: `${OUTPUT_PATH}/public`,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/public',
          to: '',
          filter(resourcePath) {
            return path.extname(resourcePath).toLowerCase() !== '.html';
          }
        },
        { from: 'node_modules/bootstrap-icons/font', to: 'icons' },
      ],
    }),
    new HtmlWebPackPlugin({
      template: './src/public/index.html',
      filename: './index.html',
      publicPath: '/',
      inject: 'body',
    }),
    new HtmlWebPackPlugin({
      template: './src/public/upload.html',
      filename: './upload.html',
      publicPath: '/',
      inject: 'body',
    }),
  ],
}

module.exports = (env, argv) => {
  const mode = env.NODE_ENV || argv.env.NODE_ENV || 'development';
  const isDevMode = mode === 'development'

  const configs = [];
  for (const environment of [
    serverConfig,
    browserConfig,
  ]) {
    const isServerConfig = environment === serverConfig;
    const config = {
      ...baseConfig,
      ...environment,
    }

    config.mode = mode;
    config.output.clean = isServerConfig && !isDevMode;

    if (config.mode === 'development') {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
          configFile: path.resolve(__dirname, 'eslint.config.js'),
        }
      });
    }

    configs.push(config);
  }

  return configs;
};
