const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/examples/src/example.html'),
  filename: './index.html',
});
module.exports = {
  entry: path.join(__dirname, 'examples/src/index.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [require('babel-plugin-transform-class-properties')]
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [htmlWebpackPlugin],
  devServer: {
    port: 3001,
  },
};
