const path = require('path');
const Webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');

const { version } = require('./package.json');

const rootDir = modulePath => path.resolve(__dirname, modulePath);

module.exports = {
  entry: './scripts/main.js',
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
  },
  devtool: 'source-map',
  resolveLoader: {
    alias: {
      text: 'raw-loader'
    }
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    symlinks: false,
    alias: {
      '@jeremyckahn/stylie': rootDir('node_modules/@jeremyckahn/stylie/scripts/stylie'),
      'jquery-cubelet': rootDir('node_modules/jquery-cubelet/dist/jquery.cubelet'),
      'jquery-dragon': rootDir('node_modules/jquery-dragon/src/jquery.dragon'),
      'jquery-mousewheel': rootDir('node_modules/jquery-mousewheel/jquery.mousewheel'),
      'lateralus.component.tabs': rootDir('node_modules/lateralus-components/tabs/main'),
      'rekapi-timeline': rootDir('node_modules/rekapi-timeline/scripts/rekapi-timeline'),
      aenima: rootDir('node_modules/aenima'),
      backbone: rootDir('node_modules/backbone/backbone'),
      bezierizer: rootDir('node_modules/bezierizer/dist/bezierizer'),
      jquery: rootDir('node_modules/jquery/dist/jquery'),
      keydrown: rootDir('node_modules/keydrown/dist/keydrown'),
      lateralus: rootDir('node_modules/lateralus/dist/lateralus'),
      lodash: rootDir('node_modules/lodash/index.js'),
      mustache: rootDir('node_modules/mustache/mustache'),
      rekapi: rootDir('node_modules/rekapi/src/main'),
      shifty: rootDir('node_modules/shifty/src/index'),
      underscore: 'lodash'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [
          rootDir('scripts'),
          rootDir('node_modules/shifty'),
          rootDir('node_modules/rekapi'),
          rootDir('node_modules/aenima'),
          rootDir('node_modules/rekapi-timeline'),
          rootDir('node_modules/@jeremyckahn'),
          rootDir('node_modules/webpack-dev-server')
        ]
      }, {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader'
        }]
      }, {
        test: /\.(sass|scss|css)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            includePaths: [
              rootDir('node_modules/compass-mixins/lib')
            ]
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([ 'dist' ]),
    new CopyWebpackPlugin([
      { from: 'index.html' },
      { from: 'img', to: 'img' }
    ]),
    new Webpack.BannerPlugin(version),
    new AppCachePlugin({
      exclude: [/DS_Store/],
      output: 'manifest.appcache'
    })
  ],
  devServer: {
    port: 9006
  }
};
