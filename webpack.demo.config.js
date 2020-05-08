const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = path.join(__dirname, 'demo/src');
const distDir = path.join(__dirname, 'demo/dist');

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
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(rootDir, 'index.html'),
      filename: path.join(distDir, 'index.html'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    mainFields: ['main'],
    // modules: [rootDir, "node_modules"]
  },
  devServer: {
    port: 3001,
    contentBase: rootDir,
  },
};
