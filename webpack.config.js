const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const IS_PRODUCTION = argv.mode === 'production';

  return {
    devtool: 'source-map',
    entry: './src/scripts/main.tsx',
    output: { filename: 'content_script.js', path: path.resolve(__dirname, IS_PRODUCTION ? 'publish' : 'dist') },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [new CopyPlugin(['src/manifest.json', 'src/icons'])],
  };
};
