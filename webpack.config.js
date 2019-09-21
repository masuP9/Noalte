const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/scripts/main.ts',
  output: { filename: 'content_script.js' },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  plugins: [new CopyPlugin(['src/manifest.json'])],
};
