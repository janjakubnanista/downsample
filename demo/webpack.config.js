const path = require('path');
const transformer = require('ts-type-checked/transformer').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

module.exports = {
  entry: path.join(rootDir, 'index.tsx'),
  output: {
    path: distDir,
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          getCustomTransformers: (program) => ({
            before: [transformer(program)],
          }),
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(rootDir, 'index.ejs'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    mainFields: ['main'],
  },
  devServer: {
    port: 3001,
    contentBase: rootDir,
  },
};
