const CopyPlugin = require('copy-webpack-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: IS_PRODUCTION ? null : 'source-map',
  entry: './src/scripts/main.tsx',
  output: { filename: 'content_script.js' },
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
  plugins: [new CopyPlugin(['src/manifest.json'])],
};
