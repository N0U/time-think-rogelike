const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const publicPath = '/';
const publicUrl = '';

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve('dist'),
  },
  devServer: {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    contentBase: 'public',
    watchContentBase: true,
    hot: true,
    publicPath: publicPath,
    quiet: false,
    https: false,
    host: '127.0.0.1',
    overlay: false,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebookincubator/create-react-app/issues/387.
      disableDotRule: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        include: resolve('src'),
        loader: require.resolve('eslint-loader'),
        enforce: 'pre',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.(js|jsx|mjs)$/,
        include: resolve('src'),
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],

  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve('src/index.html'),
    }),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  target: 'web',
};
