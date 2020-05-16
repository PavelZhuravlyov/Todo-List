const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './js/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  devServer: {
    compress: true,
    port: 8000,
    hot: true,
    contentBase: path.join(__dirname, 'src')
  },

  optimization: {
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
            },
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.svg/,
        use: {
          loader: 'file-loader',
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],

  mode: 'development'
};